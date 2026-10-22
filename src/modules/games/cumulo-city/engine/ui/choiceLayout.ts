/**
 * Splits choice buttons (by their widths) into rows that fit `maxWidth`, keeping their order.
 * A choice wider than the box gets a row of its own.
 */
export function choiceRows(widths: number[], maxWidth: number, gap: number): number[][] {
  const rows: number[][] = [];
  let row: number[] = [];
  let used = 0;
  widths.forEach((width, i) => {
    const needed = row.length === 0 ? width : used + gap + width;
    if (row.length > 0 && needed > maxWidth) {
      rows.push(row);
      row = [i];
      used = width;
    } else {
      row.push(i);
      used = needed;
    }
  });
  if (row.length > 0) rows.push(row);
  return rows;
}
