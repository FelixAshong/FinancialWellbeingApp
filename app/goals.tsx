import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'; // Progress bar for goals

export default function GoalScreen() {
  // Sample goals data
  const [goals, setGoals] = useState([
    { id: 1, title: 'Save $5000', progress: 0.6 },
    { id: 2, title: 'Pay off credit card', progress: 0.4 },
    { id: 3, title: 'Invest $2000 in stocks', progress: 0.75 },
  ]);
  const [modalVisible, setModalVisible] = useState(false); // For managing modal visibility
  const [newGoalTitle, setNewGoalTitle] = useState(''); // For new goal title input
  const [newGoalProgress, setNewGoalProgress] = useState(''); // For new goal progress input

  // Function to handle adding a new goal
  const addGoal = () => {
    if (newGoalTitle.trim() && !isNaN(Number(newGoalProgress))) {
      const newGoal = {
        id: goals.length + 1,
        title: newGoalTitle,
        progress: parseFloat(newGoalProgress) / 100,
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle(''); // Clear the input field
      setNewGoalProgress(''); // Clear the progress input field
      setModalVisible(false); // Close the modal
    } else {
      alert('Please enter valid data!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Goals</Text>

      {/* Goal List */}
      {goals.map((goal) => (
        <View key={goal.id} style={styles.goalCard}>
          <Text style={styles.goalText}>{goal.title}</Text>
          <ProgressBar progress={goal.progress} color="#4CAF50" style={styles.progressBar} />
          <Text style={styles.progressText}>{Math.round(goal.progress * 100)}% Complete</Text>
        </View>
      ))}

      {/* Add New Goal Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={28} color="white" />
        <Text style={styles.addButtonText}>Add New Goal</Text>
      </TouchableOpacity>

      {/* Modal for adding a new goal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Goal</Text>
            
            {/* Goal Title Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter goal title"
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
            />

            {/* Goal Progress Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter goal progress (%)"
              value={newGoalProgress}
              onChangeText={setNewGoalProgress}
              keyboardType="numeric"
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add Goal" onPress={addGoal} />
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

