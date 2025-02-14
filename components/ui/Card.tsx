import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type CardProps = {
  title: string;
  description: string;
  onPress?: () => void;
  backgroundColor?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, onPress, backgroundColor = '#fff', children }) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor }]} onPress={onPress}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});

export default Card;
