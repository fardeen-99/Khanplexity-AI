import dotenv from 'dotenv';
dotenv.config();

import {tavily as Tavily} from '@tavily/core'

const tavily = Tavily({apiKey:process.env.TAVILY_API_KEY});

const search = async ({query}) => {
    const response = await tavily.search(query,{
 maxResults:5,
 searchDepth:"advanced",
 include_images:true
    });
    return JSON.stringify(response);
}

export default search;