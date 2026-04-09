"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { PizzaImage } from "./pizza-image";
import { Button } from "../ui";
import { Pizza } from "lucide-react";
interface Props {
  imageUrl: string;
  name: string;
  size: number;
  ingredients: any[];
  items: any[];
  onClickAdd: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  size,
  ingredients,
  items,
  onClickAdd,
  className,
}) => {
  const textDetaills = "30 sm , traditional dough";
  const totalPrice = 350;

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[390px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        <Button
          
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
