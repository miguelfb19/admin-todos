"use client";
// Aqui se usa cookies-next porque estamos del lado del cliente
import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4]
}: Props) => {

  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`flex w-full space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((number) => (
        <div key={number} className="flex-1">
          <input
            type="radio"
            id={number.toString()}
            className="peer hidden"
            checked={selected === number}
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(number)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {number}
          </label>
        </div>
      ))}
    </div>
  );
};
