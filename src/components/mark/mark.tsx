import React from 'react';
import './mark.css';


export interface IMarkProps {
  color: string;
  mark: boolean;
}

function Mark({ color = "grey", mark = false }: IMarkProps): JSX.Element {
  return (
    mark
      ? <span style={{ backgroundColor: color }} className="circle mark">&#10004;</span>
      : <span style={{ backgroundColor: color }} className="circle"/>
  );
}


const defaultProps: IMarkProps = {
  color: "grey",
  mark: false
};

Mark.defaultProps = defaultProps;


export default Mark;
