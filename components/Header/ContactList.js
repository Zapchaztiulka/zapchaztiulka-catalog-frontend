"use client";
import { useOnKeyDown, useOutsideClick } from "@/hooks/useOnClickOutside";
import { ArrowDown, PhoneIconContact } from "@/public/icons";
import { useEffect, useRef, useState } from "react";

const ContactList = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ phone, setPhone ] = useState();

  useEffect(() => {
    setPhone(["(050) 810 48 82", "(066) 810 48 82", "(096) 810 48 82"]);
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
    <div ref={refSelect} className="relative w-[200px] tablet768:block hidden desktop1440:mr-[44px]">
      <div
        onClick={toggling}
        className="flex w-[200px] cursor-pointer p-xs2 text-left focus:outline-none  text-textPrimary text-base custom-select-contact"
      >
        <PhoneIconContact className="w-[24px] h-[24px] stroke-iconSecondary stroke-2 mr-2" />
        <div>{selected || "(050) 810 48 82"}</div>
        <ArrowDown className="w-[24px] h-[24px] stroke-2 stroke-iconSecondary ml-1" />
      </div>

      {isOpen && (
        <div ref={refOption} className="absolute z-10 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300">
          <ul>
            {phone && phone?.map((item) => (
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
