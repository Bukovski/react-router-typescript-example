import React, { Component } from 'react';
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

interface IFromState {
  colorValue: string
}

class From extends Component<IFromProps, IFromState> {
  private _input: React.RefObject<HTMLInputElement>;

  constructor(props: IFromProps) {
    super(props);
    
    this.state = {
      colorValue: ""
    };
    
    this._input = React.createRef();
  }
  
  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    
    this.setState({
      colorValue: value
    });
  };
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    
    const { colorValue } = this.state;
    
    //compare the entered data with the allowed list of colors
    if (COLOR_ONLY.includes(colorValue)) {
      //if that color isn’t in circles yet
      if (!this._matchColor(colorValue)) {
        this.props.onCreateColor(colorValue);
      }
      
      this.setState({ colorValue: "" });
      
      this._errorStyle();
    } else {
      this._errorStyle(true);
    }
  };
  
  _matchColor(value: string): boolean {
    return this.props.colors.some(({ color }) => color === value);
  }
  
  _errorStyle(error: boolean = false) {
    const { className } = this._input.current as HTMLInputElement;
    const checkInvalidClass: boolean = className.includes("is-invalid");
    
    if (error) {
      return !checkInvalidClass && (this._input.current!.className = className + " is-invalid");
    } else {
      return checkInvalidClass && (this._input.current!.className = className.replace("is-invalid", ""));
    }
  }
  
  render() {
    const { colorValue } = this.state;
    
    return(
      <form className="col-md-12 input-group" onSubmit={ this.handleSubmit }>
        <input
          type="text"
          className="form-control col-md-3"
          placeholder="Введите цвет"
          ref={ this._input }
          value={ colorValue }
          onChange={ this.handleChange }
        />
        <button className="btn btn-primary col-md-2">Отправить</button>
      </form>
    );
  }
}


export default From;
