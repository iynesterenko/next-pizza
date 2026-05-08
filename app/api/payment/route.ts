import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { orderId, status } = body;
    console.log('Payment API called with:', body);
    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 },
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 },
      );
    }

    // 💳 симуляція різних станів
    if (status === OrderStatus.SUCCEEDED) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.SUCCEEDED,
        },
      });

      return NextResponse.json({ status: 'succeeded' });
    }

    if (status === OrderStatus.CANCELLED) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });

      return NextResponse.json({ status: 'cancelled' });
    }
    console.log('Order found:');

    // default pending
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PENDING,
      },
    });

    return NextResponse.json({ status: 'pending' });
  } catch (error) {
    console.log('[FAKE PAYMENT ERROR]', error);

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 },
    );
  }
}