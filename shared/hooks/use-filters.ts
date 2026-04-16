'use client';

import React from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (id: string) => void;
  setSizes: (id: string) => void;
  setSelectedIngredients: (id: string) => void;
}

export const useFilters = (): ReturnProps => {
  const router = useRouter();
  const searchParams = useSearchParams(); 

  /* filter of ingredients */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") ?? [])
  );

  /* filter of sizes */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes")?.split(",") ?? []
    )
  );

  /* filter of pizza types */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes")?.split(",") ?? []
    )
  );

  /* filter of prices */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : undefined,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};