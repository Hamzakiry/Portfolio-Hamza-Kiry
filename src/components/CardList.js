import React, { useState } from 'react';

const SkeletonLoader = () => (
  <div className='animate-pulse' aria-hidden="true" style={{ position: 'absolute', top: 0, backgroundColor: '#252c26', height: '210px', width: '100%' }}>
    
  </div>
);

const CardItem = ({ card, onCardClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card-item" role="button" tabIndex={0} aria-label={`View ${card.name}'s portfolio`} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onCardClick(card); } }} onClick={() => onCardClick(card)}>
      {!imageLoaded && <SkeletonLoader />}
      <img
        className="card-type-icon"
        src={card.image}
        alt={`${card.name}'s portfolio`}
        loading="lazy"
        decoding="async"
        onError={() => setImageLoaded(true)}
        onLoad={() => setImageLoaded(true)}
        style={{ display: 'block', height: '210px', objectFit: 'cover' }}
      />
      <div className="card-name">{card.name}</div>
    </div>
  );
};

const CardList = ({ cards, onCardClick }) => (
  <div className="card-list">
    {cards.map((card) => (
      <CardItem key={card.id} card={card} onCardClick={onCardClick} />
    ))}
  </div>
);

export default CardList;
