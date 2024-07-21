import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAdditionalData } from '../utils/dynamicApi';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'; // Import Font Awesome icons

// TreeNode component: Represents a node in the tree structure
const TreeNode = ({ node, highlightedNodes, onClick, onHighlight }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [dataError, setDataError] = useState(false);

  // Recursive function to highlight or unhighlight the node and its children
  const handleHighlight = (node, isHighlighted) => {
    onHighlight(node.id, isHighlighted);
    if (node.children) {
      node.children.forEach(child => handleHighlight(child, isHighlighted));
    }
  };

  // Determine if the node or any of its children are highlighted
  const isHighlighted = highlightedNodes.includes(node.id);

  // Function to handle toggle actions (expand/collapse or fetch/show additional data)
  const handleToggle = async () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    onClick(node.id, newOpenState);

    if (node.children) {
      // If the node has children, only highlight the node and its children when it's opened
      if (newOpenState) {
        handleHighlight(node, true); // Highlight the node and its children
      } else {
        handleHighlight(node, false); // Unhighlight the node and its children
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
          {node.children.map(child => (
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
          {dataError ? <p>No data available</p> : <div className="description">{additionalData?.description || 'No description available'}</div>}
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
