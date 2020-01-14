import React from 'react';


export interface IListItemProps {
  color: string;
}

function ListItem({ color = "grey" }: IListItemProps): JSX.Element {
  return (
    <p
      className="list-group-item list-group-item-action"
      style={{ color: color }}
    >{ color }</p>
  );
}


export default ListItem;
