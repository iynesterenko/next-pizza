import { prisma } from "@/prisma/prisma-client";
import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import { notFound } from "next/navigation";

export default async function ProductModalPage({params,}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    notFound();
  }

  return <ChooseProductModal product={product} />;
}
