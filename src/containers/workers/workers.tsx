import React from "react";
import { WorkersHeader, WorkersBody, WorkersSalary } from "../../components/workers"


export interface IWorkerData {
  id: number;
  name: string;
  surname: string;
  pay: number;
  checked: boolean;
}

export interface ISortingData {
  field : string;
  order : "desc" | "asc";
}

interface IWorkersState {
  workers: IWorkerData[],
  sorting: ISortingData
}

type Sorting = (field: string) => {
  asc: (a: any, b: any) => 0 | 1 | -1;
  desc: (a: any, b: any) => 0 | 1 | -1;
};


class Workers extends React.Component<{}, IWorkersState> {
 state: IWorkersState = {
    workers: [
      { id: 1, name: 'Donald', surname: 'Duck', pay: 1000, checked: true },
      { id: 2, name: 'John', surname: 'Dou', pay: 3000, checked: true },
      { id: 3, name: 'Max', surname: 'Pain', pay: 500, checked: false },
      { id: 4, name: 'Jon', surname: 'Snow', pay: 1500, checked: false },
    ],
    sorting: {
      field: "",
      order: "asc"
    }
  };


  sorting: Sorting = (field) => {
    return {
      asc: (a, b) => (a[ field ] < b[ field ]) ? -1 : (a[ field ] > b[ field ]) ? 1 : 0,
      desc: (a, b) => (a[ field ] > b[ field ]) ? -1 : (a[ field ] < b[ field ]) ? 1 : 0
    }
  };

  handleChecked = (id: number) => (): void => {
    this.setState(({ workers }) => {
      const updateWorkers: IWorkerData[] = workers.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked
        }

        return item
      });

      return {
        workers: updateWorkers
      }
    })
  };

  handleSortClick = (name: string) => (): void => {
    const { workers, sorting: { field } } = this.state;

    const isExistName: boolean = Object.keys(workers[ 0 ]).includes(name) && name !== "checked";

    if (!isExistName) return;

    if (field === name) {
      this.setState(({ sorting: { order, field } }) => ({
        sorting: {
          field: field,
          order: (order === "asc") ? "desc" : "asc"
        }
      }));
    } else {
      this.setState({
        sorting: {
          field: name,
          order: "asc"
        }
      });
    }
  };

  render() {
    const { workers, sorting: { field, order }, sorting } = this.state;

    const sortItem: IWorkerData[] = (field) ? workers.sort(this.sorting(field)[ order ]) : workers;

    const tableBody: JSX.Element[] = sortItem.map((worker) => {
      return <WorkersBody
        key={ worker.id }
        { ...worker }
        onIsChecked={ this.handleChecked }
      />;
    });

    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <WorkersHeader
              worker={ workers[ 0 ] }
              sortData={ sorting }
              onSortClick={ this.handleSortClick }
            />
          </tr>
          </thead>
          <tbody>
          { tableBody }
          </tbody>
        </table>

        <WorkersSalary workers={ workers }/>
      </div>
    )
  }
}


export default Workers;
