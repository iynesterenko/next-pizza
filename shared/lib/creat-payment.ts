import axios from "axios";
import crypto from "crypto";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<any>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID!,
        password: process.env.YOOKASSA_API_KEY!,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": crypto.randomUUID(),
      },
    },
  );

  return data;
}
