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

    if (!process.env.TWITTER_BEARER_TOKEN) {
        return NextResponse.json({
            error: 'Configuration error',
            message: 'Twitter API credentials are not properly configured'
        }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&user.fields=name,username,profile_image_url`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            const status = response.status;

            // Handle specific HTTP status codes
            switch (status) {
                case 401:
                    return NextResponse.json({
                        error: 'Authentication failed',
                        message: 'Failed to authenticate with Twitter API'
                    }, { status: 401 });
                case 403:
                    return NextResponse.json({
                        error: 'Access denied',
                        message: 'The request is not authorized to access this resource'
                    }, { status: 403 });
                case 404:
                    return NextResponse.json({
                        error: 'Not found',
                        message: 'The requested post could not be found. It may have been deleted or made private'
                    }, { status: 404 });
                case 429:
                    return NextResponse.json({
                        error: 'Rate limit exceeded',
                        message: 'Twitter API rate limit has been reached. Please try again later'
                    }, { status: 429 });
                default:
                    return NextResponse.json({
                        error: 'Twitter API error',
                        message: `Twitter API returned status code: ${status}`,
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
