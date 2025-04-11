import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const MyChart = () => {
  // 🔹 User Engagement (Posts, Comments, Reactions)
  const userEngagementData = {
    labels: ['Posts', 'Comments', 'Reactions'],
    datasets: [
      {
        label: 'User Engagement',
        data: [40, 35, 25], // Example engagement percentages
        backgroundColor: ['#3A6EA5', '#7DB9E8', '#A3C9E5'], // Shades of blue
        hoverOffset: 4,
      },
    ],
  };

  // 🔹 Community Activity (Groups & Events)
  const communityActivityData = {
    labels: ['Active Groups', 'Inactive Groups', 'Upcoming Events'],
    datasets: [
      {
        label: 'Community Activity',
        data: [50, 30, 20], // Example activity data
        backgroundColor: ['#5A87B5', '#3E6C9B', '#6BB9F0'], // Shades of blue
        hoverOffset: 4,
      },
    ],
  };

  // 🔹 User Distribution (Students & Alumni)
  const userDistributionData = {
    labels: ['Current Students', 'Alumni'],
    datasets: [
      {
        label: 'User Distribution',
        data: [65, 35], // Example distribution data
        backgroundColor: ['#4C89A8', '#76A9C7'], // Shades of blue
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      <div style={{ width: '300px', height: '300px' }}>
        <h3>User Engagement</h3>
        <Doughnut data={userEngagementData} options={options} />
      </div>

      <div style={{ width: '300px', height: '300px' }}>
        <h3>Community Activity</h3>
        <Doughnut data={communityActivityData} options={options} />
      </div>

      <div style={{ width: '300px', height: '300px' }}>
        <h3>User Distribution</h3>
        <Doughnut data={userDistributionData} options={options} />
      </div>
    </div>
  );
};

export default MyChart;
