import React from 'react';


interface ITableBodyProps {
  children: React.ReactNode
}

function TableBody({ children }: ITableBodyProps) {
  return (
    <tbody>
    { children }
    </tbody>
  );
}


export default TableBody;
