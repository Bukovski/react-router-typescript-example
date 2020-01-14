import React from 'react';
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


class TableEdit extends React.Component<ITableEditProps, ITableEditState> {
  constructor(props: ITableEditProps) {
    super(props);
    
    this.state = {
      employers: props.employers,
      employersHeader: props.fields,
      editId: null,
      editItems: null
    }
  }

  salaryAllEmployers(): number {
    return this.state.employers.reduce((before, elem) => {
      return before += elem.days * elem.pay;
    }, 0);
  }
  
  handleChangeId = (id: number) => (event: React.MouseEvent): void => {
    this.setState({
      editId: id,
      editItems: null
    });
  };
  
  handleChangeItem = (obj: ITableEmployers): void => {
    this.setState({
      editItems: obj
    });
  };
  
  handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState(({ employers, editId, editItems }) => {
      const newEmployers = employers.map(elem => {
        if (editItems && elem.id === editId) {
          return { id: elem.id, ...editItems }
        }

        return elem;
      });

      return {
        employers: newEmployers,
        editId: null,
        editItems: null
      }
    })
  };
  
  render() {
    const { employers, employersHeader, editId } = this.state;
    
    const allEmployers = employers.map((elem) => {
      return <TableBodyList
        key={ elem.id }
        { ...elem }
        editId={ editId }
        onChangeId={ this.handleChangeId }
        onChangeItem={ this.handleChangeItem }
      />
    });
    
    return (
      <div className="maxSpace" onDoubleClickCapture={ this.handleClickOutside }>
        <div className="container">
          <Table>
            <TableHeader headers={ employersHeader }/>
            <TableBody>
              { allEmployers }
              <tr>
                <td colSpan={ 6 }>
                  Зарплата всех работников: <strong>{ this.salaryAllEmployers() }</strong>
                </td>
              </tr>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}


export default TableEdit;
