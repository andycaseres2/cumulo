import Phaser from 'phaser';
import { EVENTS, PLAYER_RUN_SPEED, PLAYER_SPEED, REGISTRY } from '../../config';
import type { StickVector } from '../../touchStick';
import type { Walker } from '../entities/Walker';

type KeyName = 'up' | 'down' | 'left' | 'right' | 'w' | 'a' | 's' | 'd' | 'shift' | 'e' | 'space';

/** Keyboard, on-screen stick and HUD-button input for the player of one scene. */
export class PlayerControls {
  private keys: Record<KeyName, Phaser.Input.Keyboard.Key>;
  /** Set by the HUD interaction button; consumed on the next frame like a key press. */
  private interactRequested = false;

  constructor(private readonly scene: Phaser.Scene) {
    const K = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard!.addKeys({
      up: K.UP,
      down: K.DOWN,
      left: K.LEFT,
      right: K.RIGHT,
      w: K.W,
      a: K.A,
      s: K.S,
      d: K.D,
      shift: K.SHIFT,
      e: K.E,
      space: K.SPACE,
    }) as Record<KeyName, Phaser.Input.Keyboard.Key>;

    const request = () => {
      if (scene.sys.isActive()) this.interactRequested = true;
    };
    scene.game.events.on(EVENTS.interact, request);
    scene.events.once('shutdown', () => scene.game.events.off(EVENTS.interact, request));
  }

  /** True once per press of E, Space or the HUD button. */
  consumeInteract(): boolean {
    const pressed =
      Phaser.Input.Keyboard.JustDown(this.keys.e) || Phaser.Input.Keyboard.JustDown(this.keys.space) || this.interactRequested;
    this.interactRequested = false;
    return pressed;
  }

  /** Forgets pending presses, e.g. after coming back from another scene. */
  reset() {
    this.interactRequested = false;
    this.scene.input.keyboard!.resetKeys();
  }

  /** Walks or runs the player from the arrow/WASD keys (normalizing diagonals) or from the on-screen stick. */
  drive(player: Walker) {
    const k = this.keys;
    let vx = (k.right.isDown || k.d.isDown ? 1 : 0) - (k.left.isDown || k.a.isDown ? 1 : 0);
    let vy = (k.down.isDown || k.s.isDown ? 1 : 0) - (k.up.isDown || k.w.isDown ? 1 : 0);
    const stick = this.scene.registry.get(REGISTRY.touchMove) as StickVector | undefined;
    if (vx === 0 && vy === 0 && stick && (stick.x !== 0 || stick.y !== 0)) {
      // The stick already gives a direction with a strength of at most 1: there is no diagonal to normalize.
      const stickSpeed = stick.run ? PLAYER_RUN_SPEED : PLAYER_SPEED;
      player.move(stick.x * stickSpeed, stick.y * stickSpeed);
      player.anims.timeScale = stick.run ? 1.6 : 1;
      return;
    }
    const running = k.shift.isDown;
    const speed = running ? PLAYER_RUN_SPEED : PLAYER_SPEED;
    if (vx !== 0 && vy !== 0) {
      vx *= Math.SQRT1_2;
      vy *= Math.SQRT1_2;
    }
    player.move(vx * speed, vy * speed);
    player.anims.timeScale = running ? 1.6 : 1;
  }
}
