import { SafeAreaView, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function teste() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Testeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}