import React, { useEffect, useRef, useState } from "react";
import { forwardMail } from "../actions";
import { useSnackBar } from "../states/snackbar";
import Loader from "./loader";

export default function EmailBox({
  parentDiv,
  closeBox,
  gmailId,
}: {
  parentDiv: React.RefObject<HTMLDivElement | null>;
  closeBox: () => void;
  gmailId: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { showSnackBar } = useSnackBar();

  useEffect(() => {
    function closeB(e: Event) {
      if (
        parentDiv.current &&
        boxRef.current &&
        !parentDiv.current.contains(e.target as Node) &&
        !boxRef.current.contains(e.target as Node)
      ) {
        closeBox();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", closeB); // mouse lcick event listerner

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", closeB);
    };
  }, []);

  const forward = () => {
    if (email === "" || email === " ") {
      return;
    }
    setIsLoading(true);
    forwardMail(email, gmailId).then((value) => {
      if (value.error === null) {
        showSnackBar("email forwared successfully", "success");
        setIsLoading(false);
        closeBox();
      } else {
        showSnackBar(value.error, "error");
        setIsLoading(false);
        closeBox();
      }
    });
  };

  return (
    <div
      ref={boxRef}
      className='p-2 w-[80vw] md:w-[55vw] lg:w-[20vw] right-[15vw] md:right-[15vw] lg:right-[5vw] h-fit rounded-md top-8 absolute bg-[var(--bg-secondary)] flex flex-row justify-center items-center gap-2'
    >
      <input
        type='email'
        className='p-2 rounded-md bg-[var(--bg-primary)] flex-1 min-w-0 outline-none'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <button
        onClick={forward}
        className='p-2 rounded-md bg-[var(--bg-primary)] cursor-pointer flex flex-row justify-center items-center'
      >
        {isLoading ? <Loader /> : "Send"}
      </button>
    </div>
  );
}
