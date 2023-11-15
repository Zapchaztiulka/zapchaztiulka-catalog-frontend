"use client";
import { useOnKeyDown, useOutsideClick } from "@/hooks/useOnClickOutside";
import { ArrowDown, PhoneIconContact } from "@/public/icons";
import { useEffect, useRef, useState } from "react";

const ContactList = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ phone, setPhone ] = useState();

  useEffect(() => {
    setPhone(["+38 (050) 810 48 82", "+38 (066) 810 48 82", "+38 (096) 810 48 82"]);
  },[])

  const refOption = useRef(null)
  const refSelect = useRef(null)

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelected(value);
    setIsOpen(false);
  };

  const close = () => {
    setIsOpen(false);
  }

  useOutsideClick(refOption,refSelect,toggling)
  useOnKeyDown(close)

  return (
    <div ref={refSelect} className="relative tablet768:block hidden">
      <div
        onClick={toggling}
        className="flex cursor-pointer p-xs2 focus:outline-none  custom-select-contact"
      >
        <PhoneIconContact className="w-[24px] h-[24px] stroke-iconSecondary stroke-2 mr-2" />
        <div className="text-textPrimary font-medium text-[16px]/[22.4px] -tracking-[0.24px] w-[155px]">
          {selected || '+38 (050) 810 48 82'}
        </div>
        <ArrowDown className="w-[24px] h-[24px] stroke-2 stroke-iconSecondary ml-1" />
      </div>

      {isOpen && (
        <div
          ref={refOption}
          className="absolute z-10 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300"
        >
          <ul>
            {phone &&
              phone?.map(item => (
                <li
                  key={Math.random()}
                  onClick={onOptionClicked(item)}
                  className="cursor-pointer pl-10 py-2 hover:text-textBrand"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactList;
