import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components for the Pie chart
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const JobStatusChart = () => {
  const [data, setData] = useState(null);

  async function getJobStatusCount() {
    try {
      const apiResponse = await fetch('/api/v1/user/getstatuscount', {
        method: 'GET',
      });
      const response = await apiResponse.json();
      setData(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getJobStatusCount();
  }, []);

  // Prepare chart data when `data` is available
  const chartData = data
    ? {
        labels: Object.keys(data), // ["Rejected", "Reviewing", "Shortlisted"]
        datasets: [
          {
            label: 'Job Application Status',
            data: Object.values(data), // [3, 2, 1]
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Custom colors
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      title: {
        display: true,
        text: 'Job Application Status Distribution',
      },
    },
  };

  return (
    <div className="job-status-charts">
      <h2 className="chart-title">Job Application Status Distribution</h2>
      
      <div className="pie-chart">
        {chartData ? (
          <Pie data={chartData} options={pieOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      <style jsx>{`
        .job-status-charts {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .chart-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .pie-chart {
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default JobStatusChart;
