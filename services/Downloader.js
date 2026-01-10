export class Downloader {
    static tiktokUrl = "https://tikdownloader.io/api/ajaxSearch"

    parseHTML(html) {
        const result = {
            title: null,
            thumbnail: null,
            downloads: []
        };

        // Title çıkar
        const titleMatch = html.match(/<h3>(.*?)<\/h3>/);
        if (titleMatch) {
            result.title = titleMatch[1]
                .replace(/&#x1F602;/g, '😂')
                .replace(/&amp;/g, '&')
                .trim();
        }

        // Thumbnail çıkar
        const thumbnailMatch = html.match(/<div class="thumbnail">[\s\S]*?<img src="([^"]+)"/);
        if (thumbnailMatch) {
            result.thumbnail = thumbnailMatch[1];
        }

        // Video/Audio indirme linklerini çıkar
        const downloadRegex = /<a href="([^"]+)"[^>]*class="tik-button-dl[^"]*"[^>]*>[\s\S]*?<\/i>\s*([^<]+)<\/a>/g;
        let match;

        while ((match = downloadRegex.exec(html)) !== null) {
            const url = match[1];
            const text = match[2].trim();

            // Boş veya # olan URL'leri ekleme
            if (url && url !== "#") {
                result.downloads.push({ text, url });
            }
        }

        // Photo mode downloads (eğer varsa)
        const photoRegex = /<div class="photo-list[\s\S]*?<\/div>/;
        const photoSection = html.match(photoRegex);

        if (photoSection) {
            const photoLinkRegex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
            let photoMatch;

            while ((photoMatch = photoLinkRegex.exec(photoSection[0])) !== null) {
                const url = photoMatch[1];
                const text = photoMatch[2].trim();

                if (url && url !== "#") {
                    result.downloads.push({ text, url });
                }
            }
        }

        return result;
    }

    async tiktok(videoUrl) {
        try {
            const request = await fetch(Downloader.tiktokUrl, {
                method: "POST",
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest',
                    'Referer': 'https://tikdownloader.io/en',
                },
                body: new URLSearchParams({
                    q: videoUrl,
                    lang: 'en'
                }).toString()
            });

            const response = await request.json();

            if (response.status !== "ok") {
                throw new Error("Video bulunamadı");
            }

            const parsed = this.parseHTML(response.data);

            return {
                status: response.status,
                ...parsed
            };

        } catch (error) {
            console.error('TikTok indirme hatası:', error);
            throw error;
        }
    }
}