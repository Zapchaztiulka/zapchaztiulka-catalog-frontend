import { createContext, useState } from "react";

export const StartPage = createContext(null);

 function Context({ children }) {
   const [startPage, setStartPage] = useState(null);

   return (
     <StartPage.Provider value={{ startPage, setStartPage }}>
       {children}
     </StartPage.Provider>
   );
 }

export default Context;