"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Title } from "../title";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/types";
import { ChoosePizzaForm } from "../choose-pizza-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import ChooseProductForm from "../choose-product-form";
interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className  }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType) ;

  return (
    <Dialog  open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle></DialogTitle>
<DialogContent
  className="!w-[900px] !h-[600px] !max-w-[90vw] !max-h-[90vh] !min-w-[500px] !min-h-[400px] p-0 bg-white rounded-lg"
>
        {isPizzaForm ? (
          <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          size={50}
          ingredients={[]}
          items={[]}
          onClickAdd={() => {}}
          />
        ) : (
          <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          onClickAdd={() => {}}
        />
        )}
        
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
