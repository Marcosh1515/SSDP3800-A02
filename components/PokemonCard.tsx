import { Pokemon } from '@/types/pokemon';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface PokemonCardProps {
  url: string;
}

function PokemonCard({ url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, [url]);

  return (
    <View style={styles.pokemonCard}>
      {pokemon && (
        <Image
          style={styles.pokemonImage}
          resizeMode="cover"
          source={{ uri: pokemon?.sprites.versions?.['generation-i']['red-blue'].front_default || 'https://via.placeholder.com/48' }}
        />
      )}
      <View style={styles.pokemonData}>
        <Text>#{String(pokemon?.id).padStart(3, '0')}</Text>
        <Text>{pokemon?.name[0].toUpperCase().concat(pokemon?.name.substring(1))}</Text>
        <View style={styles.typeTagList}>
          {pokemon?.types.map((type, index) => (
            <View key={index} style={styles.typeTag}>
              <Text>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: '100%',
    boxShadow: '2px 2px',
    backgroundColor: 'white',
  },
  pokemonImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  pokemonData: {
    flexDirection: 'column',
    gap: 4,
  },
  typeTagList: {
    flexDirection: 'row',
    gap: 5,
  },
  typeTag: {
    backgroundColor: '#53b992',
    paddingHorizontal: 5,
    paddingBottom: 2,
    borderRadius: 10,
  },
});

export default PokemonCard;
