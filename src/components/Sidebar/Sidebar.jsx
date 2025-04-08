import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Kaushik } from "../context/Context";

function Sidebar() {
  const [view, setView] = useState(false);
  const { onSent, prevPromts, setRecentPrompt, newChat } = useContext(Kaushik);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile based on screen width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768) {
        setView(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    // Auto-close sidebar on mobile after selecting a prompt
    if (isMobile) {
      setView(false);
    }
  };

  const toggleView = () => {
    setView((prev) => !prev);
  };

  return (
    <div className={`fixed z-10 flex flex-col justify-between bg-gray-200 min-h-screen h-full 
      ${view ? 'w-64 sm:w-72' : 'w-14 sm:w-16'} 
      transition-all duration-300 py-4 px-2 sm:px-3 shadow-lg`}>
      {/* top portion */}
      <div>
        <div
          onClick={toggleView}
          className="flex justify-center items-center w-8 ml-1 sm:ml-2 p-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors"
        >
          <img
            className="w-4 sm:w-5 cursor-pointer"
            src={assets.menu_icon}
            alt="Menu toggle"
          />
        </div>

        <div 
          onClick={newChat} 
          className={`flex gap-2 sm:gap-[10px] mt-8 sm:mt-14 bg-slate-300 hover:bg-slate-400 py-2 sm:py-[10px] px-3 sm:px-[15px] rounded-full items-center 
          ${view ? 'justify-start' : 'justify-center'} text-gray-500 cursor-pointer transition-colors`}
        >
          <img className="w-4 sm:w-5" src={assets.plus_icon} alt="New chat" />
          {view ? <p className="text-sm sm:text-base whitespace-nowrap">New Chat</p> : null}
        </div>

        {view ? (
          <div className="Recent max-h-[40vh] overflow-y-auto">
            <p className="mt-6 sm:mt-8 mb-3 sm:mb-5 ml-1 text-xs sm:text-sm font-medium">Recent</p>
            {prevPromts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex gap-2 sm:gap-3 ml-1 sm:ml-3 items-center hover:bg-gray-300 px-2 py-2 rounded-full cursor-pointer mb-1 transition-colors"
                >
                  <img
                    className="w-4 sm:w-5"
                    src={assets.message_icon}
                    alt="Message"
                  />
                  <p className="text-xs sm:text-sm truncate">{item.slice(0, 18)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* bottom portion */}
      <div className="mt-4">
        <div className="flex items-center gap-2 sm:gap-3 hover:bg-gray-300 px-2 py-2 rounded-full cursor-pointer transition-colors">
          <img className="w-4 sm:w-5 h-4 sm:h-5" src={assets.question_icon} alt="Help" />
          {view ? <p className="text-xs sm:text-sm">Help</p> : null}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 hover:bg-gray-300 px-2 py-2 rounded-full cursor-pointer mt-1 transition-colors">
          <img className="w-4 sm:w-5 h-4 sm:h-5" src={assets.history_icon} alt="Activity" />
          {view ? <p className="text-xs sm:text-sm">Activity</p> : null}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 hover:bg-gray-300 px-2 py-2 rounded-full cursor-pointer mt-1 transition-colors">
          <img className="w-4 sm:w-5 h-4 sm:h-5" src={assets.setting_icon} alt="Settings" />
          {view ? <p className="text-xs sm:text-sm">Settings</p> : null}
        </div>
      </div>

      {/* Mobile overlay when sidebar is open */}
      {isMobile && view && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[-1]" 
          onClick={toggleView}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;