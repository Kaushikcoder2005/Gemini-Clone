import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import {  Kaushik } from "../context/Context";

function Sidebar() {
  const [view, setView] = useState(false);
  const { onSent, prevPromts, setRecentPrompt, newChat } = useContext(Kaushik);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <div className=" inline-flex flex-col justify-between bg-gray-200 min-h-screen py-4 px-3">
        {/* top portion */}
        <div>
          <div
            onClick={() => setView((prev) => !prev)}
            className="flex justify-center items-center w-8 ml-2 p-2 rounded-[50%] bg-slate-300"
          >
            <img
              className="w-[20px] cursor-pointer"
              src={assets.menu_icon}
              alt=""
            />
          </div>

          <div onClick={newChat} className="inline-flex gap-[10px] mt-14 bg-slate-300 py-[10px] px-[15px] rounded-full items-center justify-center text-gray-500 cursor-pointer  ">
            <img  className="w-[20px] " src={assets.plus_icon} alt="" />
            {view ? <p>New Chat</p> : null}
          </div>

          {view ? (
            <div className="Recent">
              <p className="mt-8 mb-5 ml-1 ">Recent</p>
              {prevPromts.map((item, index) => {
                return (
                  <div
                    onClick={() => loadPrompt(item)}
                    className="flex gap-3 ml-3 items-center hover:bg-gray-300 px-2 py-2 rounded-[50px] cursor-pointer"
                  >
                    <img
                      className="w-[20px]"
                      src={assets.message_icon}
                      alt=""
                    />
                    <p>{item.slice(0, 18)}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* bottom portion */}
        <div>
          <div className="flex items-center gap-3 hover:bg-gray-300 px-2 py-2 rounded-[50px] cursor-pointer">
            <img className="w-5 h-5" src={assets.question_icon} alt="" />
            {view ? <p>Help</p> : null}
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-300 px-2 py-2 rounded-[50px] cursor-pointer">
            <img className="w-5 h-5" src={assets.history_icon} alt="" />
            {view ? <p>Activity</p> : null}
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-300 px-2 py-2 rounded-[50px] cursor-pointer">
            <img className="w-5 h-5" src={assets.setting_icon} alt="" />
            {view ? <p>Setings</p> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
