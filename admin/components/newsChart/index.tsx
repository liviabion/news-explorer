"use client";
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

interface NewsChartProps {
  lineData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  barData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const NewsChart: React.FC<NewsChartProps> = ({ lineData, barData }) => {
  return (
    <div>
      <div>
        <h2>News Trend Over Time</h2>
        <Line data={lineData} />
      </div>
      <div style={{paddingTop: '60px'}}>
        <h2>News Sources Distribution</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default NewsChart;
