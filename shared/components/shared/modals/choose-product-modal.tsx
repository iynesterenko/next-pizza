"use client";

import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/shared/components/ui/dialog";
import ChooseProductForm from "../choose-product-form";
import { useCartStore } from "@/shared/store/cart";
import { on } from "events";
interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id
   });
  };
  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({ productItemId, ingredients, });
  };


useEffect(() => {
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
  };
}, []);

  return (
<Dialog
  open={Boolean(product)}
  onOpenChange={(open) => {
    if (!open) {
      router.back();
    }
  }}
>      <DialogTitle></DialogTitle>
      <DialogContent className="!w-[950px] !h-[600px] !max-w-[90vw] !max-h-[90vh] !min-w-[500px] !min-h-[400px] p-0 bg-white rounded-lg">
        {isPizzaForm ? (
          
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onClickAddCart={() => {}}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onClickAdd={() => {}}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
