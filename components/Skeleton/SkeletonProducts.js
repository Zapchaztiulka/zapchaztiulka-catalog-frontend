import { useWindowSize } from '@/hooks/useWindowSize';
import React from 'react';

const SkeletonProducts = () => {
   const size = useWindowSize();
   let numberOfElements = 9; 
     if (size >= 320 && size<= 480) {
    numberOfElements = 8;
     }
   if (size >= 600) {
       numberOfElements = 6;
   }
   if (size >= 768) {
       numberOfElements = 9;
   }
   if (size >= 1920) {
       numberOfElements = 12;
   }

  return (
    <div className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus mb-5">
      {[...Array(numberOfElements)].map((_, index) => (
        <ul key={index}>
          <li className="cards">
            <div className="flex flex-col">
              <div className="product-card-img  mb-2 bg-bgImg animate-pulse"></div>
              <div className="w-[82px] tablet600:w-[115px] h-[20px] mb-2 bg-bgImg animate-pulse"></div>
              <div className="w-full mobile480:w-[144px] tablet600:w-full h-[44px] mb-5 bg-bgImg animate-pulse"></div>
              <div className="w-[56px] tablet600:w-[124px] h-[20px] mb-3 bg-bgImg"></div>
              <div className="w-full h-[48px] mb-3 bg-bgImg animate-pulse"></div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SkeletonProducts;
