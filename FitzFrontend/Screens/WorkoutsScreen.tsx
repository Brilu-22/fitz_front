import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colours';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

const WorkoutsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Workouts</Text>

        {/* Current Workout/Plan Card (referencing moodboard) */}
        <Card>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Current Plan</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color={Colors.accent} />
            </TouchableOpacity>
          </View>
          <Text style={styles.workoutName}>Full Body Strength</Text>
          <Text style={styles.secondaryText}>3 days/week | Moderate Intensity</Text>
          <View style={styles.lineBreak} />
          <View style={styles.workoutStatsRow}>
            <View style={styles.workoutStatItem}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.smallText}>completed</Text>
            </View>
            <View style={styles.workoutStatItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.smallText}>remaining</Text>
            </View>
            <View style={styles.workoutStatItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.smallText}>weeks left</Text>
            </View>
          </View>
        </Card>

        {/* Workout History/Calendar Card */}
        <Card>
          <Text style={styles.cardTitle}>History</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Mon, Oct 23</Text>
            <Text style={styles.historyDetails}>Upper Body - 45 min</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Sat, Oct 21</Text>
            <Text style={styles.historyDetails}>Cardio & Abs - 30 min</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all workouts</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.accent} />
          </TouchableOpacity>
        </Card>

        {/* Generate New Plan Button */}
        <TouchableOpacity style={styles.generatePlanButton}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.primaryText} />
          <Text style={styles.generatePlanButtonText}>Generate New Plan</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryText,
    margin: 16,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
  },
  editButton: {
    padding: 4,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
    marginTop: 4,
  },
  secondaryText: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 8,
  },
  lineBreak: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  workoutStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  workoutStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  smallText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyDate: {
    fontSize: 16,
    color: Colors.primaryText,
    fontWeight: '500',
  },
  historyDetails: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  seeAllButtonText: {
    color: Colors.accent,
    marginRight: 4,
    fontSize: 16,
  },
  generatePlanButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatePlanButtonText: {
    color: Colors.primaryText,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WorkoutsScreen;