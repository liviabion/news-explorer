"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NewsChart, NewsList} from '../components';
import styled from 'styled-components';

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const Home: React.FC = () => {
  const [keyword, setKeyword] = useState('bitcoin');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [source, setSource] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [lineData, setLineData] = useState({ labels: [] as string[], datasets: [] as any[] });
  const [barData, setBarData] = useState({ labels: [] as string[], datasets: [] as any[] });
  const [sources, setSources] = useState<{ id: string; name: string }[]>([]);

  const fetchNews = async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/everything?q=${keyword}&from=${startDate}&to=${endDate}&apiKey=${apiKey}`;
    if (source) {
      url += `&sources=${source}`;
    }
    const response = await axios.get(url);
    const data: Article[] = response.data.articles;

    setArticles(data);
    processLineData(data);
    processBarData(data);
  };

  const processLineData = (data: Article[]) => {
    const dates = data.map(article => new Date(article.publishedAt).toLocaleDateString());
    const counts = dates.reduce<{ [key: string]: number }>((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    setLineData({
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Number of Articles',
          data: Object.values(counts),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  const processBarData = (data: Article[]) => {
    const sources = data.map(article => article.source.name);
    const counts = sources.reduce<{ [key: string]: number }>((acc, source) => {
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    setBarData({
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Number of Articles',
          data: Object.values(counts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const fetchSources = async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    setSources(response.data.sources);
  };

  useEffect(() => {
    fetchNews();
    fetchSources();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <Container>
      <Header>News Dashboard</Header>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </Form>
      <NewsChart lineData={lineData} barData={barData} />
      <NewsList articles={articles} />
    </Container>
  );
};


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial, sans-serif';
  background-color: #f0f2f5;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 30px;
`;

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  input,
  select,
  button {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    background-color: #1a73e8;
    color: #fff;
    cursor: pointer;
    border: none;
  }

  button:hover {
    background-color: #155ab5;
  }
`;

export default Home;

