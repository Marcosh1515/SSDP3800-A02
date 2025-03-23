import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StatsTab() {
  const { pokemon: pokemonParam } = useLocalSearchParams();
  const pokemon = pokemonParam ? JSON.parse(pokemonParam) : null;

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text>Pokemon data not available</Text>
      </View>
    );
  }

  // Calculate total stat value
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            <Text style={styles.totalStats}>Total: {totalStats}</Text>
          </View>
          {pokemon.stats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statName}>{formatStatName(stat.stat.name)}</Text>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
              <View style={styles.statBarContainer}>
                <View
                  style={[
                    styles.statBar,
                    {
                      width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                      backgroundColor: getStatColor(stat.base_stat),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Moves</Text>
          <View style={styles.movesContainer}>
            {pokemon.moves.slice(0, 15).map((moveData, index) => (
              <View key={index} style={styles.moveBadge}>
                <Text style={styles.moveText}>{formatMoveName(moveData.move.name)}</Text>
              </View>
            ))}
          </View>
          {pokemon.moves.length > 15 && <Text style={styles.moreMovesText}>+{pokemon.moves.length - 15} more moves</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

// Helper function to format stat names
function formatStatName(statName) {
  const statNameMap = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return statNameMap[statName] || statName;
}

// Helper function to format move names
function formatMoveName(moveName) {
  return moveName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get color based on stat value
function getStatColor(value) {
  if (value < 50) return '#ff7675';
  if (value < 80) return '#fdcb6e';
  if (value < 120) return '#74b9ff';
  return '#00b894';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalStats: {
    fontSize: 16,
    fontWeight: '600',
    color: '#53b992',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 80,
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    width: 40,
    fontSize: 14,
    textAlign: 'right',
    marginRight: 10,
    fontWeight: '600',
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
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  moveBadge: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  moveText: {
    fontSize: 12,
    color: '#0277bd',
  },
  moreMovesText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
