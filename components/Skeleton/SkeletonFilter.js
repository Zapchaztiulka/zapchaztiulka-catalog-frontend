import React from 'react'

const SkeletonFilter = () => {
  return (
    <div className="hidden tablet1024:block tablet1024:w-[265px] desktop1200:w-[285px] shrink-0 p-xs">
      <div className="bg-bgImg h-5 w-[104px] mb-4"></div>
      <div className="flex w-full mb-[36px] gap-2">
        <div className="bg-bgImg h-5 w-[95.5px]"></div>
        <div className="bg-bgImg h-5 w-[95.5px]"></div>
      </div>
      <div>
        <ul className="flex flex-col gap-[36px]">
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <div className="flex flex-col gap-4">
                <div className="h-5 w-[85px] bg-bgImg"></div>
                <div className="h-5 w-[55px] bg-bgImg"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SkeletonFilter
