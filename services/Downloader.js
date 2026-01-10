export class Downloader {
    static tiktokUrl = "https://tikdownloader.io/api/ajaxSearch";
    static instagramUrl = "https://thesocialcat.com/api/instagram-download";

    parseHTML(html) {
        const result = {
            title: null,
            thumbnail: null,
            downloads: []
        };

        // Title
        const titleMatch = html.match(/<h3[^>]*>(.*?)<\/h3>/i);
        if (titleMatch) {
            result.title = titleMatch[1].trim();
        }

        // Thumbnail
        const thumbMatch = html.match(/<img[^>]+src="([^"]+)"/i);
        if (thumbMatch) {
            result.thumbnail = thumbMatch[1];
        }

        // Download linkleri
        const linkRegex =
            /<a[^>]+href="([^"]+)"[^>]*>(?:\s*<[^>]+>)*([^<]+)<\/a>/gi;

        let match;
        while ((match = linkRegex.exec(html)) !== null) {
            const url = match[1];
            const text = match[2]?.trim();

            if (
                url &&
                url !== "#" &&
                (url.startsWith("http") || url.startsWith("https"))
            ) {
                result.downloads.push({
                    text: text || "Download",
                    url
                });
            }
        }

        return result;
    }

    async tiktok(videoUrl) {
        try {
            const request = await fetch(Downloader.tiktokUrl, {
                method: "POST",
                headers: {
                    accept: "*/*",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-requested-with": "XMLHttpRequest",
                    Referer: "https://tikdownloader.io/en"
                },
                body: new URLSearchParams({
                    q: videoUrl,
                    lang: "en"
                }).toString()
            });

            const response = await request.json();

            if (response.status !== "ok") {
                throw new Error("Video bulunamadı");
            }

            return {
                status: response.status,
                ...this.parseHTML(response.data)
            };
        } catch (error) {
            console.error("TikTok indirme hatası:", error);
            throw error;
        }
    }

    async instagram(postUrl) {
        try {
            const response = await fetch(
                "https://thesocialcat.com/api/instagram-download",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        url: postUrl
                    })
                }
            );

            const result = await response.json();
            return result;

        } catch (error) {
            console.error("Instagram download error:", error);
            throw error;
        }
    }
}
