import { useEffect } from "react";

export const useOnClickOutside = (ref, handler, sub) => {
   useEffect(
    () => {
       const listener = (event) => {
         
        if (ref.current && !ref.current.contains(event.target)) {
        
          handler && handler(event);
          sub([])
        }
      };

      document.addEventListener("click", listener, true);
      return () => {

         document.removeEventListener("click", listener);
      };
    },
    [ref, handler]
  );

};