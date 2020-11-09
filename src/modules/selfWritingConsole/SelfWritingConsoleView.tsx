import React from "react";
import { ConsoleText } from "../console/Console";
import KeepInViewport from "../scrollTo/KeepInViewPort";

interface Props {
  text: string;
  className?: string;
}

function SelfWritingConsoleView(props: Props) {
  const blinker = <span className="vertical-bar">.</span>;

  const cls = `self-writing-console-container ${props.className}`;

  return (
    <div className={cls}>
      <div className="backDrop" />
      <div className="self-writing-console">
        <ConsoleText text={props.text} />
        {blinker}
        <KeepInViewport />
      </div>
    </div>
  );
}

export default SelfWritingConsoleView;
