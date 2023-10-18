import { useEffect } from "react";

export const useOnClickOutside = (ref, handler, sub) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler && handler(event);
        sub([]);
      }
    };

    const handle = (event) => {
      if (event.code === "Escape") {
        handler && handler(event);
        sub([]);
      }
    };
    document.addEventListener("keydown", handle, true);
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("keydown", handle, true);
    };
  }, [ref, handler]);
};

export const useOnClickOutside2 = (onClose) => {
  useEffect(() => {
     const close = (e) => {
        if(e.keyCode === 27){
         onClose()
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);
};
