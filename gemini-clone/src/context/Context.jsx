import { createContext, useState } from "react";
import runChat from "../config/gimini"; // Make sure this path is correct

export const Context = createContext();


const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async () => {
    setResultData(" ");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input)
    const response = await runChat(input);
    setResultData(response)
      
    setLoading(false);
    setInput("")
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    prevPrompts,
    setPrevPrompts,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
