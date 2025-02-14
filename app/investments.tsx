import { View, Text, StyleSheet, ScrollView, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { PieChart } from 'react-native-chart-kit';

export default function InvestmentScreen() {
  // Sample investment data
  const initialInvestments = [
    { id: 1, name: 'Stocks', value: 12000, return: 15 },
    { id: 2, name: 'Real Estate', value: 25000, return: 10 },
    { id: 3, name: 'Mutual Funds', value: 8000, return: 7 },
  ];

  const [investments, setInvestments] = useState(initialInvestments);
  
  const totalPortfolioValue = investments.reduce((total, investment) => total + investment.value, 0);
  
  // Pie chart data
  const portfolioData = investments.map((investment) => ({
    name: investment.name,
    population: investment.value,
    color: '#FF6347', // Customize each category color
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  // Modal state for adding investment
  const [modalVisible, setModalVisible] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    value: 0,
    return: 0,
  });

  // Handle adding new investment
  const handleAddInvestment = () => {
    const value = parseFloat(newInvestment.value);
    const returnPercentage = parseFloat(newInvestment.return);

    if (newInvestment.name && !isNaN(value) && value > 0 && !isNaN(returnPercentage) && returnPercentage >= 0) {
      const newInvestmentObject = {
        id: investments.length + 1,  // Unique ID for each investment
        name: newInvestment.name,
        value: value,
        return: returnPercentage,
      };

      setInvestments(prevInvestments => [...prevInvestments, newInvestmentObject]);
      setModalVisible(false); // Close the modal after adding
      setNewInvestment({ name: '', value: 0, return: 0 }); // Clear input fields
    } else {
      // Optionally, add error handling if inputs are invalid
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Investment Portfolio</Text>

      {/* Total Portfolio Value */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet" size={24} color="#FF6347" />
          <Text style={styles.cardTitle}>Total Portfolio Value: ${totalPortfolioValue}</Text>
        </View>
      </View>

      {/* Investment Portfolio Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Portfolio Breakdown</Text>
        <PieChart
          data={portfolioData}
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

      {/* Investment List */}
      <Text style={styles.sectionTitle}>Investments</Text>
      {investments.map((investment) => (
        <View key={investment.id} style={styles.investmentItem}>
          <Ionicons name="cash" size={24} color="#555" />
          <Text style={styles.investmentText}>{investment.name}</Text>
          <Text style={styles.investmentValue}>${investment.value}</Text>
          <Text style={styles.investmentReturn}>{investment.return}% Return</Text>
        </View>
      ))}

      {/* Add Investment Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Investment</Text>
      </TouchableOpacity>

      {/* Modal for Adding New Investment */}
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
              placeholder="Investment Name"
              value={newInvestment.name}
              onChangeText={(text) => setNewInvestment({ ...newInvestment, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Investment Value"
              keyboardType="numeric"
              value={String(newInvestment.value || '')}  // Fallback to empty string if value is 0 or invalid
              onChangeText={(text) => setNewInvestment({ ...newInvestment, value: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Return Percentage"
              keyboardType="numeric"
              value={String(newInvestment.return || '')}  // Fallback to empty string if value is 0 or invalid
              onChangeText={(text) => setNewInvestment({ ...newInvestment, return: text })}
            />
            <Button title="Add" onPress={handleAddInvestment} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  investmentItem: {
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
  investmentText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 8,
  },
  investmentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  investmentReturn: {
    fontSize: 16,
    color: '#4CAF50',
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
    backgroundColor: '#FF6347',
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
