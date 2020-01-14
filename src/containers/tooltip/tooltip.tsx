import React from "react";
import ReactDOM from 'react-dom';


interface ITooltipProps {
  text: string,
  allowToggleWithClick: boolean,
  allowToggleWithMouseInteraction: boolean,
  positionWhereShowText: string
}

interface ITooltipState {
  opacity: boolean,
  top?: number,
  left?: number
}

class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  constructor(props: ITooltipProps) {
    super(props);
    
    this.state = {
      opacity: false
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseInteraction = this.handleMouseInteraction.bind(this);
  }
    
  static defaultProps = {
    allowToggleWithClick: false,
    allowToggleWithMouseInteraction: true,
    positionWhereShowText: 'bottom',
  };
  
  
  
  handleClick(): false | void {
    if (!this.props.allowToggleWithClick) {
      return false
    }
    
    this.toggle()
  }
  
  handleMouseInteraction(): false | void {
    if (!this.props.allowToggleWithMouseInteraction) {
      return false
    }
    
    this.toggle()
  }
  
  toggle(): void {
    const tooltipNode = ReactDOM.findDOMNode(this) as HTMLInputElement;
    
    this.setState({
      opacity: !this.state.opacity,
      top: tooltipNode.offsetTop,
      left: tooltipNode.offsetLeft,
    })
  }
  
  render() {
    interface IStyle {
      [ key: string ]: number
    }

    const top: number = this.state.top || 0;
    const style: IStyle = {
      zIndex: (this.state.opacity) ? 1000 : -1000,
      opacity: +this.state.opacity,
      top: top + (this.props.positionWhereShowText === 'bottom' ? +20 : -60),
      left: (this.state.left || 0) - 30
    };
    
    const toolTipClasses: string = 'tooltip ' + this.props.positionWhereShowText;
    
    return (
      <div style={{display: 'inline'}}>
        <span
          style={{color: 'blue', cursor: "pointer"}}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseInteraction}
          onMouseOut={this.handleMouseInteraction}
        >
          {this.props.children}
        </span>
        <div className={toolTipClasses} style={style} role="tooltip">
          <div className="tooltip-arrow"></div>
          <div className="tooltip-inner">
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}


export default Tooltip;
