import { Pokemon, PokemonSpecies } from '@/types/pokemon';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'stats'>('about');

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
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53b992" />
        <Text style={styles.loadingText}>Loading Pokémon details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!pokemon) {
    <SafeAreaView style={styles.errorContainer}>
      <Text style={styles.errorText}>Pokémon not found...</Text>
    </SafeAreaView>;
  }

  function formatStatName(statName: string): string {
    const statNameMap: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed',
    };

    return statNameMap[statName] || statName;
  }

  function getStatColor(value: number): string {
    if (value < 50) return '#ff7675';
    if (value < 100) return '#fdcb6e';
    return '#00b894';
  }

  const renderAboutTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Pokémon Info</Text>
        <Text style={styles.bioText}>{species && species.flavor_text_entries[0].flavor_text.replaceAll('\n', ' ').replaceAll('\f', ' ')}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height:</Text>
          <Text style={styles.infoValue}>{pokemon && (pokemon.height / 10).toFixed(1)} m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weight:</Text>
          <Text style={styles.infoValue}>{pokemon && (pokemon.weight / 10).toFixed(1)} kg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Abilities:</Text>
          <Text style={styles.infoValue}>{pokemon && pokemon.abilities.map((a) => a.ability.name[0].toUpperCase() + a.ability.name.substring(1)).join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Types:</Text>
          <Text style={styles.infoValue}>{pokemon && pokemon.types.map((t) => t.type.name[0].toUpperCase() + t.type.name.substring(1)).join(', ')}</Text>
        </View>
      </View>
    </View>
  );

  const renderStatsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {pokemon &&
          pokemon.stats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{formatStatName(stat.stat.name)}</Text>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
              <View style={styles.statBarContainer}>
                <View style={[styles.statBar, { width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }, { backgroundColor: getStatColor(stat.base_stat) }]} />
              </View>
            </View>
          ))}
      </View>
    </View>
  );

  const primaryColor = species?.color.name;

  if (pokemon) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: primaryColor }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</Text>
            <Text style={styles.id}>#{String(pokemon.id).padStart(5, '0')}</Text>
            {pokemon && (
              <Image
                style={styles.pokemonImage}
                resizeMode="cover"
                source={{ uri: pokemon?.sprites.versions?.['generation-i']['red-blue'].front_default || pokemon?.sprites.front_default }}
              />
            )}
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'about' && styles.activeTab]} onPress={() => setActiveTab('about')}>
              <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'stats' && styles.activeTab]} onPress={() => setActiveTab('stats')}>
              <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>Stats</Text>
            </TouchableOpacity>
          </View>
          {pokemon && activeTab === 'about' ? renderAboutTab() : renderStatsTab()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pokemonImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
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
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666',
  },
  // tabs
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'lightgray',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'black',
  },
  tabContent: {
    marginTop: 10,
  },
  // about
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
  },
  // stats
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bioText: {
    marginBottom: 10,
  },
  statName: {
    width: 80,
    fontSize: 14,
  },
  statValue: {
    width: 40,
    fontSize: 14,
    textAlign: 'right',
    marginRight: 10,
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
  },
});

export default PokemonDetail;
