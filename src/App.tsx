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
import Console from "./modules/console/console";
import { isMobile } from "react-device-detect";
import ReactGA from "react-ga";
import mobileWarningText from "./resources/mobileWarningText";

type PopUps = "granted" | "denied" | "progressBar" | "wakeUp" | "mvp" | undefined;

function App() {
  const [sizeOfText, setSizeOfText] = useState(0);
  const [popUp, setPopUp] = useState<PopUps>();
  const [loadedPopUp, setLoadedPopUp] = useState<PopUps>();
  const [matrix, setMatrix] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    ReactGA.initialize("UA-111572952-1");
    if (isMobile) {
      ReactGA.pageview("Mobile Warning");
    } else {
      ReactGA.pageview("Page View");
    }
  }, []);

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
      } else if (event.key === "5") {
        setLoadedPopUp("mvp");
      } else if (event.key === "Control") {
        ReactGA.event({
          category: "Features",
          action: "Toggled Matrix",
        });
        setMatrix(!matrix);
      } else if (event.key === "Enter") {
        ReactGA.event({
          category: "Features",
          action: loadedPopUp || "",
        });
        setPopUp(loadedPopUp);
      } else if (event.key === "Shift") {
        ReactGA.event({
          category: "Features",
          action: "Cleared Feature",
        });
        setPopUp(undefined);
      } else if (event.key === "Delete" || event.key === "Backspace") {
        const newSizeOfText = Math.round(sizeOfText - Math.random() * 8);
        setSizeOfText(newSizeOfText >= 0 ? newSizeOfText : 0);
      } else {
        setSizeOfText(Math.round(sizeOfText + Math.random() * 8));
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
      {isMobile && <SelfWritingConsole className="mobileWarning" textComponents={mobileWarningText} />}
      {popUp === "wakeUp" && <SelfWritingConsole textComponents={wakeUpTexts} />}
      {popUp === "mvp" && <SelfWritingConsole textComponents={wakeUpTexts} />}
      {popUp === "progressBar" && <ProgressBar callBack={() => setPopUp(Math.random() < 0.5 ? "granted" : "denied")} />}
      {popUp === "denied" && <PopUp popUpState={popUpStates.DENIED} />}
      {popUp === "granted" && <PopUp popUpState={popUpStates.GRANTED} />}
    </div>
  );
}

export default App;
