import React from 'react'

const RecentlyViewProducts = ({productFromLocalStorage}) => {
  return (
    <>
      <div>
        <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
          {productFromLocalStorage &&
            productFromLocalStorage?.map((item, index) => {
              return <li key={`${item._id}+${index}`}>{item.name}</li>;
            })}
        </ul>
      </div>
    </>
  );
}

export default RecentlyViewProducts
