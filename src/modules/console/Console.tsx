import React from "react";
import KeepInViewPort from "../scrollTo/KeepInViewPort";
import styled from "styled-components";

export function ConsoleText(props: { text: string }) {
  const paragraphs = props.text.split("\n").map((item, key) => (
    <span key={key}>
      {key > 0 && <br />}
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

const Style = styled.div`
  padding: 2em 2em 1em;
`;

function Console({ text, numberOfLetters }: Props) {
  const parsedText = perserveSpaces(text.slice(0, numberOfLetters));
  return (
    <Style>
      <div>
        <ConsoleText text={parsedText} />
        <span className="blink_me">|</span>
      </div>
      <KeepInViewPort />
    </Style>
  );
}

export default Console;
