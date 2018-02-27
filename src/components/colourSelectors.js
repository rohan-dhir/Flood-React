import React from 'react';
import Selector from './selector';
import '../style/content.css';

const ColourSelectors = ({ colors, clickHandler, incrementCount }) => {
  let selectors = colors.map(function (color, index) {
    return <Selector color={color} key={"selector_" + color} colorIndex={index} clickHandler={clickHandler} incrementCount={incrementCount} />
  });

  return (
    <div className="selectors">{selectors}</div>
  );
}

export default ColourSelectors;
