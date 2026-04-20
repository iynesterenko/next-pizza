import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const textDetaills = `${size}, ${type === 1 ? "traditional" : "thin"} dough`;

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );
  return {
    textDetaills,
    totalPrice,
  };
};
