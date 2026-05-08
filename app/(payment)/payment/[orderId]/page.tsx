'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { OrderStatus } from '@prisma/client';

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { orderId } = React.use(params);

  const onPay = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          status: OrderStatus.SUCCEEDED,
        }),
      });

      toast.success('Оплата успішна 🎉');
      router.push('/');

    } catch (err) {
      console.log(err);
      toast.error('Помилка оплати ❌');
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-[420px] bg-white shadow-xl rounded-2xl p-6 border">
        <h1 className="text-2xl font-bold mb-2">
          Оплата замовлення #{orderId}
        </h1>

        <p className="text-gray-500 mb-6">
          Це тестова сторінка оплати (fake payment)
        </p>

        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-600">Метод оплати:</p>
          <p className="font-semibold">Банківська картка</p>
        </div>

        <button
          onClick={onPay}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold mb-3 disabled:opacity-50"
        >
          {loading ? 'Обробка...' : 'Оплатити'}
        </button>

        <button
          onClick={onCancel}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-semibold"
        >
          Скасувати
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Demo mode — no real payment is processed
        </p>
      </div>
    </div>
  );
}