import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Kaushik = createContext();

const ContextProvider = (props) => {
 
  
  const [Inp, setInp] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPromts, setPrevPromts] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 100 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(true);
  };

  const onSent = async (prompt) => {
    
   
    
    setResultData("");
    setLoading(true);
    setShowResult(false);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPromts((prev) => [...prev, Inp]);
      setRecentPrompt(Inp);
      response = await run(Inp);
    }
    console.log(response);

    let respondeArray = response.split("**");

    let newResponse = ""; // Initialize the newResponse variable

    for (let i = 0; i < respondeArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += respondeArray[i];
      } else {
        newResponse += "<b>" + respondeArray[i] + "</b>";
      }
    }

    // console.log(newResponse);  // Output the new response with bold text
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setResultData(newResponse2);
    setLoading(false);
    setInp("");
  };

  const contextvalue = {
    prevPromts,
    setPrevPromts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    Inp,
    setInp,
    newChat,
  };

  return (
    <Kaushik.Provider value={contextvalue}>
      {props.children}
    </Kaushik.Provider>
  );
};

export default ContextProvider;
