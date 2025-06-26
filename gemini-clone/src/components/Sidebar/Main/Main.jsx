import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../../assets/assets/assets";
import { Context } from "../../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim() === "") {
      alert("Please enter a prompt.");
      return;
    }
    console.log("Calling onSent() with prompt:", input); // ✅ Debug
    onSent();
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code in Java</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <>
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  {console.log("Response shown on screen:", resultData)}
                </>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              <img
                onClick={handleSend}
                src={assets.send_icon}
                alt="Send"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people. Please
              double-check responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
