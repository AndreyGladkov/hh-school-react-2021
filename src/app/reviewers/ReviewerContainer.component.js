import React from 'react';
import ReviewerComponent from './Reviewer.component';

const ReviewerContainer = (prop) => {
  const { user, reviewer, repo } = prop;

  return (
    <div className="Reviewer-row">
      <div className="Reviewer-profile">
        User:
        <ReviewerComponent
          name={user && (user.name || user.login)}
          avatar={user && user.avatar_url}
        />
      </div>
      {repo && (
        <div className="Reviewer-profile">
          Reviewer for {repo}:
          <ReviewerComponent
            name={reviewer && (reviewer.name || reviewer.login)}
            avatar={reviewer && reviewer.avatar_url}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewerContainer;
