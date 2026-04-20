import { ingredients } from "@/prisma/constants";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice = items.find(
    (item) => item.pizzaType === type && item.size === size,
  )?.price;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice ? pizzaPrice + totalIngredientsPrice : 0;
  return totalPrice;
};
