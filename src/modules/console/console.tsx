import React from "react";
import PT from "prop-types";
import ScrollTo from "../scrollTo/ScrollTo";
import "./console.less";

export function ConsoleText(props: { text: string }) {
  const paragraphs = props.text
    .split(" ")
    .join("\u00a0")
    .split("\t")
    .join("\u00a0".repeat(4))
    .split("\n")
    .map((item, key) => (
      <p key={key}>
        <br />
        {item}
      </p>
    ));

  return <>{paragraphs}</>;
}

interface Props {
  text: string;
  numberOfLetters: number;
}

function Console({ text, numberOfLetters }: Props) {
  return (
    <div>
      <div className="console">
        <ConsoleText text={text.slice(0, numberOfLetters)} />
        <span className="blink_me">|</span>
      </div>
      <ScrollTo />
    </div>
  );
}

export default Console;
