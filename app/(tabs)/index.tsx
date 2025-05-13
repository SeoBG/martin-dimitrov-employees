import * as DocumentPicker from 'expo-document-picker';
import Papa from 'papaparse';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import EmployeeTable from '../../components/EmployeeTable';
import { EmployeeRecord, findEmployeePairs, PairProject } from '../../utils/employeeUtils';

export default function HomeScreen() {
  const [pairs, setPairs] = useState<PairProject[]>([]);

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
      if (res.canceled) return;

      const fileUri = res.assets[0].uri;
      const response = await fetch(fileUri);
      const csvText = await response.text();

      const parsed = Papa.parse<EmployeeRecord>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      const employeePairs = findEmployeePairs(parsed.data);
      setPairs(employeePairs);
    } catch (err) {
      console.error('Error picking or parsing file:', err);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button title="Pick CSV File" onPress={handlePickFile} />
        {pairs.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>No data loaded.</Text>
          </View>
        ) : (
          <EmployeeTable pairs={pairs} />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 20, fontSize: 16 },
});
