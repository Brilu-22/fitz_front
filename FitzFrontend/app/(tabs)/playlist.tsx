// FitzFrontend/app/(tabs)/playlist.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '../../constants/Colours';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { router } from 'expo-router';

interface Playlist {
  name: string;
  description: string;
  spotify_url: string;
  image_url?: string;
  owner: string;
  tracks_count: number;
}

export default function PlaylistScreen() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPlaylists = async () => {
      setLoading(true);
      setError(null);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError("No user logged in to fetch playlists.");
        setLoading(false);
        return;
      }

      try {
        // Query the latest plan for the user
        const plansRef = collection(db, 'users', currentUser.uid, 'plans');
        const q = query(plansRef, orderBy('generated_at', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latestPlan = querySnapshot.docs[0].data();
          if (latestPlan && latestPlan.music_playlist_suggestions) {
            setPlaylists(latestPlan.music_playlist_suggestions);
          } else {
            setError("No playlist suggestions found in the latest plan.");
          }
        } else {
          setError("No fitness plans found. Generate a plan first!");
        }
      } catch (err: any) {
        console.error("Error fetching playlists:", err);
        setError(`Failed to fetch playlists: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPlaylists();
  }, []);

  const openSpotifyLink = (url: string) => {
    // In a real app, you would use Linking from react-native
    // to open the URL in the browser or Spotify app.
    // import { Linking } from 'react-native';
    // Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    Alert.alert("Open Spotify", `Would open this playlist in Spotify: ${url}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading playlists...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={32} color={Colors.red} />
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.smallText}>Make sure you've generated a plan from the backend.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Your Playlists</Text>

        {playlists.length === 0 ? (
          <Card style={styles.noPlaylistsCard}>
            <Ionicons name="musical-notes-outline" size={40} color={Colors.secondaryText} />
            <Text style={styles.noPlaylistsText}>No playlists found.</Text>
            <Text style={styles.smallText}>Generate a new workout plan to get music suggestions!</Text>
            <TouchableOpacity style={styles.generatePlanButton} onPress={() => router.push('/workouts')}>
              <Text style={styles.generatePlanButtonText}>Generate Plan</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          playlists.map((playlist, index) => (
            <Card key={index} style={styles.playlistCard}>
              <TouchableOpacity onPress={() => openSpotifyLink(playlist.spotify_url)}>
                <View style={styles.playlistContent}>
                  {playlist.image_url ? (
                    <Image source={{ uri: playlist.image_url }} style={styles.playlistImage} />
                  ) : (
                    <View style={styles.playlistImagePlaceholder}>
                      <Ionicons name="musical-note" size={40} color={Colors.primaryText} />
                    </View>
                  )}
                  <View style={styles.playlistDetails}>
                    <Text style={styles.playlistName}>{playlist.name}</Text>
                    <Text style={styles.playlistDescription}>{playlist.description}</Text>
                    <Text style={styles.playlistMeta}>{playlist.owner} • {playlist.tracks_count} tracks</Text>
                  </View>
                  <Ionicons name="play-circle" size={30} color={Colors.accent} style={styles.playIcon} />
                </View>
              </TouchableOpacity>
            </Card>
          ))
        )}
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryText,
    margin: 16,
    marginTop: 20,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  errorText: {
    color: Colors.red,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  smallText: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginTop: 5,
  },
  noPlaylistsCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    marginHorizontal: 16,
    marginTop: 20,
  },
  noPlaylistsText: {
    color: Colors.primaryText,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  generatePlanButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  generatePlanButtonText: {
    color: Colors.primaryText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 10,
  },
  playlistContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  playlistImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  playlistName: {
    color: Colors.primaryText,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playlistDescription: {
    color: Colors.secondaryText,
    fontSize: 13,
    marginBottom: 4,
  },
  playlistMeta: {
    color: Colors.secondaryText,
    fontSize: 12,
  },
  playIcon: {
    marginLeft: 10,
  },
});