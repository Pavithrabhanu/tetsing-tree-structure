# Tree Structure Project

## Overview

The Tree Structure Project is a React-based web application that visualizes a dynamic tree structure. Users can interact with nodes, expand to view children, highlight nodes, and fetch additional information by clicking on the grand children.

## Features

- **Dynamic Tree Visualization**: Displays a tree with expandable nodes.
- **Node Interaction**: Click on nodes to expand and view child nodes.
- **Node Highlighting**: Highlight nodes and their children.
- **Additional Data Display**: Fetch and display additional information for selected nodes.

## Performance Optimization

To ensure a smooth and responsive user experience, the application includes the following performance optimizations:

- **Component Memoization**: Utilizes `React.memo` to prevent unnecessary re-renders of components such as `TreeNode`, `SubTreeMenu`, and `TreeMenu`. This improves rendering performance when props do not change.
- **Lazy Loading**: Implements dynamic imports and `React.lazy` for loading components only when they are needed. This helps reduce the initial load time and improves the overall performance.
- **Efficient State Management**: Uses Redux for state management, allowing centralized and efficient updates to the application state.

## Routing

The application uses `react-router-dom` for client-side routing, allowing for seamless navigation between different views:

- **Dynamic Routing**: Routes are defined to handle different paths, enabling navigation without full page reloads.
- **Code Splitting**: Routes are configured to load components only when needed, further enhancing performance through lazy loading.

## Accessibility

The application is designed with accessibility in mind:

- **Keyboard Navigation**: Ensures that all interactive elements can be navigated and operated using a keyboard.
- **Aria Labels**: Uses `aria-label` attributes and accessible names for interactive elements to improve screen reader support.
- **Tooltips**: Provides tooltips for icons and interactive elements to give additional context and improve usability for all users.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/treestructure-project.git


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
src/components/: Contains React components such as TreeNode, SubTreeMenu, and TreeMenu.
src/redux/: Contains Redux setup, including store and treeSlice.
src/utils/: Utility functions for fetching data.
src/App.js: Main application component integrating the tree structure and theme toggle.
src/testing/: Contains test files for components and utilities.
src/routes/: Contains route definitions and lazy-loaded components.
