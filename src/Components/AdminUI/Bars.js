import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Bars = () => {
  // Data for the chart (User Engagement Metrics)
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Posts Created',
        data: [120, 150, 180, 170, 190, 220, 250],
        backgroundColor: 'rgba(0, 131, 169, 0.6)',
        borderColor: 'rgb(0, 131, 169)',
        borderWidth: 1,
      },
      {
        label: 'Comments Made',
        data: [300, 350, 400, 380, 420, 450, 500],
        backgroundColor: 'rgba(0, 102, 128, 0.6)',
        borderColor: 'rgb(0, 102, 128)',
        borderWidth: 1,
      },
      {
        label: 'Group Joins',
        data: [50, 65, 80, 75, 90, 100, 120],
        backgroundColor: 'rgba(72, 33, 33, 0.6)',   // #482121
        borderColor: 'rgb(72, 33, 33)',             // #482121
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'User Interactions',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Engagement Metrics (Last 6 Months)',
      },
    },
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Bars;
