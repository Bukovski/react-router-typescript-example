import React from 'react';
import { IWorkerData } from "../../containers/workers/workers";


interface IWorkersSalaryProps {
  workers: IWorkerData[]
}

function WorkersSalary({ workers }: IWorkersSalaryProps): JSX.Element {
  const workersCountPay = (collection: IWorkerData[]) => {
    return collection.reduce((before: number, obj: IWorkerData) => {
      return before += ((obj.checked) ? obj.pay : 0)
    }, 0);
  };
  
  return (
    <span className="alert-info">
      Общая зарплата выбранных сотрудников : <strong>{ workersCountPay(workers) }</strong>
    </span>
  )
}


export default WorkersSalary;
