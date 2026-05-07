'use client';

import React from 'react';

interface Suggestion {
  display_name: string;
}

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = React.useState('');
  const [items, setItems] = React.useState<Suggestion[]>([]);
  const [open, setOpen] = React.useState(false);

  const search = async (text: string) => {
    setValue(text);

    if (text.length < 3) {
      setItems([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1&limit=5`
    );

    const data = await res.json();
    setItems(data);
    setOpen(true);
  };

  const select = (item: Suggestion) => {
    setValue(item.display_name);
    setOpen(false);
    setItems([]);
    onChange?.(item.display_name);
  };

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => search(e.target.value)}
        placeholder="Введите адрес (Польша, Украина, Европа)"
        className="w-full border rounded-md p-2 text-sm"
      />

      {open && items.length > 0 && (
        <div className="absolute z-50 w-full bg-white border rounded-md mt-1 shadow">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => select(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};