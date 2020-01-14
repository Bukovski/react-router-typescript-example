import React from 'react';
import { IWorkerData } from "../../containers/workers/workers";


interface IWorkersBodyProps extends IWorkerData{
  onIsChecked: (id: number) => () => void
}

const WorkersBody: React.FC<IWorkersBodyProps> = ({ id, name, surname, pay, checked, onIsChecked }): JSX.Element => (
  <tr>
    <td>{ id }</td>
    <td>{ name }</td>
    <td>{ surname }</td>
    <td>{ pay }</td>
    <td>
      <input
        type="checkbox"
        id={ id.toString() }
        checked={ checked }
        onClick={ onIsChecked(id) }
      />
    </td>
  </tr>
);


export default WorkersBody;
