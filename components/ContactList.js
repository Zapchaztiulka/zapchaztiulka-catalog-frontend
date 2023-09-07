"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

const phone = [
  { tel: "(050) 810 48 82" },
  { tel: "(066) 810 48 82" },
  { tel: "(096) 810 48 82" },
];

const ContactList = () => {
  const [selected, setSelected] = useState(phone[0]);

  return (
     <div className="w-200 mr-[24px] md:block hidden">
        
        <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="flex w-200 cursor-pointer p-2 text-left focus:outline-none  text-text-primary focus-visible:ring-offset-orange-300 text-base">
           <span className="pointer-events-none inset-y-0 left-0 flex items-center">
                 <Image
            src="/phone-icon.svg"
            alt="phone-icon"
            className="object-contain"
            width={24}
            height={24}/>   
            </span>
                 <span className="block overflow-hidden text-ellipsis"><p className="ml-2">{selected.tel}</p></span>
                 <span className="pointer-events-none inset-y-0 right-0 flex items-center">
                 <Image
            src="/arrow-down-icon.svg"
            alt="arrow-icon"
            className="object-contain"
            width={24}
            height={24}/>   
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {phone?.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.tel}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          -
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ContactList;
