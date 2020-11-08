import React from "react";
import ScrollTo from "../scrollTo/ScrollTo";
import "./console.less";

export function ConsoleText(props: { text: string }) {
  const paragraphs = props.text.split("\n").map((item, key) => (
    <span key={key}>
      <br />
      {item}
    </span>
  ));

  return <>{paragraphs}</>;
}

function perserveSpaces(text: string) {
  return text.split(" ").join("\u00a0").split("\t").join("\u00a0".repeat(4));
}

interface Props {
  text: string;
  numberOfLetters: number;
}

function Console({ text, numberOfLetters }: Props) {
  const parsedText = perserveSpaces(text.slice(0, numberOfLetters));
  return (
    <div>
      <div className="console">
        <ConsoleText text={parsedText} />
        <span className="blink_me">|</span>
      </div>
      <ScrollTo />
    </div>
  );
}

export default Console;
