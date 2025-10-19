// FitzFrontend/app/(tabs)/profile.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colours';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig'; // Import Firebase auth and db
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserName(currentUser.displayName);
        setUserEmail(currentUser.email);

        // Try to get profile image from Firestore first
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserImage(userData?.profileImageUrl || currentUser.photoURL);
        } else {
          // Fallback to Firebase auth photoURL or a default avatar if not in Firestore
          setUserImage(currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'User')}&background=A020F0&color=FFFFFF&size=100`);
        }
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserProfile();
      } else {
        setLoading(false);
        setUserName(null);
        setUserEmail(null);
        setUserImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      router.replace('./login'); // Redirect to login screen after logout
    } catch (error: any) {
      console.error("Logout error:", error);
      Alert.alert('Logout Failed', error.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Profile</Text>

        {/* User Info Card */}
        <Card style={styles.profileCard}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={50} color={Colors.primaryText} />
            </View>
          )}
          <Text style={styles.userName}>{userName || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{userEmail || 'Not logged in'}</Text>
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    color: Colors.primaryText,
    marginTop: 10,
    fontSize: 16,
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
    borderWidth: 2,
    borderColor: Colors.border,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
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