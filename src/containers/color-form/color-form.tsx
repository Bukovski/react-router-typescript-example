import From from "../../components/form";
import React, { Fragment, useState } from "react";
import Mark from "../../components/mark";
import ListItem from "../../components/list-item";


interface IColorObj {
  id: number,
  color: string,
  showList: boolean
}


function ColorForm(props: object) {
  const [ colors, setColors ] = useState<IColorObj[]>([
    { id: 0, color: "red", showList: false },
    { id: 1, color: "blue", showList: true },
    { id: 2, color: "yellow", showList: true },
  ]);


  const handleClick = (event: React.MouseEvent): void => {
    const { nodeName, style: { backgroundColor } } = event.target as HTMLDivElement;

    if (nodeName === "SPAN") {
      const newColors = colors.map(color => {
        if (color.color === backgroundColor) {
          return { ...color, showList: !color.showList };
        }

        return color;
      });

      setColors(newColors)
    }
  };

  const handleCreateColor = (color: string): void => {
    const newId: number = new Date().getTime();
    const newColorObj: IColorObj = { id: newId, color: color, showList: false };

    setColors([ ...colors, newColorObj ])
  };

  const _marksList = (colors: IColorObj[]): JSX.Element[] => {
    return colors.map(({ id, color, showList }) => <Mark
      key={ id }
      color={ color }
      mark={ showList }
    />);
  };

  const _itemsList = (colors: IColorObj[]) => {
    return colors.reduce((arr: JSX.Element[], { id, color, showList }: IColorObj): JSX.Element[] => {
      if (showList) {
        return [ ...arr, <ListItem key={ id } color={ color }/> ];
      }

      return arr;
    }, []);
  };

  return (
    <Fragment>
      <div className="row">
        <From onCreateColor={ handleCreateColor } colors={ colors } />

        <div className="marks" onClick={ handleClick }>
          { _marksList(colors) }
        </div>
      </div>

      <div className="list-group">
      { _itemsList(colors) }
      </div>
    </Fragment>
  )
}


export default ColorForm;
