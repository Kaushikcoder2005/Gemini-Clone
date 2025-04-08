import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Kaushik } from "../context/Context";

function Maxport() {
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setInp(e.target.value);
  };

  const showBtn = () => {
    setSubmit((prev) => !prev);
  };

  const { onSent, recentPrompt, showResult, loading, resultData, Inp, setInp } =
    useContext(Kaushik);

  return (
    <>
      <div className="flex-1 min-h-screen pb-4 ">
        {/* navbar */}
        <div className="flex justify-between items-center p-5 text-xl text-[#585858] font-medium">
          <p>Gemini</p>
          <img className="w-10 rounded-full" src={assets.user_icon} />
        </div>

        {/* main-container */}
        <div className="w-[900px] m-auto">
          {showResult ? (
            <>
              {/* greet  */}
              <div className="my-12 py-6 text-6xl font-medium">
                <p>
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(16deg,#4b90ff,#ff5546)]">
                    Hey, Kaushik.
                  </span>
                </p>
                <p className="text-[#c4c7c5]">How can I help you today?</p>
              </div>
              {/* cards */}
              <div className="cards flex flex-wrap gap-4 py-3 ">
                <div className="card text-gray-500 bg-slate-100 h-52 w-52 relative p-4 rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p> Briefly summarize this concept: urban planning</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-9 rounded-xl p-1"
                    src={assets.bulb_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-52 w-52 relative p-4 rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p>
                    {" "}
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-9 rounded-xl p-1"
                    src={assets.compass_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-52 w-52 relative p-4 rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p>
                    {" "}
                    Brainstorm team bonding activities for our work retreat
                  </p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-9 rounded-xl p-1"
                    src={assets.message_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-52 w-52 relative p-4 rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p> Tell me about React js and React native</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-9 rounded-xl p-1"
                    src={assets.code_icon}
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            // resultProtion

            <div className="overflow-x-scroll h-[70vh] p-[5%] no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center gap-5 my-10 ">
                <img
                  className="w-10 rounded-full"
                  src={assets.user_icon}
                  alt=""
                />
                <p>{recentPrompt}</p>
              </div>

              <div className="flex items-start gap-5">
                <img
                  className="w-10 rounded-full"
                  src={assets.gemini_icon}
                  alt=""
                />
                {loading ? (
                  <div className="w-full flex flex-col gap-5">
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-5 " />
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-5 " />
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-5 " />
                  </div>
                ) : (
                  <p className="text-lg leading-8 font-light" dangerouslySetInnerHTML={{ __html: resultData }} />
                )}
              </div>
            </div>
          )}

          {/* Bottom input */}
          <div className="sticky bottom-0 bg-white">
            <div className="flex flex-row items-center justify-between gap-5 bg-[#f0f4f9] py-[8px] px-5 rounded-full">
              <input
                onChange={handleChange}
                onClick={showBtn}
                className="flex-1 p-2 bg-transparent text-[18px] outline-none border-none text-[#585858]"
                type="text"
                value={Inp}
                placeholder="Enter a prompt here"
              />
              <div className="flex gap-4 ">
                <img
                  className="w-6 cursor-pointer"
                  src={assets.gallery_icon}
                  alt=""
                />
                <img
                  className="w-6 cursor-pointer"
                  src={assets.mic_icon}
                  alt=""
                />
                {submit ? (
                  <img
                    className="w-6 cursor-pointer"
                    src={assets.send_icon}
                    onClick={() => onSent()}
                    alt=""
                  />
                ) : null}
              </div>
            </div>

            <p className="text-sm font-light text-center my-4 mx-auto">
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maxport;
