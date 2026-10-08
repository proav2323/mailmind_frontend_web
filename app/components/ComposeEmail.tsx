"use client";

import { useEffect, useRef, useState } from "react";
import { useCompose } from "../states/compose";

export default function ComposeEmail() {
  const compose = useCompose();
  const [html, setHtml] = useState<string>();

  return compose.snackbar.show ? (
    <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm bg-black/50 fixed z-[999] inset-0">
      {/* Added h-fit, shrink-0, and cleaned up duplicate md:w classes */}
      <div className="flex flex-col w-[90%] md:w-[65%] xl:w-[55%] h-fit shrink-0 rounded-md bg-[var(--bg-secondary)] slide p-2 pr-0 pb-0 scrollbar-none overflow-y-auto max-h-[90vh]">
        {/* Header Row */}
        <div className="w-full pt-2 pb-2 flex flex-row justify-between items-center px-4 border-b-[1px] border-[var(--border)] shrink-0">
          <span className="text-lg font-bold">Compose</span>
          <div className="flex-row flex items-center justify-center p-2 gap-3">
            <span className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transform transition-all duration-300">
              Hide
            </span>
            <span className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transform transition-all duration-300">
              Minimize
            </span>
            <span
              className="text-lg text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transform transition-all duration-300"
              onClick={compose.hideSnackBar}
            >
              X
            </span>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-start h-fit">
          <div className="flex-[0.7] flex flex-col justify-center items-center border-r-[1px] border-[var(--border)] pt-2 pb-2 w-full gap-2">
            <div className="flex flex-row w-full items-center justify-center gap-2 p-2 border-b-[1px] border-[var(--border)]">
              <span className="font-bold text-sm">To:</span>
              <input
                type="email"
                className="p-1 w-full bg-transparent outline-none focus:outline-none"
                placeholder="Add Member"
              />
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-2 p-2 border-b-[1px] border-[var(--border)]">
              <span className="font-bold text-sm">Subject:</span>
              <input
                type="text"
                className="p-1 w-full bg-transparent outline-none focus:outline-none"
                placeholder="what is this about"
              />
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-2 p-2 border-b-[1px] border-[var(--border)]">
              <textarea
                className="w-full focues:outline-none outline-none border-0 h-[100px] md:h-[150px] lg:h-[200px]"
                placeholder="Your Message"
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-2 p-2 w-full">
              <button className="p-2 rounded-md rounded-md cursor-pointer bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-all ease-in-out duration-500">
                Send
              </button>
              <button className="p-2 rounded-md rounded-md cursor-pointer border-1 border-[var(--border)] hover:bg-[var(--bg-primary)] transition-all ease-in-out duration-500">
                Discard
              </button>
            </div>
          </div>
          <div className="flex-[0.3] flex flex-col justify-center items-center gap-2 bg-[var(--bg-primary)] h-full pr-2 pb-2 pl-2">
            <div className="p-2 w-full border-b-1 border-[var(--border)] flex flex-col justify-center items-start gap-1">
              <span className="text-md font-bold">your Writing Agent</span>
              <span className="text-sm text-[var(--text-secondary)]">
                help is there
              </span>
            </div>
            <div className="flex-1 h-full"></div>
            <div className="w-full flex flex-row justify-center items-center gap-2 mb-2">
              <input
                placeholder="message"
                className="rounded-full flex-1 bg-[var(--bg-primary)] border-1 border-[var(--border)] outnline-none focus:outline-none p-2 pl-3 pr-3"
              />
              <button className="p-2 rounded-md rounded-md cursor-pointer bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-all ease-in-out duration-500">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
