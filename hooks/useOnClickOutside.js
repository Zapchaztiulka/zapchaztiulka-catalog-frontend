import { useEffect } from "react";

export const useOnClickOutside = (ref, handler, sub) => {
   useEffect(
    () => {
      const listener = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handler && handler();
          sub([])
        }
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      document.addEventListener("click", listener, true);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
         document.removeEventListener("click", listener, true);
      };
    },
    [ref, handler]
  );

};