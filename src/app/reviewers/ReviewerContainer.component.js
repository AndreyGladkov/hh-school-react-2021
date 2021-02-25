import React from 'react';
import ReviewerComponent from './Reviewer.component';

const ReviewerContainer = (prop) => {
  const { user, reviewer } = prop;

  return (
    <div className="Reviewer-row">
      <div className="Reviewer-profile">
        User:
        <ReviewerComponent
          name={user && (user.name || user.login)}
          avatar={user && user.avatar_url}
        />
      </div>
      <div className="Reviewer-profile">
        Reviewer:
        <ReviewerComponent
          name={reviewer && (reviewer.name || reviewer.login)}
          avatar={reviewer && reviewer.avatar_url}
        />
      </div>
    </div>
  );
};

export default ReviewerContainer;
