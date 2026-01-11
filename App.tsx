import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import ToastManager, { Toast } from 'toastify-react-native'
import { useState } from "react";
import './global.css';
import { Header } from 'components/Header';
import { Downloader } from 'services/Downloader';
import TiktokDownload from 'components/TiktokDownload';
=======
import ToastManager, { Toast } from 'toastify-react-native';
import './global.css';
import { Downloader } from './services/Downloader';

interface DownloadItem {
  text: string;
  url: string;
}

interface DownloadResult {
  status?: string;
  title?: string;
  thumbnail?: string;
  downloads?: DownloadItem[];
  data?: any; // Instagram için
}

type SocialPlatforms = "youtube" | "instagram" | "tiktok";
>>>>>>> c1c5f660621de29a28cb2a3ce25adfa3c2eaffe5

export default function App() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [postType, setPostType] = useState<SocialPlatforms | null>(null);

  const downloader = new Downloader();

  const linkDetector = (url: string): SocialPlatforms | null => {
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

  const handleDownload = async (): Promise<void> => {
    if (!url.trim()) {
      setError('Lütfen bir bağlantı girin');
      Toast.error('Lütfen bir bağlantı girin');
      return;
    }

<<<<<<< HEAD
    // else if (platform == "instagram") {
    //   setPostType("instagram");
    //   const result: any = await downloader.instagram(postUrl);
    //   setData(result);
    //   console.log("Instagram Download Result:", result);
    // }
  }

  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header />
=======
    const platform = linkDetector(url);

    if (!platform) {
      setError('Geçersiz bağlantı. Lütfen TikTok, Instagram veya YouTube linki girin.');
      Toast.error('Geçersiz platform linki');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPostType(platform);

    try {
      let data: any = null;

      if (platform === "tiktok") {
        data = await downloader.tiktok(url);
        console.log("TikTok Download Result:", data);
        // Toast.success('Video başarıyla yüklendi!');
      } else if (platform === "instagram") {
        data = await downloader.instagram(url);
        console.log("Instagram Download Result:", data);
        // Toast.success('İçerik başarıyla yüklendi!');
      } else if (platform === "youtube") {
        Toast.info('YouTube desteği yakında eklenecek');
        setError('YouTube desteği yakında eklenecek');
        return;
      }

      setResult(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.';
      setError(errorMessage);
      Toast.error(errorMessage);
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = (): void => {
    setUrl('');
    setResult(null);
    setError(null);
    setPostType(null);
  };

  const getPlatformEmoji = (platform: SocialPlatforms | null): string => {
    switch (platform) {
      case 'instagram': return '📸';
      case 'tiktok': return '🎵';
      case 'youtube': return '▶️';
      default: return '📥';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header with Gradient Effect */}
      <View className={`bg-indigo-500 ${Platform.OS === 'android' ? 'pt-12' : 'pt-16'} pb-8 px-6 rounded-b-[30px] shadow-lg relative overflow-hidden`}>
        <View className="z-10">
          <Text className="text-white text-3xl font-bold mb-1">SocialSave</Text>
          <Text className="text-indigo-100 text-sm font-medium">Video & Fotoğraf İndirici</Text>
        </View>
        {/* Decorative Circle */}
        <View className="absolute -right-12 top-5 w-48 h-48 rounded-full bg-white/10" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Platform Pills */}
        <View className="flex-row px-5 py-5 gap-3">
          <View className={`flex-row items-center px-4 py-2.5 rounded-full shadow-sm ${postType === 'instagram' ? 'bg-indigo-500' : 'bg-white'}`}>
            <Text className="text-lg mr-1.5">📸</Text>
            <Text className={`text-xs font-semibold ${postType === 'instagram' ? 'text-white' : 'text-slate-700'}`}>Instagram</Text>
          </View>
          <View className={`flex-row items-center px-4 py-2.5 rounded-full shadow-sm ${postType === 'tiktok' ? 'bg-indigo-500' : 'bg-white'}`}>
            <Text className="text-lg mr-1.5">🎵</Text>
            <Text className={`text-xs font-semibold ${postType === 'tiktok' ? 'text-white' : 'text-slate-700'}`}>TikTok</Text>
          </View>
          <View className={`flex-row items-center px-4 py-2.5 rounded-full shadow-sm ${postType === 'youtube' ? 'bg-indigo-500' : 'bg-white'}`}>
            <Text className="text-lg mr-1.5">▶️</Text>
            <Text className={`text-xs font-semibold ${postType === 'youtube' ? 'text-white' : 'text-slate-700'}`}>YouTube</Text>
          </View>
        </View>
>>>>>>> c1c5f660621de29a28cb2a3ce25adfa3c2eaffe5

        {/* Input Card */}
        <View className="bg-white mx-5 p-5 rounded-3xl shadow-md">
          <Text className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">
            Bağlantıyı Yapıştır
          </Text>

          <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 bg-slate-50">
            <TextInput
              className="flex-1 text-slate-800 text-base py-3.5"
              placeholder="https://..."
              placeholderTextColor="#94A3B8"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            {url.length > 0 && (
              <TouchableOpacity
                onPress={clearAll}
                className="w-7 h-7 rounded-full bg-slate-200 items-center justify-center"
              >
                <Text className="text-slate-600 text-sm font-semibold">✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Download Button */}
          <TouchableOpacity
            onPress={handleDownload}
            disabled={loading || !url.trim()}
            className={`mt-4 py-4 rounded-2xl shadow-lg ${loading || !url.trim() ? 'bg-slate-300' : 'bg-indigo-500'
              }`}
            activeOpacity={0.8}
          >
            {loading ? (
              <View className="flex-row items-center justify-center gap-2">
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text className="text-white text-base font-semibold">Hazırlanıyor...</Text>
              </View>
            ) : (
              <View className="flex-row items-center justify-center gap-2">
                <Text className="text-lg">⬇️</Text>
                <Text className="text-white text-base font-semibold">İndir</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-50 mx-5 mt-4 p-4 rounded-2xl flex-row items-center border border-red-200">
            <Text className="text-xl mr-3">⚠️</Text>
            <Text className="flex-1 text-red-900 text-sm font-medium">{error}</Text>
          </View>
        )}

        {/* Result Card - TikTok */}
        {result && postType === 'tiktok' && result.downloads && result.downloads.length > 0 && (
          <View className="bg-white mx-5 mt-4 rounded-3xl overflow-hidden shadow-lg">
            {/* Thumbnail */}
            {result.thumbnail && (
              <View className="relative">
                <Image
                  source={{ uri: result.thumbnail }}
                  className="w-full h-60"
                  resizeMode="cover"
                />
                <View className="absolute top-4 right-4">
                  <View className="bg-green-500 px-3 py-1.5 rounded-xl">
                    <Text className="text-white text-xs font-semibold">✓ Hazır</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Title */}
            {result.title && (
              <View className="p-5 border-b border-slate-100">
                <Text className="text-slate-800 text-base leading-6 font-medium">
                  {result.title}
                </Text>
              </View>
            )}

            {/* Download Options */}
            <View className="p-5">
              <Text className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">
                İndirme Seçenekleri
              </Text>

              {result.downloads.map((item: DownloadItem, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Linking.openURL(item.url);
                    Toast.success('İndirme başlatıldı');
                  }}
                  className="flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl mb-2 border border-slate-200"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 rounded-xl bg-indigo-100 items-center justify-center mr-3">
                      <Text className="text-lg">
                        {item.text.toLowerCase().includes('mp3') ? '🎵' : '🎬'}
                      </Text>
                    </View>
                    <Text className="text-slate-800 text-sm font-medium flex-1">
                      {item.text}
                    </Text>
                  </View>
                  <Text className="text-indigo-500 text-xl font-semibold">→</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* New Download Button */}
            <View className="mx-5 mb-5">
              <TouchableOpacity
                onPress={clearAll}
                className="p-4 rounded-2xl border-2 border-dashed border-slate-300 items-center"
                activeOpacity={0.8}
              >
                <Text className="text-indigo-500 text-sm font-semibold">+ Yeni İndirme</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {        /* Result Card - Instagram */}
        {result && postType === 'instagram' && (
          <View className="bg-white mx-5 mt-4 rounded-3xl overflow-hidden shadow-lg">
            {/* Thumbnail */}
            {(result.data?.thumbnail || result.thumbnail) && (
              <View className="relative">
                <Image
                  source={{ uri: result.data?.thumbnail || result.thumbnail }}
                  className="w-full h-60"
                  resizeMode="cover"
                />
                <View className="absolute top-4 right-4">
                  <View className="bg-green-500 px-3 py-1.5 rounded-xl">
                    <Text className="text-white text-xs font-semibold">✓ Hazır</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Download Options */}
            <View className="p-5">
              <Text className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">
                İndirme Seçenekleri
              </Text>

              {/* Video/Image URL */}
              {(result.data?.url || result.data?.video_url || result.data?.image_url) && (
                <TouchableOpacity
                  onPress={() => {
                    const downloadUrl = result.data?.url || result.data?.video_url || result.data?.image_url;
                    Linking.openURL(downloadUrl);
                    Toast.success('İndirme başlatıldı');
                  }}
                  className="flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl mb-2 border border-slate-200"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 rounded-xl bg-indigo-100 items-center justify-center mr-3">
                      <Text className="text-lg">
                        {result.data?.type === 'image' ? '📸' : '🎬'}
                      </Text>
                    </View>
                    <Text className="text-slate-800 text-sm font-medium flex-1">
                      {result.data?.type === 'image' ? 'Fotoğraf İndir' : 'Video İndir'}
                    </Text>
                  </View>
                  <Text className="text-indigo-500 text-xl font-semibold">→</Text>
                </TouchableOpacity>
              )}

              {/* Multiple items (carousel) */}
              {result.data?.items && result.data.items.length > 0 && (
                result.data.items.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      Linking.openURL(item.url);
                      Toast.success('İndirme başlatıldı');
                    }}
                    className="flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl mb-2 border border-slate-200"
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 rounded-xl bg-indigo-100 items-center justify-center mr-3">
                        <Text className="text-lg">
                          {item.type === 'image' ? '📸' : '🎬'}
                        </Text>
                      </View>
                      <Text className="text-slate-800 text-sm font-medium flex-1">
                        {item.type === 'image' ? `Fotoğraf ${index + 1}` : `Video ${index + 1}`}
                      </Text>
                    </View>
                    <Text className="text-indigo-500 text-xl font-semibold">→</Text>
                  </TouchableOpacity>
                ))
              )}

              {/* Fallback - Show raw data structure for debugging */}
              {!result.data?.url && !result.data?.video_url && !result.data?.image_url && !result.data?.items && (
                <View className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                  <Text className="text-yellow-900 text-sm">
                    Veri yapısı beklenmedik. Konsolu kontrol edin.
                  </Text>
                </View>
              )}
            </View>

            {/* New Download Button */}
            <View className="mx-5 mb-5">
              <TouchableOpacity
                onPress={clearAll}
                className="p-4 rounded-2xl border-2 border-dashed border-slate-300 items-center"
                activeOpacity={0.8}
              >
                <Text className="text-indigo-500 text-sm font-semibold">+ Yeni İndirme</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Empty State */}
        {!result && !loading && url.length === 0 && (
          <View className="items-center py-16 px-10">
            <View className="w-20 h-20 rounded-full bg-indigo-100 items-center justify-center mb-6">
              <Text className="text-4xl">📥</Text>
            </View>
            <Text className="text-slate-800 text-xl font-bold mb-3">Kolay İndirme</Text>
            <Text className="text-slate-500 text-center text-sm leading-6 mb-8">
              Instagram, TikTok veya YouTube{'\n'}bağlantısını yapıştırarak başlayın
            </Text>

            {/* Features */}
            <View className="flex-row gap-6">
              <View className="items-center">
                <Text className="text-3xl mb-2">⚡</Text>
                <Text className="text-slate-500 text-xs font-semibold">Hızlı</Text>
              </View>
              <View className="items-center">
                <Text className="text-3xl mb-2">🔒</Text>
                <Text className="text-slate-500 text-xs font-semibold">Güvenli</Text>
              </View>
              <View className="items-center">
                <Text className="text-3xl mb-2">🆓</Text>
                <Text className="text-slate-500 text-xs font-semibold">Ücretsiz</Text>
              </View>
            </View>
          </View>
        )}

        <View className="py-10" />
      </ScrollView>

<<<<<<< HEAD
        {
          postType === "tiktok" && data && <TiktokDownload data={data} />
        }

      </ScrollView>
      <StatusBar style="auto" />
=======
>>>>>>> c1c5f660621de29a28cb2a3ce25adfa3c2eaffe5
      <ToastManager />
    </View>
  );
}