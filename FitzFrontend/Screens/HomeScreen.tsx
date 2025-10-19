import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colours';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons'; // For icons

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Today</Text>

        {/* Sleep Score Card (referencing moodboard) */}
        <Card>
          <View style={styles.cardHeader}>
            <Ionicons name="moon" size={24} color={Colors.primaryText} />
            <Text style={styles.cardTitle}>Sleep Score</Text>
          </View>
          <Text style={styles.bigNumber}>54</Text>
          <Text style={styles.secondaryText}>Sleep hours</Text>
          <View style={styles.lineBreak} />
          <Text style={styles.primaryText}>You Are Getting Enough Rest</Text>
          <Text style={styles.smallText}>
            Overall health, consider adding some light exercise.
          </Text>
        </Card>

        {/* Activity Summary Card (referencing moodboard) */}
        <Card>
          <View style={styles.cardHeader}>
            <Ionicons name="walk" size={24} color={Colors.primaryText} />
            <Text style={styles.cardTitle}>Activity Summary</Text>
          </View>
          <View style={styles.activityRow}>
            <View style={styles.activityItem}>
              <Text style={styles.activityNumber}>4.18</Text>
              <Text style={styles.smallText}>km</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityNumber}>54</Text>
              <Text style={styles.smallText}>min</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityNumber}>1200</Text>
              <Text style={styles.smallText}>kcal</Text>
            </View>
          </View>
        </Card>

        {/* Example of a Weight Card (referencing moodboard) */}
        <Card>
          <View style={styles.cardHeader}>
            <Ionicons name="scale-outline" size={24} color={Colors.primaryText} />
            <Text style={styles.cardTitle}>Weight Progress</Text>
          </View>
          <Text style={styles.bigNumber}>190</Text>
          <Text style={styles.secondaryText}>lbs</Text>
          <View style={styles.lineBreak} />
          <Text style={styles.smallText}>Target: 180 lbs in 8 weeks</Text>
          {/* A simple progress bar */}
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
        </Card>

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
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginLeft: 8,
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginTop: 4,
  },
  primaryText: {
    fontSize: 16,
    color: Colors.primaryText,
    marginTop: 4,
  },
  secondaryText: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  lineBreak: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  activityItem: {
    alignItems: 'center',
  },
  activityNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
});

export default HomeScreen;