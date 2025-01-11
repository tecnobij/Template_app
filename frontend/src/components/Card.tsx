import React from 'react';

interface CardProps {
  imageUrl: string;
  tag: string | string[];
}

const Card: React.FC<CardProps> = ({ imageUrl, tag }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={typeof tag === 'string' ? tag : tag.join(', ')} />
      <p>{typeof tag === 'string' ? tag : tag.join(', ')}</p>
    </div>
  );
};

export default Card;
