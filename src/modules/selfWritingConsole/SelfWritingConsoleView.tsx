import React, { useEffect, useState } from "react";
import ScrollTo from "../scrollTo/ScrollTo";
import { ConsoleText } from "../console/Console";

interface Props {
  text: string;
  className?: string;
}

function SelfWritingConsoleView(props: Props) {
  const [IBeamBlink, setIBeamBlink] = useState(true);

  useEffect(() => {
    setInterval(() => {
      //Hack to make the span work with newLines. For some reason the IBeamBlink will prevent text from rendering on the new line, but removing it shortly solves the problem.
      setIBeamBlink((state) => !state);
      setIBeamBlink((state) => !state);
    }, 200);
  }, []);

  const blinker = <span className="vertical-bar">{IBeamBlink ? "." : ""}</span>; //Hack to make the span work with newLines. Content in the span needs to change to trigger correct rendering.

  const cls = `self-writing-console-container ${props.className}`;

  return (
    <div className={cls}>
      <div className="backDrop" /*style={{backgroundImage: `url(${BackgroundImage})`}}*/ />
      <div className="self-writing-console">
        <ConsoleText text={props.text} />
        {blinker}
        {IBeamBlink && <ScrollTo />}
      </div>
    </div>
  );
}

export default SelfWritingConsoleView;
