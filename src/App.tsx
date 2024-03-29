import React, { useEffect, useState } from "react";
import "./app.less";
import { hackerCode } from "./resources/codeSample";
import InitializeMatrix from "./modules/matrix/autoScaleMatrix";
import { popUpStates } from "./modules/popup/PopUp";
import PopUp from "./modules/popup/PopUp";
import ProgressBar from "./modules/progressBar/progressbar";
import SideMenu from "./modules/sidemenu/SideMenu";
import { instructions } from "./resources/instructions";
import SelfWritingConsole from "./modules/selfWritingConsole/SelfWritingConsole";
import wakeUpTexts from "./modules/selfWritingConsole/wakeUpTexts";
import Console from "./modules/console/Console";
import { isMobile } from "react-device-detect";
import mobileWarningText from "./resources/mobileWarningText";

type PopUps = "granted" | "denied" | "progressBar" | "wakeUp" | undefined;

function App() {
  const [sizeOfText, setSizeOfText] = useState(0);
  const [popUp, setPopUp] = useState<PopUps>();
  const [loadedPopUp, setLoadedPopUp] = useState<PopUps>();
  const [matrix, setMatrix] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setLoadedPopUp("granted");
      } else if (event.key === "2") {
        setLoadedPopUp("denied");
      } else if (event.key === "3") {
        setLoadedPopUp("progressBar");
      } else if (event.key === "4") {
        setLoadedPopUp("wakeUp");
      } else if (event.key === "Control") {
        setMatrix(!matrix);
      } else if (event.key === "Enter") {
        setPopUp(loadedPopUp);
      } else if (event.key === "Shift") {
        setPopUp(undefined);
      } else if (event.key === "Delete" || event.key === "Backspace") {
        const newSizeOfText = Math.round(sizeOfText - Math.random() * 8);
        setSizeOfText(newSizeOfText >= 0 ? newSizeOfText : 0);
      } else {
        const newSize = Math.round(sizeOfText + Math.random() * 8);
        setSizeOfText(newSize);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [loadedPopUp, matrix, sizeOfText]);

  return (
    <div className="App">
      <Console text={hackerCode} numberOfLetters={sizeOfText} />
      {matrix && <InitializeMatrix />}
      <SideMenu content={instructions} open={menuOpen} callback={() => setMenuOpen(!menuOpen)} />
      {isMobile && <SelfWritingConsole className="mobileWarning" textFragments={mobileWarningText} />}
      {popUp === "wakeUp" && <SelfWritingConsole textFragments={wakeUpTexts} />}
      {popUp === "progressBar" && <ProgressBar callBack={() => setPopUp(Math.random() < 0.5 ? "granted" : "denied")} />}
      {popUp === "denied" && <PopUp popUpState={popUpStates.DENIED} />}
      {popUp === "granted" && <PopUp popUpState={popUpStates.GRANTED} />}
    </div>
  );
}

export default App;
