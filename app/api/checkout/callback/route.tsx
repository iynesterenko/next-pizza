import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-temapltes/order-success';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    console.log('[YOOKASSA CALLBACK]', body);

    const orderId = Number(body.object?.metadata?.order_id);

    if (!orderId) {
      return NextResponse.json({ error: 'No order id' });
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: isSucceeded
          ? OrderStatus.SUCCEEDED
          : OrderStatus.CANCELLED,
      },
    });

    let items: CartItemDTO[] = [];

    try {
      items = JSON.parse(order.items as string);
    } catch (e) {
      console.log('ITEMS PARSE ERROR', e);
    }

    if (isSucceeded) {
      await sendEmail(
  order.email,
  'Next Pizza / Ваш заказ успешно оформлен 🎉',
  <OrderSuccessTemplate orderId={order.id} items={items} />
);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}