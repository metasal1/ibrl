// app/tweet/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import html2canvas from 'html2canvas';
import { Copy, Download, X, Loader2 } from 'lucide-react';

interface TweetData {
    data: {
        text: string;
        created_at: string;
        favorite_count: number;
        user: {
            name: string;
            screen_name: string;
            profile_image_url_https: string;
            verified: boolean;
            is_blue_verified: boolean;
        };
    };
}

export default function TweetPage() {
    const [tweetUrl, setTweetUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [tweetData, setTweetData] = useState<TweetData | null>(null);
    const [error, setError] = useState('');
    const [copyStatus, setCopyStatus] = useState('');

    const clearAll = () => {
        setTweetUrl('');
        setTweetData(null);
        setError('');
        setCopyStatus('');
    };

    const fetchTweet = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/tweet?url=${encodeURIComponent(tweetUrl)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tweet');
            }
            const data = await response.json();
            setTweetData(data);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch tweet. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    const generateCanvas = async () => {
        const element = document.getElementById('tweet-card');
        if (!element) return null;

        const canvas = await html2canvas(element, {
            scale: 1,
            logging: false,
            useCORS: true,
            width: 512,
            height: 512,
            windowWidth: 512,
            windowHeight: 512,
            backgroundColor: null,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('tweet-card');
                if (clonedElement) {
                    clonedElement.style.backgroundColor = 'transparent';
                }
            }
        });

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 512;
        tempCanvas.height = 512;
        const ctx = tempCanvas.getContext('2d', { alpha: true });

        if (ctx) {
            ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            ctx.drawImage(canvas, 0, 0, 512, 512);
            return tempCanvas;
        }
        return null;
    };

    const handleDownload = async () => {
        if (!tweetData) return;
        setLoading(true);

        try {
            const canvas = await generateCanvas();
            if (canvas) {
                const blob = await new Promise<Blob>((resolve) => {
                    canvas.toBlob((blob) => {
                        resolve(blob as Blob);
                    }, 'image/png', 1.0);
                });

                const username = tweetData.data.user.screen_name;
                const filename = `${username}_tweet.png`;

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            setError('Error generating image');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyToClipboard = async () => {
        if (!tweetData) return;
        setLoading(true);
        setCopyStatus('');

        try {
            const canvas = await generateCanvas();
            if (canvas) {
                const blob = await new Promise<Blob>((resolve) => {
                    canvas.toBlob((blob) => {
                        resolve(blob as Blob);
                    }, 'image/png', 1.0);
                });

                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                setCopyStatus('Copied!');
                setTimeout(() => setCopyStatus(''), 2000);
            }
        } catch (error) {
            setError('Error copying image to clipboard');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const user = tweetData?.data.user;

    return (
        <main className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Updated Header with better spacing and styling */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Tweet Card Generator</h1>
                    <p className="text-gray-400 text-lg">Create beautiful tweet cards for IBRL.club</p>
                </div>

                {/* Updated Generator Container */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700">
                    {/* Input Group with improved spacing */}
                    <div className="space-y-6">
                        <div className="flex gap-3">
                            <Input
                                placeholder="Paste tweet URL..."
                                value={tweetUrl}
                                onChange={(e) => setTweetUrl(e.target.value)}
                                className="flex-1 h-11 bg-gray-900/50 border-gray-700"
                            />
                            <Button
                                onClick={fetchTweet}
                                disabled={!tweetUrl || loading}
                                className="h-11 px-6"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    'Generate Card'
                                )}
                            </Button>
                            {(tweetUrl || tweetData || error) && (
                                <Button
                                    onClick={clearAll}
                                    variant="destructive"
                                    size="icon"
                                    className="h-11 w-11"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {tweetData && (
                            <div className="space-y-6">
                                {/* Preview Container with better centering */}
                                <div className="flex justify-center bg-gray-900/30 rounded-lg p-6">
                                    <div
                                        id="tweet-card"
                                        className="flex flex-col items-center justify-between p-8 rounded-3xl overflow-hidden"
                                        style={{
                                            width: '512px',
                                            height: '512px',
                                            background: 'linear-gradient(135deg, #8B0000 0%, #FF0000 100%)',
                                            boxShadow: '0 0 40px rgba(0,0,0,0.2)',
                                            WebkitBackfaceVisibility: 'hidden',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    >
                                        {/* Tweet Card Container */}
                                        <div className="w-full flex items-center justify-center">
                                            <div className="w-[400px] rounded-2xl bg-[#15202b] text-white p-4">
                                                {/* User Info */}
                                                <div className="flex items-start gap-3">
                                                    <img
                                                        src={user?.profile_image_url_https}
                                                        alt={user?.name}
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-1">
                                                            <p className="font-bold text-white">{user?.name}</p>
                                                            {user?.is_blue_verified && (
                                                                <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-500">@{user?.screen_name}</p>
                                                    </div>
                                                </div>

                                                {/* Tweet Text */}
                                                <p className="mt-3 text-white text-xl leading-normal">
                                                    {tweetData.data.text}
                                                </p>

                                                {/* Twitter Bird Icon */}
                                                <div className="mt-4 flex justify-end">
                                                    <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* IBRL Text */}
                                        <div className="w-full text-center">
                                            <div
                                                className="text-[40px] font-bold leading-none tracking-wider italic underline"
                                                style={{
                                                    color: '#FF4242',
                                                    textShadow: `
                                                        -2px -2px 0 #8B0000,
                                                        2px -2px 0 #8B0000,
                                                        -2px 2px 0 #8B0000,
                                                        2px 2px 0 #8B0000
                                                    `
                                                }}
                                            >
                                                IBRL.club
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons with improved styling */}
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleDownload}
                                        disabled={loading}
                                        className="flex-1 h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Image
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        onClick={handleCopyToClipboard}
                                        disabled={loading}
                                        className="flex-1 h-11"
                                        variant="secondary"
                                    >
                                        <Copy className="w-4 h-4 mr-2" />
                                        {copyStatus || 'Copy to Clipboard'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
