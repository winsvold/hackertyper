import { TextFragment } from "../modules/selfWritingConsole/textFragment";

export const mobileWarningText: TextFragment[] = [
  {
    delay: 1500,
    clear: true,
    text: "Mobile Device Detected.",
    interval: 60,
  },
  {
    delay: 1500,
    clear: false,
    text: " This app doesn't work for mobile.",
    interval: 120,
  },
];

export default mobileWarningText;
