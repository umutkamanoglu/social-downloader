import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import './global.css';

export default function App() {
  return (
    <SafeAreaView>
      <Text>Demo</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
