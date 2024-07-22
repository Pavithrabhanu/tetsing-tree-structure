import React, { useState } from 'react';
import propTypes from '../utils/propTypes';
import TreeNode from './TreeNode';
import { handleTreeNodeClick, handleHighlight } from '../utils/treeUtils';

const TreeMenu = ({ items, onClick }) => {
  const [highlightedNodeIdMap, setHighlightedNodeIdMap] = useState({});
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  return (
    <div className="parent-node-container">
      {items.map((item) => (
        <TreeNode
          key={item.id} // Ensure each TreeNode has a unique key
          node={item}
          highlightedNodes={highlightedNodes}
          highlightedNodeId={highlightedNodeIdMap[item.id]}
          onClick={(id, isOpen) => handleTreeNodeClick(id, isOpen, item.id, onClick, setHighlightedNodeIdMap)}
          onHighlight={(id) => handleHighlight(id, item.id, setHighlightedNodes)}
        />
      ))}
    </div>
  );
};

TreeMenu.propTypes = propTypes.treeMenu;

export default TreeMenu;
