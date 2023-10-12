import { useEffect } from "react";

export const useOnClickOutside = (ref, handler, sub) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target) || ref.current.localName==='button') {
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
