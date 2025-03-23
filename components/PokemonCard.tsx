import React from 'react';

interface PokemonCardProps {
  name: string;
  url: string;
}

function PokemonCard({ name, url }: PokemonCardProps) {
  return (
    <div>
      <div>ID: {name}</div>
      <div>URL: {url}</div>
    </div>
  );
}

export default PokemonCard;
