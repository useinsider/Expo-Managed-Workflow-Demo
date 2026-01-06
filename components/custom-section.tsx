import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CustomSectionProps {
    title: string;
    children?: ReactNode;
    style?: object;
}

function CustomSection({ title, children, style }: CustomSectionProps) {
  const styles = StyleSheet.create({
    section: {
      paddingRight: 20,
      paddingLeft: 20,
      marginTop: 10,
      ...style
    },
    title: {
      marginBottom: 10,
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black'
    },
    row: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
    },
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {children}
      </View>
    </View>
  );
}

export default CustomSection;