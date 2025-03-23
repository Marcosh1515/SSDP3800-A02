import { Link, usePathname } from 'expo-router';
import React, { StrictMode, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Pokemon, PokemonListResponse, Result } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';

export default function Index() {
  // List Pokemon: https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  // Get Pokemon details: https://pokeapi.co/api/v2/pokemon/{id or name}
  // Get Pokemon species: https://pokeapi.co/api/v2/pokemon-species/{id}
  const [pokemons, setPokemons] = useState<Result[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data: PokemonListResponse = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Error fetching Pokémons:', error);
      }
    };
    fetchPokemons();
  }, []);

  const getPokemonId = (url: string) => {
    const segments = url.split('/');
    return segments[segments.length - 2];
  };

  return (
    <StrictMode>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          data={pokemons}
          scrollEnabled
          keyExtractor={(pokemon) => pokemon.name}
          renderItem={({ item }) => {
            const pokemonId = getPokemonId(item.url);
            return (
              <Link
                href={{
                  pathname: '/pokemon/[id]',
                  params: { id: pokemonId },
                }}
                asChild
              >
                <TouchableOpacity style={styles.pokemonListItem}>
                  <PokemonCard url={item.url} />
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      </SafeAreaView>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  pokemonListItem: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
