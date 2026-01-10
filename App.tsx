import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import './global.css';
import { Header } from 'components/Header';
import { Downloader } from 'services/Downloader';

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [postType, setPostType] = useState<"youtube" | "instagram" | "tiktok" | null>(null);
  const downloader = new Downloader();
  type SocialPlatforms = "youtube" | "instagram" | "tiktok";

  const linkDedector = (url: string): SocialPlatforms | null => {
    if (!url || typeof url !== "string") return null;

    const normalizedUrl = url.toLowerCase().trim();

    const patterns: Record<SocialPlatforms, RegExp[]> = {
      youtube: [
        /^(https?:\/\/)?(www\.)?(m\.)?youtube\.com\/.+/,
        /^(https?:\/\/)?(www\.)?youtu\.be\/.+/
      ],
      instagram: [
        /^(https?:\/\/)?(www\.)?instagram\.com\/.+/,
        /^(https?:\/\/)?(www\.)?instagr\.am\/.+/
      ],
      tiktok: [
        /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/,
        /^(https?:\/\/)?(vm|vt)\.tiktok\.com\/.+/
      ]
    };

    for (const platform in patterns) {
      const key = platform as SocialPlatforms;
      if (patterns[key].some((regex) => regex.test(normalizedUrl))) {
        return key;
      }
    }

    return null;
  };

  const handeDownload = async (postUrl: string) => {
    const platform = await linkDedector(postUrl);
    if (platform == "tiktok") {
      setPostType("tiktok");
      const result: any = await downloader.tiktok(postUrl);
      setData(result);
      console.log("TikTok Download Result:", result);
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <View className="flex-1 p-5">
        {/* Header */}
        <Header />

        {/* Input Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-sm text-neutral-600 mb-2">
            Gönderi Linki
          </Text>

          <TextInput
            value={url}
            onChangeText={setUrl}
            placeholder="Gönderi Linki"
            placeholderTextColor="#9ca3af"
            className="border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900"
          />
        </View>

        {/* Download Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handeDownload(url)
          }}
          className="bg-black rounded-2xl py-4 mt-6 items-center"
        >
          <Text className="text-white font-semibold text-base">
            Videoyu İndir
          </Text>
        </TouchableOpacity>

        {/* Info Box */}
        <View className="mt-6 bg-neutral-200/50 rounded-xl p-4">
          <Text className="text-neutral-600 text-sm text-center">
            Linki yapıştır ve indirmeye başla 🚀
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
