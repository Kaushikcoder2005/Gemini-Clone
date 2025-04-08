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
      <div className="flex-1 min-h-screen pb-4 md:ml-16 lg:ml-16 transition-all duration-300">
        {/* navbar - made responsive */}
        <div className="flex justify-between items-center p-3 md:p-5 text-base md:text-xl text-[#585858] font-medium">
          <p>Gemini</p>
          <img className="w-8 md:w-10 rounded-full" src={assets.user_icon} alt="User profile" />
        </div>

        {/* main-container - removed fixed width, using responsive max-width instead */}
        <div className="w-full max-w-[900px] px-4 mx-auto">
          {showResult ? (
            <>
              {/* greet - responsive text sizes */}
              <div className="my-6 md:my-12 py-4 md:py-6 text-3xl md:text-5xl lg:text-6xl font-medium">
                <p>
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(16deg,#4b90ff,#ff5546)]">
                    Hey, Kaushik.
                  </span>
                </p>
                <p className="text-[#c4c7c5]">How can I help you today?</p>
              </div>
              {/* cards - made responsive with grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 py-3">
                <div className="card text-gray-500 bg-slate-100 h-40 md:h-52 w-full relative p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p className="text-sm md:text-base">Briefly summarize this concept: urban planning</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-7 md:w-9 rounded-xl p-1"
                    src={assets.bulb_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-40 md:h-52 w-full relative p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p className="text-sm md:text-base">Suggest beautiful places to see on an upcoming road trip</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-7 md:w-9 rounded-xl p-1"
                    src={assets.compass_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-40 md:h-52 w-full relative p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p className="text-sm md:text-base">Brainstorm team bonding activities for our work retreat</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-7 md:w-9 rounded-xl p-1"
                    src={assets.message_icon}
                    alt=""
                  />
                </div>
                <div className="card text-gray-500 bg-slate-100 h-40 md:h-52 w-full relative p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer hover:bg-slate-200">
                  <p className="text-sm md:text-base">Tell me about React js and React native</p>
                  <img
                    className="absolute bg-white bottom-[10px] right-[10px] w-7 md:w-9 rounded-xl p-1"
                    src={assets.code_icon}
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            // resultProtion - made scrolling area responsive
            <div className="overflow-x-auto overflow-y-auto h-[60vh] md:h-[70vh] p-3 md:p-[5%] no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center gap-3 md:gap-5 my-5 md:my-10">
                <img
                  className="w-8 md:w-10 rounded-full"
                  src={assets.user_icon}
                  alt=""
                />
                <p className="text-sm md:text-base">{recentPrompt}</p>
              </div>

              <div className="flex items-start gap-3 md:gap-5">
                <img
                  className="w-8 md:w-10 rounded-full"
                  src={assets.gemini_icon}
                  alt=""
                />
                {loading ? (
                  <div className="w-full flex flex-col gap-3 md:gap-5">
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-4 md:h-5" />
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-4 md:h-5" />
                    <hr className="loader border-none rounded-[4px] bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] bg-[800px 50px] h-4 md:h-5" />
                  </div>
                ) : (
                  <p 
                    className="text-base md:text-lg leading-7 md:leading-8 font-light" 
                    dangerouslySetInnerHTML={{ __html: resultData }} 
                  />
                )}
              </div>
            </div>
          )}

          {/* Bottom input - made responsive */}
          <div className="sticky bottom-0 bg-white px-2 md:px-0">
            <div className="flex flex-row items-center justify-between gap-2 md:gap-5 bg-[#f0f4f9] py-2 md:py-[8px] px-3 md:px-5 rounded-full">
              <input
                onChange={handleChange}
                onClick={showBtn}
                className="flex-1 p-1 md:p-2 bg-transparent text-base md:text-[18px] outline-none border-none text-[#585858]"
                type="text"
                value={Inp}
                placeholder="Enter a prompt here"
              />
              <div className="flex gap-2 md:gap-4">
                <img
                  className="w-5 md:w-6 cursor-pointer"
                  src={assets.gallery_icon}
                  alt=""
                />
                <img
                  className="w-5 md:w-6 cursor-pointer"
                  src={assets.mic_icon}
                  alt=""
                />
                {submit ? (
                  <img
                    className="w-5 md:w-6 cursor-pointer"
                    src={assets.send_icon}
                    onClick={() => onSent()}
                    alt=""
                  />
                ) : null}
              </div>
            </div>

            <p className="text-xs md:text-sm font-light text-center my-2 md:my-4 mx-auto px-2">
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