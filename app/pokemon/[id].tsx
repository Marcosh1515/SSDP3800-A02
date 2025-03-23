import { Pokemon, PokemonSpecies } from '@/types/pokemon';
import { Tabs, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data: Pokemon = await response.json();
        setPokemon(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError('Failed to load Pokémon details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon species');
        }
        const data: PokemonSpecies = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error('Error fetching Pokémon species:', error);
        setError('Failed to load Pokémon species. Please try again.');
      }
    };

    if (id) {
      fetchSpecies();
    }
  }, [pokemon]);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#53b992" />
        <Text>Loading Pokémon details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!pokemon) {
    <SafeAreaView>
      <Text>Pokémon not found...</Text>
    </SafeAreaView>;
  }

  const primaryColor = species?.color.name;

  return (
    <View>
      <View>
        <Text>{pokemon?.name}</Text>
        <Text>#{String(pokemon?.id).padStart(3, '0')}</Text>
        {pokemon && (
          <Image
            style={styles.pokemonImage}
            resizeMode="cover"
            source={{ uri: pokemon?.sprites.versions?.['generation-i']['red-blue'].front_default || pokemon?.sprites.front_default }}
          />
        )}
      </View>
      <Text>asdasd</Text>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="(tabs)/about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <View style={[styles.tabIcon, { backgroundColor: color }]} />,
          }}
          initialParams={{ pokemon: JSON.stringify(pokemon) }}
        />
        <Tabs.Screen
          name="(tabs)/stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <View style={{ backgroundColor: color }} />,
          }}
          initialParams={{ pokemon: JSON.stringify(pokemon) }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  header: {
    paddingTop: 60, // Adjust for status bar
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  id: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  // pokemonImage: {
  //   width: 140,
  //   height: 140,
  // },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: 'white',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabIcon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
});

export default PokemonDetail;
