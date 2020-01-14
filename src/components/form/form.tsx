import React, { useRef, useState } from 'react';
import { COLOR_ONLY } from "../../config"


export interface IColors {
  id: number,
  color: string,
  showList: boolean
}

interface IFromProps {
  onCreateColor: (color: string) => void,
  colors: IColors[]
}


function From(props: IFromProps) {
  const { colors, onCreateColor } = props;

  const _input: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [ colorValue, setColorValue ] = useState<string>("");


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setColorValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    //compare the entered data with the allowed list of colors
    if (COLOR_ONLY.includes(colorValue)) {
      //if that color isn’t in circles yet
      if (!_matchColor(colorValue)) {
        onCreateColor(colorValue);
      }

      setColorValue("");

      _errorStyle();
    } else {
      _errorStyle(true);
    }
  };

  const _matchColor = (value: string): boolean => {
    return colors.some(({ color }) => color === value);
  };

  const _errorStyle = (error: boolean = false) => {
    const { className } = _input.current as HTMLInputElement;
    const checkInvalidClass: boolean = className.includes("is-invalid");

    if (error) {
      return !checkInvalidClass && (_input.current!.className = className + " is-invalid");
    } else {
      return checkInvalidClass && (_input.current!.className = className.replace("is-invalid", ""));
    }
  };


  return(
    <form className="col-md-12 input-group" onSubmit={ handleSubmit }>
      <input
        type="text"
        className="form-control col-md-3"
        placeholder="Введите цвет"
        ref={ _input }
        value={ colorValue }
        onChange={ handleChange }
      />
      <button className="btn btn-primary col-md-2">Отправить</button>
    </form>
  );
}


export default From;
