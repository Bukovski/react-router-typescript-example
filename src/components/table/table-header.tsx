import React from 'react';


interface ITableHeaderProps {
  headers: string[]
}

function TableHeader({ headers }: ITableHeaderProps) {
  const callbackHeader = (item: string): JSX.Element => {
    return <th key={ item } scope="col">{ item }</th>;
  };
  
  return (
    <thead className="thead-dark">
    <tr>
      { headers.map(callbackHeader) }
    </tr>
    </thead>
  )
}


export default TableHeader;
