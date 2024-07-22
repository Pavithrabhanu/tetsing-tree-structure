import { fetchTreeData } from './dynamicApi';

export const loadTreeData = async (dispatch, setTreeData) => {
  const data = await fetchTreeData();
  dispatch(setTreeData(data));
};

//Handle click on tree node to toggle and highlight node
export const handleNodeClick = (event, node, isOpen, setIsOpen, onNodeClick, onHighlight) => {
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
  
  //  Handles clicks on a leaf node and highlights it.
  export const handleLeafClick = (event, node, onLeafClick, onHighlight) => {
    event.stopPropagation();
    if (!node.children) {
      onLeafClick(node.id);
      onHighlight(node.id);
    }
  };
  
  //Checks if a node or its children are highlighted. 
  export const isNodeHighlighted = (highlightedNodeId, node) => {
    return highlightedNodeId && (node.id === highlightedNodeId || node.children?.some(child => child.id === highlightedNodeId));
  };
 // Manages the state of highlighted nodes
  export const handleTreeNodeClick = (id, isOpen, treeId, onClick, setHighlightedNodeIdMap) => {
    onClick(id, isOpen);
    setHighlightedNodeIdMap((prevMap) => ({
      ...prevMap,
      [treeId]: id,
    }));
  };
  
  //Handles highlighting and unhighlighting of nodes.

  export const handleHighlight = (nodeId, isHighlighted, setHighlightedNodes) => {
    setHighlightedNodes((prev) => {
      if (isHighlighted) {
        return [...prev, nodeId];
      } else {
        return prev.filter((id) => id !== nodeId);
      }
    });
  };
  
//   export const handleTreeNodeHighlight = (node, isHighlighted, onHighlight) => {
//     onHighlight(node.id, isHighlighted);
//     if (node.children) {
//       node.children.forEach((child) => handleHighlight(child, isHighlighted, onHighlight));
//     }
//   };
  