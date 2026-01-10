import { View, Text } from "react-native";

export function Header() {
    return (
        <View className="mb-10">
            <Text className="text-3xl font-bold text-neutral-900">
                Social Vault
            </Text>
            <Text className="text-neutral-500 mt-2">
                Gönderileri indirmek artık çok kolay..
            </Text>
        </View>
    )
}