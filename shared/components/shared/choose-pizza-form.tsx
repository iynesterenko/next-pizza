"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { PizzaImage } from "./pizza-image";
import { Button } from "../ui";
import { Group, Pizza } from "lucide-react";
import { GroupVariants } from "./product-image/group-variant";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
  className,
}) => {

  const [size, setSize] = React.useState<PizzaSize>(40);
  const [type, setType] = React.useState<PizzaType>(1);
  

  const textDetaills = `${size}, ${type === 1 ? 'traditional' : 'thin'} dough`;
  const totalPrice = 350;

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[480px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-4  mt-5">
        <GroupVariants items={pizzaSizes} value={String(size)} onClick={(value)=>{setSize(Number(value) as PizzaSize)}}></GroupVariants>
        <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value)=>{setType(Number(value) as PizzaType)}}></GroupVariants>
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[240px] overflow-auto scrollbar mt-5">
            <div className='grid grid-cols-3 gap-3 mt-5'>
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={onClickAdd}
              />

            ))}

          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
