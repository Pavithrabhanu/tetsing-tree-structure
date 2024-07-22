import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaCaretDown, FaCaretUp, FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { useTreeNode } from '../hooks/useTreeNode';

const TreeNode = ({ node, highlightedNodes, onClick, onHighlight }) => {
  const {
    isOpen,
    showAdditionalData,
    additionalData,
    dataError,
    toggleNode,
  } = useTreeNode(node, onHighlight, onClick);

  const isHighlighted = highlightedNodes.includes(node.id);

  return (
    <div className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}>
      <div
        className={`node-label ${node.children ? 'parent-node' : 'leaf-node'} ${isOpen ? 'text-highlight' : ''}`}
        onClick={toggleNode}
        title={node.label} // Add tooltip here
      >
        {node.children ? (
          <span className="toggle-icon" aria-label={isOpen ? 'Collapse' : 'Expand'}>
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        ) : (
          <span className="leaf-icon" aria-label={isOpen ? 'Open' : 'Closed'}>
            {isOpen ? <FaArrowDown size={12} /> : <FaArrowRight size={12} />}
          </span>
        )}
        <span className={`node-label-text ${isOpen ? 'bold-text' : ''}`}>{node.label}</span>
      </div>
      {node.children && isOpen && (
        <div className={`children ${isOpen ? 'text-highlight' : ''}`}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              highlightedNodes={highlightedNodes}
              onClick={onClick}
              onHighlight={onHighlight}
            />
          ))}
        </div>
      )}
      {!node.children && showAdditionalData && (
        <div className="additional-data">
          {dataError ? (
            <p>No data available</p>
          ) : (
            <div className="description">
              {additionalData?.description || 'No description available'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  }).isRequired,
  highlightedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  onHighlight: PropTypes.func.isRequired,
};

export default memo(TreeNode);
