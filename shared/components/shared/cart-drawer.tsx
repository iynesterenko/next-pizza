"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

import { useShallow } from "zustand/react/shallow";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
 const {
  totalAmount,
  items,
  fetchCartItems,
  updateItemQuantity,
  removeCartItem,
  loading,
} = useCartStore(
  useShallow((state) => ({
    totalAmount: state.totalAmount,
    items: state.items,
    fetchCartItems: state.fetchCartItems,
    updateItemQuantity: state.updateItemQuantity,
    removeCartItem: state.removeCartItem,
    loading: state.loading,
  }))
);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = React.useCallback(
    (id: number, quantity: number, type: "plus" | "minus") => {
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      if (newQuantity <= 0) return;
      updateItemQuantity(id, newQuantity);
    },
    [updateItemQuantity]
  );

  const isEmpty = totalAmount === 0;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        
        <SheetHeader>
          <SheetTitle>
            {isEmpty ? "Cart" : `In the cart ${items.length} items`}
          </SheetTitle>
        </SheetHeader>

        {/* ================= EMPTY ================= */}
        {isEmpty && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <Image
              src="/assets/images/empty-box.png"
              alt="Empty cart"
              width={120}
              height={120}
            />

            <p className="text-lg font-bold">Cart is empty</p>

            <p className="text-muted-foreground max-w-[250px]">
              Add products to your cart and they will appear here
            </p>

            <SheetClose asChild>
              <Button className="w-64 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Back to menu
              </Button>
            </SheetClose>
          </div>
        )}

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex flex-col gap-3 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        )}

        {/* ================= ITEMS ================= */}
        {!isEmpty && !loading && (
          <>
            <div className="overflow-auto flex-1 p-2">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  disabled={item.disabled}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  details={
                    item.pizzaSize
                      ? getCartItemDetails(
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                          item.ingredients
                        )
                      : ""
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                />
              ))}
            </div>

            {/* ================= FOOTER ================= */}
            <SheetFooter className="bg-white p-6">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed mx-2" />
                  </span>

                  <span className="font-bold text-lg">
                    {totalAmount.toFixed(2)} $
                  </span>
                </div>

                {/* ✅ FIX Link + Button */}
                <Button asChild className="w-full h-12 text-base">
                  <Link href="/checkout">
                    Checkout
                    <ArrowRight className="w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};