export interface TextFragment {
  delay: number;
  clear: boolean;
  text: string;
  interval: number;
}

export function createTextFragment(
  text: string,
  speed?: number,
  delay?: number,
  options?: { clear?: boolean; newLine?: boolean }
): TextFragment {
  return {
    text: options?.newLine ? "\n" + text : text,
    interval: speed || 60,
    delay: delay || 800,
    clear: !!options?.clear,
  };
}
