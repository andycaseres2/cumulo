/** What the HUD dialog box shows. */
export interface DialogContent {
  title: string;
  text: string;
  /** Character shown next to the text (texture key and frame). */
  portrait?: { key: string; frame: string };
  /** Answers the player can pick; the dialog stays open until one is chosen. */
  choices?: DialogChoice[];
}

export interface DialogChoice {
  id: string;
  label: string;
}

/** Where the player is, shown in the HUD header. */
export interface LocationInfo {
  title: string;
  subtitle: string;
  /** Whether the city minimap is on screen. */
  minimap: boolean;
}
