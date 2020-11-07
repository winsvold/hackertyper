import React, { useEffect, useState } from "react";
import SelfWritingConsoleView from "./SelfWritingConsoleView";
import "./self-writing-console.less";

export interface TextFragment {
  delay: number;
  clear: boolean;
  text: string;
  interval: number;
}

interface Props {
  textComponents: TextFragment[];
  callBack?: Function;
  className?: string;
}

function SelfWritingConsole(props: Props) {
  const [lineNumber, setLineNumber] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [outPut, setOutPut] = useState("");
  const currentComponent = props.textComponents[lineNumber];
  const isAtEndOfLine = currentComponent.text.length === linePosition;

  const updateCurrentOutput = () => {
    const isNewLine = linePosition === 0;
    const clearOutput = isNewLine && currentComponent.clear;
    if (clearOutput) {
      setOutPut(currentComponent.text.charAt(linePosition));
    } else {
      setOutPut(outPut + currentComponent.text.charAt(linePosition));
    }
  };

  const prepareForNextIteration = () => {
    if (isAtEndOfLine) {
      setLinePosition(0);
      setLineNumber(lineNumber + 1);
    } else {
      setLinePosition(linePosition + 1);
    }
  };

  const delayBeforeNextLetter = () => {
    const randomIrregularity = 1.9 - 1.8 * Math.random();
    const currentAndNextChar = currentComponent.text.slice(linePosition, linePosition + 2);
    const delay = currentComponent.interval * randomIrregularity;
    if (currentAndNextChar === ". ") return delay * 10;
    if (currentAndNextChar === "! ") return delay * 8;
    if (currentAndNextChar === ", ") return delay * 2;
    return delay;
  };

  const delayBeforeNextLine = () => props.textComponents[lineNumber + 1].delay;

  const getTimeoutForNextIteration = () => {
    const delay = isAtEndOfLine ? delayBeforeNextLine() : delayBeforeNextLetter();
    return Math.round(delay);
  };

  const updateText = () => {
    updateCurrentOutput();
    prepareForNextIteration();
  };

  useEffect(() => {
    const endOfText = props.textComponents.length - 1 === lineNumber && isAtEndOfLine;
    if (endOfText) {
      props.callBack && props.callBack();
    } else {
      const delay = getTimeoutForNextIteration();
      const timeout = setTimeout(() => updateText(), delay);
      return () => clearTimeout(timeout);
    }
  });

  return <SelfWritingConsoleView className={props.className} text={outPut} />;
}

export default SelfWritingConsole;
