import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './styles.css';
import { HeartIcon, CrossIcon } from './Icons';

const SwipeCards = ({ activities, onPreferencesUpdated, onRejectedUpdated, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rejectedActivities, setRejectedActivities] = useState([]);

  const handleSwipe = (direction, activity) => {
    if (currentIndex === activities.length - 1) return;

    if (direction === 'right') {
      onPreferencesUpdated(activity);
    } else if (direction === 'left') {
      setRejectedActivities((prev) => [...prev, activity]);
    }

    goToNextActivity();
  };

  const goToNextActivity = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onRejectedUpdated(rejectedActivities);
      onComplete();
    }
  };

  const manualSwipe = (direction) => {
    if (currentIndex === activities.length - 1) return;

    if (direction === 'right') {
      onPreferencesUpdated(activities[currentIndex]);
    } else if (direction === 'left') {
      setRejectedActivities((prev) => [...prev, activities[currentIndex]]);
    }
    goToNextActivity();
  };

  return (
    <div className="swipe-container">
      {currentIndex < activities.length ? (
        <>
          <div className="card-wrapper">
            <TinderCard
              key={activities[currentIndex]}
              onSwipe={(dir) => handleSwipe(dir, activities[currentIndex])}
              preventSwipe={currentIndex === activities.length - 1 ? ['up', 'down', 'left', 'right'] : ['up', 'down']}
              className="swipe-card"
            >
              <div className="card">
                {currentIndex === activities.length - 1 ? (
                  <div>
                    <h3>Liste de préférences remplie !</h3>
                    <p>Appuyez sur le bouton "Recherche" pour continuer.</p>
                  </div>
                ) : (
                  <h2>{activities[currentIndex]}</h2>
                )}
              </div>
            </TinderCard>
          </div>
          {currentIndex !== activities.length - 1 && (
            <div className="buttons">
              <button
                className="no-button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  manualSwipe('left');
                }}
              >
                <CrossIcon />
              </button>
              <button
                className="yes-button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  manualSwipe('right');
                }}
              >
                <HeartIcon />
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SwipeCards;
