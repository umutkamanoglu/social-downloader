import { View, Text } from "react-native";

export function Header() {
    return (
        <View className="mb-10">
            <Text className="text-3xl font-bold text-neutral-900">
                Sosyal İndirici
            </Text>
            <Text className="text-neutral-500 mt-2">
                Sadece gönderi linkini gir, ve medyanı otomatik olarak indir.
            </Text>
        </View>
    )
}