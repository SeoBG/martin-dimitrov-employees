import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { PairProject } from '../utils/employeeUtils';

interface Props {
  pairs: PairProject[];
}

const EmployeeTable: React.FC<Props> = ({ pairs }) => {
  return (
    <ScrollView>
       <DataTable>
            <DataTable.Header style={styles.header}>
              <DataTable.Title style={styles.cell}><Text style={styles.headerText}>Employee ID #1</Text></DataTable.Title>
              <DataTable.Title style={styles.cell}><Text style={styles.headerText}>Employee ID #2</Text></DataTable.Title>
              <DataTable.Title style={styles.cell}><Text style={styles.headerText}>Project ID</Text></DataTable.Title>
              <DataTable.Title style={styles.cell}><Text style={styles.headerText}>Days worked</Text></DataTable.Title>
            </DataTable.Header>

            {pairs.map((item, index) => (
              <DataTable.Row key={index} style={styles.row}>
                <DataTable.Cell style={styles.cellCenter}>{item.emp1}</DataTable.Cell>
                <DataTable.Cell style={styles.cellCenter}>{item.emp2}</DataTable.Cell>
                <DataTable.Cell style={styles.cellCenter}>{item.projectId}</DataTable.Cell>
                <DataTable.Cell style={styles.cellCenter}>{item.daysWorked}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: { backgroundColor: '#ccc', borderWidth: 1, borderColor: '#000' },
  headerText: { fontWeight: 'bold', fontSize: 10, color: '#000' },
  cell: { justifyContent: 'center', alignItems: 'center', },
  cellCenter: { justifyContent: 'center', alignItems: 'center', },
  row: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#000',borderTopWidth:0 },
});

export default EmployeeTable;
