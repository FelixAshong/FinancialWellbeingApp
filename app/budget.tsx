import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

export default function BudgetScreen() {
  // Sample budget data
  const [budget, setBudget] = useState({
    total: 5000,
    expenses: 3200,
  });
  const remaining = budget.total - budget.expenses;

  // Categories data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Rent', amount: 1200, icon: 'home' },
    { id: 2, name: 'Groceries', amount: 500, icon: 'cart' },
    { id: 3, name: 'Transportation', amount: 300, icon: 'bus' },
    { id: 4, name: 'Entertainment', amount: 250, icon: 'film' },
  ]);

  const categoryData = categories.map((category) => ({
    name: category.name,
    population: category.amount,
    color: '#4CAF50', // Can customize by category
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  // Modal state for adding expense
  const [modalVisible, setModalVisible] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: 0,
    category: '',
  });

  // Modal state for adding budget
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [newBudget, setNewBudget] = useState({
    total: '',
  });

  // Handle new expense
  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount > 0) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newExpense.name,
          amount: newExpense.amount,
          icon: 'wallet', // Default icon for custom expenses
        }
      ]);
      setModalVisible(false);
      setNewExpense({ name: '', amount: 0, category: '' });
    }
  };

  // Handle updating the budget
  const handleUpdateBudget = () => {
    if (newBudget.total > 0) {
      setBudget({ ...budget, total: newBudget.total });
      setBudgetModalVisible(false);
      setNewBudget({ total: '' });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Budget Overview</Text>

      {/* Budget Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Total Budget: ${budget.total}</Text>
        </View>
        <Text style={styles.cardText}>Expenses: ${budget.expenses}</Text>
        <Text style={[styles.cardText, { color: remaining > 0 ? '#4CAF50' : '#D32F2F' }]}>
          Remaining: ${remaining}
        </Text>
      </View>

      {/* Expense Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Expenses Breakdown</Text>
        <PieChart
          data={categoryData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      {/* Expenses List */}
      <Text style={styles.sectionTitle}>Recent Expenses</Text>
      {categories.map((expense) => (
        <View key={expense.id} style={styles.expenseItem}>
          <Ionicons name={expense.icon} size={24} color="#555" />
          <Text style={styles.expenseText}>{expense.name}</Text>
          <Text style={styles.expenseAmount}>-${expense.amount}</Text>
        </View>
      ))}

      {/* Add Expense Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>

      {/* Add Budget Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setBudgetModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Update Budget</Text>
      </TouchableOpacity>

      {/* Modal for Adding New Expense */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Expense Name"
              value={newExpense.name}
              onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={String(newExpense.amount)}
              onChangeText={(text) => setNewExpense({ ...newExpense, amount: parseFloat(text) })}
            />
            <Button title="Add" onPress={handleAddExpense} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Updating Budget */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={budgetModalVisible}
        onRequestClose={() => setBudgetModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="New Total Budget"
              keyboardType="numeric"
              value={String(newBudget.total)}
              onChangeText={(text) => setNewBudget({ ...newBudget, total: parseFloat(text) })}
            />
            <Button title="Update" onPress={handleUpdateBudget} />
            <Button title="Cancel" onPress={() => setBudgetModalVisible(false)} />
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
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  expenseItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  expenseText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

