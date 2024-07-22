import React, { useState } from 'react';
import propTypes from '../utils/propTypes';
import { handleNodeClick, handleLeafClick } from '../utils/treeUtils';

const SubTreeMenu = ({ node, highlightedNodeId, onNodeClick, onLeafClick, onHighlight }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={(event) => handleNodeClick(event, node, isOpen, setIsOpen, onNodeClick, onHighlight)}
        style={{
          cursor: node.children ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {node.children && (isOpen ? 'Collapse' : 'Expand')}
        <span onClick={(event) => handleLeafClick(event, node, onLeafClick, onHighlight)}>
          {node.label}
        </span>
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

SubTreeMenu.propTypes = propTypes.subTreeMenu;

export default SubTreeMenu;
