
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SubTreeMenu = ({ node, highlightedNodeId, onNodeClick, onLeafClick, onHighlight }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle click expand/collapse
  const handleNodeClick = (event) => {
    event.stopPropagation(); 
    if (node.children) {
      setIsOpen(prevState => {
        const newState = !prevState;
        onNodeClick(node.id, newState);
        return newState;
      });
    }
    onHighlight(node.id);
  };

  // Handle click on a leaf node
  const handleLeafClick = (event) => {
    event.stopPropagation(); 
    if (!node.children) {
      onLeafClick(node.id);
      onHighlight(node.id);
    }
  };

  const isHighlighted = highlightedNodeId && (node.id === highlightedNodeId || node.children?.some(child => child.id === highlightedNodeId));

  return (
    <div>
      <div
        onClick={handleNodeClick}
        style={{
          cursor: node.children ? 'pointer' : 'default',
          backgroundColor: isHighlighted ? 'lightblue' : 'white',
          padding: '5px',
          userSelect: 'none' 
        }}
      >
        {node.children && (isOpen ? '[-] ' : '[+] ')}
        <span onClick={handleLeafClick}>{node.label}</span>
      </div>
      {node.children && isOpen && (
        <ul style={{ paddingLeft: '20px' }}>
          {node.children.map(child => (
            <SubTreeMenu
              key={child.id}
              node={child}
              highlightedNodeId={highlightedNodeId}
              onNodeClick={onNodeClick}
              onLeafClick={onLeafClick}
              onHighlight={onHighlight}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

SubTreeMenu.propTypes = {
  node: PropTypes.object.isRequired,
  highlightedNodeId: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  onLeafClick: PropTypes.func.isRequired,
  onHighlight: PropTypes.func.isRequired,
};

export default SubTreeMenu;
