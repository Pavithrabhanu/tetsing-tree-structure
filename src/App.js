// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTreeData, setHighlightedNodes } from './redux/treeSlice';
import { fetchTreeData } from './utils/dynamicApi';
import ThemeToggle from './components/ThemeToggle';
import TreeMenu from './components/TreeMenu';
import './dist/styles.css';

const App = () => {
  const dispatch = useDispatch();
  const treeData = useSelector((state) => state.tree.treeData);
  const additionalData = useSelector((state) => state.tree.additionalData);
  const highlightedNodes = useSelector((state) => state.tree.highlightedNodes);
  const theme = useSelector((state) => state.tree.theme);

  useEffect(() => {
    const loadTreeData = async () => {
      const data = await fetchTreeData();
      dispatch(setTreeData(data));
    };

    loadTreeData();
  }, [dispatch]);

  const handleNodeClick = (nodeId, isOpening) => {
    const newHighlightedNodes = new Set(highlightedNodes);
    if (isOpening) {
      addToHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    } else {
      removeFromHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    }
    dispatch(setHighlightedNodes([...newHighlightedNodes]));
  };

  const addToHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
    const traverse = (node) => {
      if (node.id === targetNodeId) {
        highlightedSet.add(node.id);
        if (node.children) {
          node.children.forEach((child) => {
            highlightedSet.add(child.id);
            traverse(child);
          });
        }
      } else if (node.children) {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
  };

  const removeFromHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
    const traverse = (node) => {
      if (node.id === targetNodeId) {
        highlightedSet.delete(node.id);
        if (node.children) {
          node.children.forEach((child) => {
            highlightedSet.delete(child.id);
            traverse(child);
          });
        }
      } else if (node.children) {
        node.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle />
      <div className="main-container-parent">
        <h1>Dynamic Tree Structure</h1>
        <TreeMenu items={treeData} onClick={handleNodeClick} />
      </div>
      <div className="additional-data-container">
        {additionalData && (
          <div className="additional-data">
            <h2>Additional Data:</h2>
            <div className="description">
              {additionalData.description || 'No description available'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
