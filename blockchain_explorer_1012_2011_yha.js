// 代码生成时间: 2025-10-12 20:11:32
// Import necessary modules and plugins for Gatsby
const React = require('react');
const { graphql, Link } = require('gatsby');

// Create a functional component for the Blockchain Explorer page
const BlockchainExplorer = ({ data }) => {
  // Destructure the data to get the blockchain information
  const { blockchainInfo } = data;

  // Check if blockchainInfo is null to handle potential errors
  if (!blockchainInfo) {
    return <div>Failed to load blockchain data.</div>;
  }

  // Render the blockchain explorer
  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <p>Latest Block: {blockchainInfo.latestBlockNumber}</p>
      <p>Total Transactions: {blockchainInfo.totalTransactions}</p>
      <Link to='/'>Go back to home</Link>
    </div>
  );
};

// Define the GraphQL query to fetch blockchain data
export const query = graphql`
  query BlockchainExplorerQuery {
    blockchainInfo {
      latestBlockNumber
      totalTransactions
    }
  }
`;

// Export the BlockchainExplorer component for use in Gatsby pages
module.exports = BlockchainExplorer;