import React, { Dispatch, SetStateAction } from 'react';
import { rowStyle } from '../styles/flex';

export default function Input(props: {
  name: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const { name, value, setValue, label } = props;
  return (
    <div style={rowStyle}>
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
