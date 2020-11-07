export interface TextFragment {
  delay: number;
  clear: boolean;
  text: string;
  interval: number;
}

export function createTextFragment(text: string, speed: number, delay: number, clear?: boolean): TextFragment {
  return {
    text: text,
    interval: speed,
    delay: delay,
    clear: !!clear,
  };
}
