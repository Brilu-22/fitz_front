import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ThemedView from '@/components/themed-view'


export default function ModalScreen() {
  return(
    <ThemedView style={styles.container}>
      <ThemedText>This is a modal screen!</ThemedText>
      <Link href={'/'} style={styles.link}>
        <ThemedText>Go back to Home</ThemedText>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
