import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

interface CustomButtonProps {
    text: string;
    buttonStyle?: object;
    onPress?: () => void;
}

function CustomButton({ text, buttonStyle, onPress }: CustomButtonProps) {
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      margin: 5,
      padding: 10,
      backgroundColor: 'black',
      borderRadius: 5,
      ...buttonStyle
    },
    buttonText: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center'
    }
  });

  return (
    <TouchableHighlight style={styles.button} onPress={onPress} underlayColor="#a8a8a8">
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
}

export default CustomButton;