"use client";
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  lineData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      pointBackgroundColor?: string; // Adicionando propriedade opcional para cor dos pontos
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

const NewsChart: React.FC<ChartProps> = ({ lineData, barData }) => {
  return (
    <div>
      <h2>News Trends</h2>
      <Line data={lineData} />
      <h2>News Sources</h2>
      <Bar data={barData} />
    </div>
  );
};

export default NewsChart;
