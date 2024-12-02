// a component that displays news from a news API

import React, { useState, useEffect } from 'react';

// let API_KEY = "d4200770bc64484fbcaaf5ef9111ac54"
let URL = `https://newsapi.org/v2/everything?q=bathroom&apiKey=d4200770bc64484fbcaaf5ef9111ac54`


export default function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setNews(data.articles.slice(0,2));
            });
    }, []);

    if (!news) return (
        <div>
            <h2>News</h2>
            <p>Loading...</p>
        </div>
    )

    return (
        <div>
            <h3>News</h3>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank" rel="noreferrer">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

