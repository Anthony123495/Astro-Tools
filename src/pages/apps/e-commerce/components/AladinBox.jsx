import React from 'react';
import A from 'aladin-lite';

const AladinBox = ({ box, color, isSelected, onSelect }) => {
  return (
    <div 
      className={`aladin-box ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(box.id);
      }}
    >
      <div className="box-label">
        {`FOV Box ${box.id}`}
      </div>
    </div>
  );
};

export default AladinBox;