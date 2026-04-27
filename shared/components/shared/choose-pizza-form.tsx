"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { PizzaImage } from "./pizza-image";
import { Button } from "../ui";
import { GroupVariants } from "./product-image/group-variant";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";

import { getPizzaDetails } from "@/shared/lib/index";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onClickAddCart,
  onSubmit,
  className,
}) => {
  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId!, Array.from(selectedIngredients));
    }
  };

  const {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    availableSizes,
    currentItemId,
  } = usePizzaOptions(items);
  const { textDetaills, totalPrice } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[480px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-4  mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => {
              setSize(Number(value) as PizzaSize);
            }}
          ></GroupVariants>
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => {
              setType(Number(value) as PizzaType);
            }}
          ></GroupVariants>
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[240px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3 mt-5">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
