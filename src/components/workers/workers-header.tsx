import React from 'react';
import { ISortingData, IWorkerData } from "../../containers/workers/workers";


interface IWorkersHeaderProps {
  worker: IWorkerData;
  sortData: ISortingData;
  onSortClick: (name: string) => () => void;
}

function WorkersHeader({ worker, sortData, onSortClick }: IWorkersHeaderProps): JSX.Element {
  const { field = "", order } = sortData;
  
  const arrowUpDown = (fieldName: string): JSX.Element | "" => {
    if (field && field === fieldName) {
      const arrow = (order === "asc") ? "&#9650;" : "&#9660;";
      
      return <span dangerouslySetInnerHTML={{ __html: arrow }}/>
    }
    
    return ""
  };
  
  const upperFirstLatter = (str: string): string => {
    return str[ 0 ].toUpperCase() + str.slice(1);
  };
  
  const callbackHeader = ([ key, value ] : string[]) => {
    return <th key={ key } scope="col" onClick={ onSortClick(key) }
    >{ upperFirstLatter(key) } { arrowUpDown(key) }</th>;
  };
  
  return <React.Fragment>
    { Object.entries(worker).map(callbackHeader) }
  </React.Fragment>
}


export default WorkersHeader;
