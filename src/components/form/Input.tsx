import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

export default function Input(props: {
  name: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const { name, value, setValue, label } = props;
  return (
    <div className="flex-row">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />
    </div>
  );
}
