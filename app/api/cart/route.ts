import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export const runtime = 'nodejs'; 


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token, // Simplified - no need for OR with one condition
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    // Return empty cart if not found
    if (!userCart) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Failed to retrieve the cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // Check if the same cart item exists (with same ingredients)
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: data.ingredients?.length 
          ? {
              every: {
                id: { in: data.ingredients },
              },
            }
          : undefined, // Handle case when no ingredients
      },
    });

    // If item found, increment quantity by 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: data.ingredients?.length 
            ? { connect: data.ingredients.map((id) => ({ id })) }
            : undefined,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Failed to create the cart' }, { status: 500 });
  }
}