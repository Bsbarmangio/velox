import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Clipboard, Animated, Platform } from 'react-native';
import * as ClipboardAPI from 'expo-clipboard';

export default function BentoHomeUI() {
  const [url, setUrl] = useState('');
  const [clipboard, setClipboard] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const content = await ClipboardAPI.getStringAsync();
      if (mounted) setClipboard(content || '');
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.urlBarContainer}>
        <TextInput
          placeholder="Enter media URL"
          placeholderTextColor="#666"
          style={styles.urlInput}
          value={url}
          onChangeText={setUrl}
        />
        <TouchableOpacity style={styles.goButton} onPress={() => { /* start detection flow */ }}>
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <View style={styles.tile}><Text style={styles.tileText}>Recent Downloads</Text></View>
        <View style={styles.tile}><Text style={styles.tileText}>Storage Stats</Text></View>
        <View style={styles.tile}><Text style={styles.tileText}>Private Vault</Text></View>
        <View style={styles.tile}><Text style={styles.tileText}>Browser</Text></View>
      </View>

      <View style={styles.clipboardCard}>
        <Text style={styles.cardTitle}>Smart Clipboard</Text>
        <Text numberOfLines={2} style={styles.cardContent}>{clipboard || 'No URL detected in clipboard'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: '#0B0B0C' },
  urlBarContainer: { flexDirection: 'row', marginBottom: 16, alignItems: 'center' },
  urlInput: { flex: 1, backgroundColor: '#121214', color: '#fff', padding: 12, borderRadius: 12, marginRight: 8 },
  goButton: { backgroundColor: '#00F2EA', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  goText: { color: '#000', fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '48%', height: 120, backgroundColor: '#0F0F10', borderRadius: 12, marginBottom: 12, justifyContent: 'center', alignItems: 'center' },
  tileText: { color: '#fff' },
  clipboardCard: { marginTop: 12, backgroundColor: '#0F0F10', padding: 12, borderRadius: 12 },
  cardTitle: { color: '#00F2EA', fontWeight: '700', marginBottom: 6 },
  cardContent: { color: '#fff' }
});
