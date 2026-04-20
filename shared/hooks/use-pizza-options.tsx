import React from "react";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "@/shared/lib/index";
import { Variant } from "../components/shared/product-image/group-variant";
import { useSet } from "react-use";


interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  availableSizes: Variant[] ;
  currentItemId?: number;
}

export const usePizzaOptions = ( items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(40);
  const [type, setType] = React.useState<PizzaType>(1);
    const availableSizes = getAvailablePizzaSizes(type, items); 

   const [selectedIngredients, { toggle: AddIngredient }] = useSet(
    new Set<number>([]),
  );
  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);
  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredient: AddIngredient,
    availableSizes,
    currentItemId,
  }
};
