import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function AboutTab() {
  const { pokemon: pokemonParam } = useLocalSearchParams();
  const pokemon = pokemonParam ? JSON.parse(pokemonParam) : null;

  useEffect(() => {
    console.log(pokemon);
  }, []);

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text>Pokemon data not available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pokémon Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
          </View>
          {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Abilities:</Text>
            <Text style={styles.infoValue}>
              {pokemon.abilities.map((a) => a.ability.name[0].toUpperCase() + a.ability.name.substring(1)).join(', ')}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Base Experience</Text>
          <Text style={styles.baseExp}>{pokemon.base_experience || 0} XP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Game Indices</Text>
          <View style={styles.gameIndicesContainer}>
            {pokemon.game_indices.slice(0, 8).map((gameIndex, index) => (
              <View key={index} style={styles.gameIndexBadge}>
                <Text style={styles.gameIndexText}>{gameIndex.version.name.replace('-', ' ').toUpperCase()}</Text>
              </View>
            ))}
          </View>
          {pokemon.game_indices.length > 8 && (
            <Text style={styles.moreItemsText}>+{pokemon.game_indices.length - 8} more games</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Held Items</Text>
          {pokemon.held_items.length > 0 ? (
            <View style={styles.itemsContainer}>
              {pokemon.held_items.map((item, index) => (
                <View key={index} style={styles.itemBadge}>
                  <Text style={styles.itemText}>{item.item.name.replace('-', ' ')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noItemsText}>No held items</Text>
          )}*/}
        </View>
      </View>
    </ScrollView>
  );
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  baseExp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#53b992',
  },
  gameIndicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gameIndexBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  gameIndexText: {
    fontSize: 12,
    color: '#555',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  itemBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  itemText: {
    fontSize: 12,
    color: '#2e7d32',
    textTransform: 'capitalize',
  },
  noItemsText: {
    color: '#888',
    fontStyle: 'italic',
  },
  moreItemsText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
