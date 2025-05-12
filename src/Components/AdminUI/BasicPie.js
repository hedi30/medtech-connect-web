import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const BasicPie = () => {
  // Data for the first Doughnut chart (User Engagement)
  const userEngagementData = {
    labels: ["Posts", "Comments", "Reactions"],
    datasets: [
      {
        label: "User Engagement",
        data: [40, 35, 25],
        backgroundColor: ["#3A6EA5", "#7DB9E8", "#0083a9"], // Updated third color
        hoverOffset: 4,
      },
    ],
  };

  // Data for the second Doughnut chart (Community Activity)
  const communityActivityData = {
    labels: ["Active Groups", "Inactive Groups", "Upcoming Events"],
    datasets: [
      {
        label: "Community Activity",
        data: [50, 30, 20],
        backgroundColor: ["#5A87B5", "#3E6C9B", "#0083a9"], // Updated third color
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
            const total = tooltipItem.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        margin: "auto",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          width: "220px",
          height: "300px",
          background: "#ececec",
          padding: "20px",
          borderRadius: "7px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          User Engagement
        </h3>
        <Doughnut data={userEngagementData} options={options} />
      </div>

      <div style={{ width: "50px" }}></div>

      <div
        style={{
          width: "220px",
          height: "300px",
          background: "#ececec",
          padding: "20px",
          borderRadius: "7px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          Community Activity
        </h3>
        <Doughnut data={communityActivityData} options={options} />
      </div>
    </div>
  );
};

export default BasicPie;
