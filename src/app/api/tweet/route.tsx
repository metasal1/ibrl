import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tweetUrl = searchParams.get('url');

    if (!tweetUrl) {
        return NextResponse.json({
            error: 'Missing required parameter: url',
            message: 'Please provide a valid Twitter/X post URL'
        }, { status: 400 });
    }

    // Extract tweet ID from URL
    const tweetId = tweetUrl.split('/').pop()?.split('?')[0];

    if (!tweetId) {
        return NextResponse.json({
            error: 'Invalid URL format',
            message: 'Could not extract post ID from the provided URL. Please ensure it\'s a valid Twitter/X post URL'
        }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://react-tweet.vercel.app/api/tweet/${tweetId}`
        );

        if (!response.ok) {
            const status = response.status;

            // Handle specific HTTP status codes
            switch (status) {
                case 404:
                    return NextResponse.json({
                        error: 'Not found',
                        message: 'The requested post could not be found. It may have been deleted or made private'
                    }, { status: 404 });
                default:
                    return NextResponse.json({
                        error: 'API error',
                        message: `API returned status code: ${status}`,
                        details: await response.text()
                    }, { status });
            }
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({
            error: 'Server error',
            message: 'An unexpected error occurred while processing your request',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
