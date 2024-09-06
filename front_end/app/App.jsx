import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, NativeEventEmitter, Text } from "react-native";
import "react-native-gesture-handler";

import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();

import Router from "./src/screens/Router";

import { ApolloProvider } from '@apollo/client';

import { client, windowHeight, windowWidth } from "./src/context/context";

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    });

    if (!fontsLoaded) {
        return null
    }

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <StatusBar />
                    <Router />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ApolloProvider>
    );
}