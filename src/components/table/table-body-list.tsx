import React from 'react';
import InputRef from "../input/input-ref";
import { firstKey, nextKey } from "../../utils";
import { ITableEmployers } from "../../config"


interface ITableBodyListProps extends ITableEmployers {
  onChangeId : (id : number) => (event : React.MouseEvent) => void;
  editId : null | number;
  onChangeItem : (obj: ITableEmployers) => void;
}

interface IInputs {
  [key: string] : HTMLInputElement
}


class TableBodyList extends React.Component<ITableBodyListProps, object> {
  private _inputs : IInputs;
  private _inputCallbackRef : (field: string) => (input: HTMLInputElement) => void;

  constructor(props: ITableBodyListProps) {
    super(props);

    this._inputs = {};

    this._inputCallbackRef = (field) => (input) => {
      this._inputs[ field ] = input
    }
  }

  
  sendInputData(): ITableEmployers {
    const inputData: {} | ITableEmployers = Object.entries(this._inputs).reduce((before, [ key, value ]) => {
      return { ...before, [ key ]: value.value }
    }, {});

    return inputData as ITableEmployers
  }
  
  handleFocusField = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { name } = event.target as HTMLInputElement;
      
      const nextInputKey = nextKey(this._inputs, name);
      
      if (nextInputKey) {
        this._inputs[ nextInputKey ].focus();
      } else {
        const firstIndexKey = firstKey(this._inputs);

        this._inputs[ firstIndexKey ].focus();
      }
    }
    
    this.props.onChangeItem(this.sendInputData());
  };
  
  render() {
    const { id, name, surname, days, pay, onChangeId, editId } = this.props;
    
    const salary = (days * pay).toFixed(2);
    
    const editForm = (editId !== id)
      ? <React.Fragment>
        <td>{ id }</td>
        <td>{ name }</td>
        <td>{ surname }</td>
        <td>{ days }</td>
        <td>{ pay }</td>
        <td>{ salary }</td>
      </React.Fragment>
      
      : <React.Fragment>
        <td>{ id }</td>
        <td>
          <InputRef
            name={ 'name' }
            value={ name }
            onFocusField={ this.handleFocusField }
            inputRef={ this._inputCallbackRef("name") }
          />
        </td>
        <td>
          <InputRef
            name={ "surname" }
            value={ surname }
            onFocusField={ this.handleFocusField }
            inputRef={ this._inputCallbackRef("surname") }
          />
        </td>
        <td>
          <InputRef
            name={ "days" }
            value={ days }
            onFocusField={ this.handleFocusField }
            inputRef={ this._inputCallbackRef("days") }
          />
        </td>
        <td>
          <InputRef
            name={ "pay" }
            value={ pay }
            onFocusField={ this.handleFocusField }
            inputRef={ this._inputCallbackRef("pay") }
          />
        </td>
        <td>{ salary }</td>
      </React.Fragment>;
    
    return (
      <tr onDoubleClick={ onChangeId(id) }>
        { editForm }
      </tr>
    )
  }
}


export default TableBodyList;
