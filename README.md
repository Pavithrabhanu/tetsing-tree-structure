# Tree Structure Project

## Overview

The Tree Structure Project is a React-based web application that visualizes a dynamic tree structure. 
Users can interact with nodes, expand to view children, highlight nodes, and fetch additional information onclicking the grand children.

## Features

- **Dynamic Tree Visualization**: Displays a tree with expandable nodes.
- **Node Interaction**: Click on nodes to expand and view child nodes.
- **Node Highlighting**: Highlight nodes and their children.
- **Additional Data Display**: Fetch and display additional information for selected nodes.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:

   git clone https://github.com/yourusername/treestructure-project.git

2. * * Navigate to the Project Directory:

   cd treestructure-project
3. * * Install Dependencies:

npm install

## Usage
1. Start the Development Server:
  
npm install
2. Open your Browser and go to http://localhost:3000 to view the application.

Running Tests
To run the tests and ensure the application is functioning correctly:
npm test

Project Structure
- src/components/: Contains React components such as TreeNode,SubTreeNode and TreeMenu.
- src/redux/: Contains Redux setup, including store and treeSlice.
- src/utils/: Utility functions for fetching data.
- src/App.js: Main application component integrating the tree structure and theme toggle.
- src/testing/: Contains test files for components and utilities

