// 代码生成时间: 2025-10-02 20:48:44
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

// Dashboard component to display data in a dashboard layout
const Dashboard = ({ data }) => {
  // Destructure data if available or fallback to empty array
  const { allDataJson } = data || { allDataJson: { edges: [] } };

  // Extract the nodes from the data
  const dashboardData = allDataJson.edges.map(edge => edge.node);

  // Render dashboard data
  return (
    <div>
      <h1>Data Dashboard</h1>
      {dashboardData.map((item, index) => (
        <div key={index} className="dashboard-item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {/* Render additional data fields as needed */}
        </div>
      ))}
    </div>
  );
};

// Prop types for the Dashboard component
Dashboard.propTypes = {
  data: PropTypes.shape({
    allDataJson: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            // Include other data fields here
          }).isRequired,
        }).isRequired,
      ),
    }).isRequired,
  }).isRequired,
};

// Custom hook to fetch dashboard data from Gatsby's GraphQL layer
const useDashboardData = () => {
  const { error, data } = useStaticQuery(graphql`
    query DashboardQuery {
      allDataJson {
        edges {
          node {
            title
            description
            // Include other data fields here
          }
        }
      }
    }
  `);

  // Error handling for GraphQL query
  if (error) {
    console.error('Error fetching dashboard data:', error);
    return { data: null, error: true };
  }

  return { data, error: false };
};

// Export the Dashboard component and the custom hook
export { Dashboard, useDashboardData };
