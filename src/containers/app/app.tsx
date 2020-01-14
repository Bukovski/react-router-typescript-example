import React, { Component } from 'react';
import From from '../../components/form';
import Mark from '../../components/mark';
import ListItem from '../../components/list-item';
import Tooltip from '../tooltip';
import TableEdit from '../table-edit';
import { TABLE_FIELDS, TABLE_EMPLOYERS } from '../../config';
import "./app.css"
import Workers from "../workers";
import { IColors } from "../../components/form/form";


export interface IAppState {
  colors: IColors[]
}

interface IColorObj {
  id: number, 
  color: string, 
  showList: boolean
}

export default class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    
    this.state = {
      colors: [
        { id: 0, color: "red", showList: false },
        { id: 1, color: "blue", showList: true },
        { id: 2, color: "yellow", showList: true },
      ]
    };
  }
  
  handleClick = (event: React.MouseEvent): void => {

    const { nodeName, style: { backgroundColor } } = event.target as HTMLDivElement;
    
    if (nodeName === "SPAN") {
      this.setState(({ colors }) => {
        const newColors = colors.map(color => {
          if (color.color === backgroundColor) {
            return { ...color, showList: !color.showList };
          }
          
          return color;
        });
        
        return {
          colors: newColors
        };
      });
    }
  };
  
  handleCreateColor = (color: string): void => {
    const newId: number = new Date().getTime();
    const newColorObj: IColorObj = { id: newId, color: color, showList: false };
    
    this.setState(({ colors }) => ({
      colors: [ ...colors, newColorObj ]
    }));
  };
  
  _marksList = (colors: IColorObj[]): JSX.Element[] => {
    return colors.map(({ id, color, showList }) => <Mark
      key={ id }
      color={ color }
      mark={ showList }
    />);
  };
  
  _itemsList = (colors: IColorObj[]) => {
    return colors.reduce((arr: JSX.Element[], { id, color, showList }: IColorObj): JSX.Element[] => {
      if (showList) {
        return [ ...arr, <ListItem key={ id } color={ color }/> ];
      }
      
      return arr;
    }, []);
  };
  
  render() {
    const { colors } = this.state;
    
    return(
      <React.Fragment>
        <div className="row">
          <From onCreateColor={ this.handleCreateColor } colors={ colors } />
          
          <div className="marks" onClick={ this.handleClick }>
            { this._marksList(colors) }
          </div>
        </div>

        <div className="list-group">
          { this._itemsList(colors) }
        </div>
        
        <hr/>
        
        <div className="row">
          <Tooltip
            text="Master Express.js-The Node.js Framework For Your Web Development"
            allowToggleWithClick={false}
            allowToggleWithMouseInteraction={true}
            positionWhereShowText="top"
          >
            Pro Express.js
          </Tooltip>
          was published in 2014. It was one of the first books on v4.x. And it was my second book published with Apress after
          <Tooltip text="Practical Node.js: Building Real-World Scalable Web Apps">Practical Node.js</Tooltip>.
          ...
          The main focus of this post is to compare the four Node.js/Io.js frameworks:
          <Tooltip text="HTTP API server">Hapi</Tooltip>,
          <Tooltip text="Release the Kraken!">Kraken</Tooltip>,
          <Tooltip text="Sail away">Sails.js</Tooltip> and
          <Tooltip text="IBM of frameworks">Loopback</Tooltip>.
          There are many other frameworks to consider, but I had to draw the line somewhere.
        </div>
        
        <hr/>
  
        <TableEdit employers={ TABLE_EMPLOYERS } fields={ TABLE_FIELDS }/>
        
        <hr/>
  
        <Workers/>
      </React.Fragment>
    );
  }
}
