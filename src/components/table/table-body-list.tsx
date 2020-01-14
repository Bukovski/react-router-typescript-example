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


function TableBodyList(props: ITableBodyListProps) {
  const { id, name, surname, days, pay, onChangeId, editId, onChangeItem } = props;

  const _inputs: IInputs = {};

  const _inputCallbackRef = (input: HTMLInputElement): void => {
    if (input && input.name) {
      _inputs[ input.name ] = input;
    }
  };


  const sendInputData = (): ITableEmployers => {
    const inputData: {} | ITableEmployers = Object.entries(_inputs).reduce((before, [ key, value ]) => {
      return { ...before, [ key ]: value.value }
    }, {});

    return inputData as ITableEmployers
  };

  const handleFocusField = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { name } = event.target as HTMLInputElement;

      const nextInputKey = nextKey(_inputs, name);

      if (nextInputKey) {
        _inputs[ nextInputKey ].focus();
      } else {
        const firstIndexKey = firstKey(_inputs);

        _inputs[ firstIndexKey ].focus();
      }
    }

    onChangeItem(sendInputData());
  };


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
          onFocusField={ handleFocusField }
          inputRef={ _inputCallbackRef }
        />
      </td>
      <td>
        <InputRef
          name={ "surname" }
          value={ surname }
          onFocusField={ handleFocusField }
          inputRef={ _inputCallbackRef }
        />
      </td>
      <td>
        <InputRef
          name={ "days" }
          value={ days }
          onFocusField={ handleFocusField }
          inputRef={ _inputCallbackRef }
        />
      </td>
      <td>
        <InputRef
          name={ "pay" }
          value={ pay }
          onFocusField={ handleFocusField }
          inputRef={ _inputCallbackRef }
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


export default TableBodyList;
