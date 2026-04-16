"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/index";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Container } from "./container";
import { SearchInput } from "./search-input";

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

          <Button className="group relative flex items-center gap-2">
            <b>52$</b>
            <span className="h-full w-[1px] bg-white/30 mx-3"></span>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart className="h-4 w-4" strokeWidth={2} />
              <b>3</b>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};