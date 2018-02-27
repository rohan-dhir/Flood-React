import React from 'react';
import '../style/content.css';

const Selector = ({color, colorIndex, clickHandler, incrementCount }) => {
  let className = color + " selector";

  return (
    <div className={className}
    onClick={(e) => {
      incrementCount();
      clickHandler(colorIndex);
    }}>
    </div>
  );
}

export default Selector;
