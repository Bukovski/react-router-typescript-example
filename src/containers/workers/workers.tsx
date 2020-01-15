import React, { useState } from "react";
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

type Sorting = (field: string) => {
  asc: (a: any, b: any) => 0 | 1 | -1;
  desc: (a: any, b: any) => 0 | 1 | -1;
};


function Workers(props: object) {
  const [ workers, setWorkers ] = useState<IWorkerData[]>([
    { id: 1, name: 'Donald', surname: 'Duck', pay: 1000, checked: true },
    { id: 2, name: 'John', surname: 'Dou', pay: 3000, checked: true },
    { id: 3, name: 'Max', surname: 'Pain', pay: 500, checked: false },
    { id: 4, name: 'Jon', surname: 'Snow', pay: 1500, checked: false },
  ]);
  const [ sorting, setSorting ] = useState<ISortingData>({
    field: "",
    order: "asc"
  });


  const _sorting: Sorting = (field) => {
    return {
      asc: (a, b) => (a[ field ] < b[ field ]) ? -1 : (a[ field ] > b[ field ]) ? 1 : 0,
      desc: (a, b) => (a[ field ] > b[ field ]) ? -1 : (a[ field ] < b[ field ]) ? 1 : 0
    }
  };

  const handleChecked = (id: number) => (): void => {
    const updateWorkers: IWorkerData[] = workers.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked
      }

      return item
    });

    setWorkers(updateWorkers)
  };

  const handleSortClick = (name: string) => (): void => {
    const isExistName: boolean = Object.keys(workers[ 0 ]).includes(name) && name !== "checked";

    if (!isExistName) return;

    if (sorting.field === name) {
      const { order, field } = sorting;

      setSorting({
        field: field,
        order: (order === "asc") ? "desc" : "asc"
      });
    } else {
      setSorting({
        field: name,
        order: "asc"
      });
    }
  };


  const { field, order } = sorting;
  const sortItem: IWorkerData[] = (field) ? workers.sort(_sorting(field)[ order ]) : workers;
  const tableBody: JSX.Element[] = sortItem.map((worker) => {
    return <WorkersBody
      key={ worker.id }
      { ...worker }
      onIsChecked={ handleChecked }
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
            onSortClick={ handleSortClick }
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


export default Workers;
