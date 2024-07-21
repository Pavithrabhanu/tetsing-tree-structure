
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

const TreeMenu = ({ items, onClick }) => {
 
  const [highlightedNodeIdMap, setHighlightedNodeIdMap] = useState({});
 
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  // Handler for node click events
  const handleNodeClick = (id, isOpen, treeId) => {
    onClick(id, isOpen);
    setHighlightedNodeIdMap((prevMap) => ({
      ...prevMap,
      [treeId]: id,
    }));
  };

  // Handler for highlight events
  const handleHighlight = (nodeId, isHighlighted) => {
    setHighlightedNodes((prev) => {
      if (isHighlighted) {
        return [...prev, nodeId];
      } else {
        return prev.filter((id) => id !== nodeId);
      }
    });
  };

  return (
    <div className="parent-node-container">
      {items.map((item) => (
        <TreeNode
          key={item.id}
          node={item}
          highlightedNodes={highlightedNodes}
          highlightedNodeId={highlightedNodeIdMap[item.id]}
          onClick={(id, isOpen) => handleNodeClick(id, isOpen, item.id)}
          onHighlight={(id) => handleHighlight(id, item.id)}
        />
      ))}
    </div>
  );
};

TreeMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      children: PropTypes.array,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TreeMenu;
