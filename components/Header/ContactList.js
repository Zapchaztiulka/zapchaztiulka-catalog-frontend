"use client";
import React from "react";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDown, PhoneIconContact } from "@/public/icons";

const phone = [
  { tel: "(050) 810 48 82" },
  { tel: "(066) 810 48 82" },
  { tel: "(096) 810 48 82" },
];

const ContactList = () => {
  const [selected, setSelected] = useState(phone[0]);

  return (
    <div className="w-[200px] tablet768:block hidden desktop1440:mr-[44px]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="flex w-[200px] cursor-pointer p-xs2 text-left focus:outline-none  text-textPrimary focus-visible:outline-none text-base ui-focus-visible:outline-none">
            <span className="pointer-events-none inset-y-0 left-0 flex items-center">
              <PhoneIconContact className="w-[24px] h-[24px] stroke-iconSecondary stroke-2" />
            </span>
            <span className="block overflow-hidden text-ellipsis">
              <p className="ml-2">{selected.tel}</p>
            </span>
            <span className="pointer-events-none inset-y-0 right-0 flex items-center">
              <ArrowDown className="w-[24px] h-[24px] stroke-2 stroke-iconSecondary" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-bgWhite py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {phone?.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-bgBrandLight1 text-textBrand"
                        : "text-gray-900"
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
