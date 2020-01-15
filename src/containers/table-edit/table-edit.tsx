import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableBodyList } from "../../components/table";
import { ITableEmployers } from "../../config";


interface ITableEditProps {
  employers: ITableEmployers[],
  fields: string[]
}

interface ITableEditState {
  employers: ITableEmployers[];
  employersHeader: string[];
  editId: null | number;
  editItems: null | ITableEmployers;
}


function TableEdit(props: ITableEditProps) {
  const [ employer, setEmployer ] = useState<ITableEditState>({
    employers: props.employers,
    employersHeader: props.fields,
    editId: null,
    editItems: null
  });
  const { employers, employersHeader, editId, editItems } = employer;


  const salaryAllEmployers = (): number => {
    return employer.employers.reduce((before, elem) => {
      return before += elem.days * elem.pay;
    }, 0);
  };

  const handleChangeId = (id: number) => (event: React.MouseEvent): void => {
    setEmployer({
      employers,
      employersHeader,
      editId: id,
      editItems: null
    });
  };

  const handleChangeItem = (obj: ITableEmployers): void => {
    setEmployer({
      employers,
      employersHeader,
      editId,
      editItems: obj
    });
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const newEmployers = employers.map(elem => {
      if (editItems && elem.id === editId) {
        return { id: elem.id, ...editItems }
      }

      return elem;
    });

    setEmployer({
      employersHeader,
      employers: newEmployers,
      editId: null,
      editItems: null
    });
  };


  const allEmployers = employers.map((elem) => {
    return <TableBodyList
      key={ elem.id }
      { ...elem }
      editId={ editId }
      onChangeId={ handleChangeId }
      onChangeItem={ handleChangeItem }
    />
  });

  return (
    <div className="maxSpace" onDoubleClickCapture={ handleClickOutside }>
      <div className="container">
        <Table>
          <TableHeader headers={ employersHeader }/>
          <TableBody>
            { allEmployers }
            <tr>
              <td colSpan={ 6 }>
                Зарплата всех работников: <strong>{ salaryAllEmployers() }</strong>
              </td>
            </tr>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


export default TableEdit;
