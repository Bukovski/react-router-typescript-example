import React from 'react';


export interface IInputRefProps {
  name: string;
  value: number | string;
  onFocusField: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (event: HTMLInputElement) => void;
}

function InputRef({ name, value, onFocusField, inputRef }: IInputRefProps) {
  type TypeValue = (data: number | string) => "text" | "number";

  const typeValue: TypeValue = (data) => isNaN(data as number) ? "text" : "number";

  return (
    <input
      name={ name }
      type={ typeValue(value) }
      ref={ inputRef }
      onKeyDown={ onFocusField }
      defaultValue={ value }
    />
  );
}


export default InputRef;
