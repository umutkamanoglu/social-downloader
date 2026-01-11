import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native';

interface TiktokDownloadProps {
    data: any;
}

const TiktokDownload = ({ data }: TiktokDownloadProps) => {

    const downloadMedia = (url: string) => {

    }

    return (
        <View
            className='bg-white mt-5 rounded-2xl p-4'
        >
            <Image
                className='w-full h-80 rounded-2xl mb-3'
                source={{
                    uri: data.thumbnail
                }}
            />
            <Text>{data.title}</Text>

            <View
                className='p-2 rounded-2xl'
            >
                <Text
                    className='my-2 text-neutral-500'
                >
                    İndirme Seçenekleri
                </Text>
                {
                    data.downloads.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity
                                className='border border-neutral-200 bg-neutral-100 p-4 my-2 rounded-2xl'
                                key={index}
                                activeOpacity={0.7}
                            >
                                <Text>
                                    {item.text.replace(/&nbsp;/g, " ")}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default TiktokDownload