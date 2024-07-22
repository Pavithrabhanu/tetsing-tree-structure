import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAdditionalData } from '../utils/dynamicApi';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const TreeNode = ({ node, highlightedNodes, onClick, onHighlight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [dataError, setDataError] = useState(false);

  const handleHighlight = (node, isHighlighted) => {
    onHighlight(node.id, isHighlighted);
    if (node.children) {
      node.children.forEach((child) => handleHighlight(child, isHighlighted));
    }
  };

  const isHighlighted = highlightedNodes.includes(node.id);

  const handleToggle = async () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    onClick(node.id, newOpenState);

    if (node.children) {
      if (newOpenState) {
        handleHighlight(node, true);
      } else {
        handleHighlight(node, false);
      }
    } else {
      if (!showAdditionalData) {
        try {
          const data = await fetchAdditionalData(node.id);
          setAdditionalData(data || null);
          setDataError(!data);
        } catch {
          setAdditionalData(null);
          setDataError(true);
        }
      }
      setShowAdditionalData(!showAdditionalData);
    }
  };

  return (
    <div className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}>
      <div
        className={`node-label ${node.children ? 'parent-node' : 'leaf-node'} ${isOpen ? 'text-highlight' : ''}`}
        onClick={handleToggle}
      >
        {node.children && (
          <span className="toggle-icon">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        )}
        <span className={`node-label-text ${isOpen ? 'bold-text' : ''}`}>{node.label}</span>
      </div>
      {node.children && isOpen && (
        <div className={`children ${isOpen ? 'text-highlight' : ''}`}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id} // Ensure each TreeNode has a unique key
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

export default TreeNode;
