"use client";
import React from 'react';
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

interface NewsListProps {
  articles: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <ListContainer>
      {articles.map((article, index) => (
        <NewsItem key={index}>
          {article.urlToImage && <NewsImage src={article.urlToImage} alt={article.title} />}
          <NewsContent>
            <NewsTitle href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </NewsTitle>
            <NewsDescription>{article.description}</NewsDescription>
            <NewsSource>{article.source.name}</NewsSource>
          </NewsContent>
        </NewsItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NewsItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NewsImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.a`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #1a73e8;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NewsDescription = styled.p`
  margin: 0 0 10px 0;
  color: #666;
`;

const NewsSource = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #999;
`;


export default NewsList;

