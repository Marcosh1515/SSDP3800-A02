import { Link } from 'expo-router';
import React, { StrictMode, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { PokemonListResponse, Result } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';

export default function Index() {
  const [pokemons, setPokemons] = useState<Result[]>([]);
  const [next, setNext] = useState<string>('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async (url = '') => {
    try {
      const response = await fetch(url || 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
      }
      const data: PokemonListResponse = await response.json();
      setPokemons(data.results);
      setNext(data.next);
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
    }
  };

  const handleLoadMore = async () => {
    try {
      if (pokemons && next) {
        const response = await fetch(next);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const newData: PokemonListResponse = await response.json();
        setPokemons([...pokemons, ...newData.results]);
        setNext(newData.next);
      }
    } catch (error) {
      console.error('Error fetching Pokémons:', error);
    }
  };

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
          onEndReached={() => handleLoadMore()}
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
