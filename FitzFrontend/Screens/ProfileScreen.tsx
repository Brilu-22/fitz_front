import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colours';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Profile</Text>

        {/* User Info Card */}
        <Card style={styles.profileCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100/A020F0/FFFFFF?text=JD' }} // Placeholder image
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.userEmail}>jane.doe@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            <Ionicons name="create-outline" size={18} color={Colors.primaryText} />
          </TouchableOpacity>
        </Card>

        {/* Settings Options */}
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="cog-outline" size={24} color={Colors.secondaryText} />
            <Text style={styles.settingText}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.secondaryText} />
          </TouchableOpacity>
          <View style={styles.lineBreak} />
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="barbell-outline" size={24} color={Colors.secondaryText} />
            <Text style={styles.settingText}>Fitness Goals</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.secondaryText} />
          </TouchableOpacity>
          <View style={styles.lineBreak} />
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="color-palette-outline" size={24} color={Colors.secondaryText} />
            <Text style={styles.settingText}>App Theme</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.secondaryText} />
          </TouchableOpacity>
        </Card>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
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
  profileCard: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: Colors.accent, // Fallback background
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 15,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background, // Slightly different background for the button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  editProfileButtonText: {
    color: Colors.primaryText,
    fontSize: 16,
    marginRight: 5,
  },
  lineBreak: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
    marginHorizontal: -16, // Extend the line to card edges
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingText: {
    flex: 1, // Take up available space
    fontSize: 17,
    color: Colors.primaryText,
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.red, // Red for logout
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;