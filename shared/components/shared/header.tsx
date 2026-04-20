"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/index";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import { CartButton } from "./";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200">
      <Container className="flex items-center justify-between py-4">
        {/* Left side */}
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
          </div>
        </Link>

        {/* Center (пустой для поиска, можно добавить SearchInput) */}
        <div className="flex-1 mx-10">
          <SearchInput />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Log in
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};