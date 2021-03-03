import React from 'react';
import './Reviewer.css';

const ReviewerComponent = (prop) => {
  const { name, avatar } = prop;

  return (
    <div>
      <img
        src={avatar || ''}
        className="Reviewer-avatar"
        alt="Reviewer avatar"
      />
      <p className="Reviewer-name">{name || 'Загрузка...'}</p>
    </div>
  );
};

export default React.memo(ReviewerComponent);
