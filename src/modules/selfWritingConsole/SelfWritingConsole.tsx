import React, { useEffect, useState } from "react";
import SelfWritingConsoleView from "./SelfWritingConsoleView";
import "./self-writing-console.less";
import { TextFragment } from "./textFragment";

interface Props {
  textFragments: TextFragment[];
  callBack?: Function;
  className?: string;
}

function SelfWritingConsole(props: Props) {
  const [lineNumber, setLineNumber] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [outPut, setOutPut] = useState("");
  const currentComponent = props.textFragments[lineNumber];
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

  const getTimeoutForNextIteration = () => {
    const first = linePosition === 0 && lineNumber === 0;
    if (first) {
      return currentComponent.delay;
    }
    const nextLine = props.textFragments[lineNumber + 1];
    const delay = isAtEndOfLine ? nextLine.delay : delayBeforeNextLetter();
    return Math.round(delay);
  };

  const updateText = () => {
    updateCurrentOutput();
    prepareForNextIteration();
  };

  useEffect(() => {
    const endOfText = props.textFragments.length - 1 === lineNumber && isAtEndOfLine;
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
