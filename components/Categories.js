import { ArrowRight } from '@/public/icons'
import { useGetCategoryQuery } from '@/redux/services/productApi'
import React from 'react'

const Categories = () => {
   const { data } = useGetCategoryQuery()
   
   console.log(data)
  return (
    <div className="absolute top-[92px] bg-bgColors-white p-s border-t border-x rounded-b-lg min-w-[377px]">
      <ul className="flex flex-col gap-xs text-textColors-primary text-base font-medium tracking-textBase">
        {data &&
          data?.categories.map(({ _id, categoryName, subcategoryName }) => {
            return (
              <li key={_id} className="">
                <div className="border-none cursor-pointer b-transparent flex justify-between items-center">
                 
                  <div>{categoryName}</div>
                   <ArrowRight className="stroke-iconColors-secondary w-[44] h-[44]" />
                </div>
             
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Categories
