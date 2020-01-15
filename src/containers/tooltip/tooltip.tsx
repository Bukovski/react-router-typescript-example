import React, { useRef, useState } from "react";


interface ITooltipProps {
  children: React.ReactNode,
  text: string,
  allowToggleWithClick: boolean,
  allowToggleWithMouseInteraction: boolean,
  positionWhereShowText: string
}

interface ITooltipState {
  opacity: boolean,
  top: number,
  left?: number,
  zIndex?: number
}

interface IStyle {
  [ key: string ]: number
}


function Tooltip(props: ITooltipProps) {
  const { children, text, positionWhereShowText,
    allowToggleWithClick, allowToggleWithMouseInteraction } = props;

  const _spanRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  const [ styleProp, setStyleProp ] = useState<ITooltipState>({
    opacity: false,
    top: 0
  });
  const { zIndex, opacity, top, left } = styleProp;


  const handleClick = (): false | void => {
    if (!allowToggleWithClick) {
      return false
    }

    toggle()
  };

  const handleMouseInteraction = (): false | void => {
    if (!allowToggleWithMouseInteraction) {
      return false
    }

    toggle()
  };

  const toggle = (): void => {
    const tooltipNode = _spanRef.current as HTMLInputElement;

    setStyleProp({
      zIndex,
      opacity: !opacity,
      top: tooltipNode.offsetTop,
      left: tooltipNode.offsetLeft,
    })
  };


  const style: IStyle = {
    zIndex: (opacity) ? 1000 : -1000,
    opacity: +opacity,
    top: top + (positionWhereShowText === 'bottom' ? +20 : -60),
    left: (left || 0) - 30
  };

  const toolTipClasses: string = 'tooltip ' + positionWhereShowText;

  return (
    <div style={{ display: 'inline' }}>
        <span
          style={{ color: 'blue', cursor: "pointer" }}
          ref={ _spanRef }
          onClick={ handleClick }
          onMouseEnter={ handleMouseInteraction }
          onMouseOut={ handleMouseInteraction }
        >
          { children }
        </span>
      <div
        className={ toolTipClasses }
        style={ style }
        role="tooltip"
      >
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">
          { text }
        </div>
      </div>
    </div>
  )
}


const defaultProps: Partial<ITooltipProps> = {
  allowToggleWithClick: false,
  allowToggleWithMouseInteraction: true,
  positionWhereShowText: 'bottom',
};

Tooltip.defaultProps = defaultProps;


export default Tooltip;
