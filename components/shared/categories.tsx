'use client';
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/catecogory";
import React, { use } from "react";

type Props = {
  className?: string;
};

 const cats = [
    { id: 1, name: "Pizzas" },
    { id: 2, name: "Breakfast" },
    { id: 3, name: "Appetizers" },
    { id: 4, name: "Cocktails" },
    { id: 5, name: "Drinks" },
  ];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiceId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn("inline-flex gap-1  bg-gray-50 p-1 rounded-2xl", className)} >
   
      {cats.map(({name, id}, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiceId === id &&
              "bg-white shadow-md shadow-gray-300 text-primary"
          )}
          href={`/#${name}`}
          key={index}>
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
