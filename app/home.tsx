import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Animated value for the sliding cards
  const translateX = new Animated.Value(500); // Start with the card off-screen

  // Animate the sliding of the cards on mount
  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to Financial Wellbeing App</Text>

      {/* Introduction Section */}
      <View style={styles.introduction}>
        <Text style={styles.introText}>
          Manage your finances effectively with our comprehensive tools! Track your budget, set financial
          goals, and invest wisely to build a secure future.
        </Text>
      </View>

      {/* Sliding Cards */}
      <View style={styles.cardsContainer}>
        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
        >
          <TouchableOpacity style={styles.cardContent}>
            <Ionicons name="flag" size={30} color="#FF6347" /> {/* New Icon */}
            <Text style={styles.cardTitle}>Start Your Goals</Text>
            <Text style={styles.cardDescription}>Set and track your financial goals.</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
        >
          <TouchableOpacity style={styles.cardContent}>
            <Ionicons name="wallet" size={30} color="#4CAF50" /> {/* New Icon */}
            <Text style={styles.cardTitle}>Track Your Budget</Text>
            <Text style={styles.cardDescription}>Manage your expenses and savings.</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.card, { transform: [{ translateX }] }]}
        >
          <TouchableOpacity style={styles.cardContent}>
            <Ionicons name="cash" size={30} color="#FF9800" /> {/* New Icon */}
            <Text style={styles.cardTitle}>Invest for the Future</Text>
            <Text style={styles.cardDescription}>Grow your wealth with smart investments.</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Investments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  introduction: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  introText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  cardsContainer: {
    marginBottom: 30,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3, // For Android shadow effect
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
