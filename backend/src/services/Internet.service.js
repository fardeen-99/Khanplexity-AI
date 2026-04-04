import dotenv from 'dotenv';
dotenv.config();

import {tavily as Tavily} from '@tavily/core'

const tavily = Tavily({apiKey:process.env.TAVILY_API_KEY});

const search = async ({query}) => {
    const now = new Date();
    const year = now.getFullYear();

    const enhancedQuery = `${query} latest ${year}`;

    const response = await tavily.search(enhancedQuery, {
        maxResults: 5,
        searchDepth: "advanced",
        include_images: true,
        include_answer: true,
        time_range: "day"
    });

    return JSON.stringify(response);
}

export default search;