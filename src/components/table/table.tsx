import React from 'react';


interface ITableProps {
  children: React.ReactNode
}

function Table({ children }: ITableProps): JSX.Element {
  return (
    <table className="table">
      { children }
    </table>
  );
}


export default Table;
