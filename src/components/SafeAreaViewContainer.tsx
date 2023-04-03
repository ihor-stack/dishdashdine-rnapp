import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';

const SafeAreaViewContainer = ({children}: {children: React.ReactNode}) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);

export default SafeAreaViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
});
