import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Pokemon, PokemonListResponse, Result } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';

export default function Index() {
  // List Pokemon: https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  // Get Pokemon details: https://pokeapi.co/api/v2/pokemon/{id or name}
  // Get Pokemon species: https://pokeapi.co/api/v2/pokemon-species/{id}
  const [pokemons, setPokemons] = useState<Result[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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
        console.error('Error fetching Pokemons:', error);
      }
    };
    fetchPokemons();
  }, []);

  async function fetchPokemon(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
      }
      const data: Pokemon = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={({ item }) => (
          <Link href={`/pokemon/${item.name}`}>
            <PokemonCard name={item.name} url={item.url} />
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
