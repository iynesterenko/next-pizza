import React from 'react';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate = ({
  orderId,
  items,
}: Props): React.ReactElement => {
  return (
    <div>
      <h1>Спасибо за заказ! 🎉</h1>

      <p>Заказ №{orderId}</p>

      <hr />

      <h2>Состав заказа:</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} x {item.quantity}
          </li>
        ))}
      </ul>

      <p>Мы уже готовим вашу пиццу 🍕</p>
    </div>
  );
};