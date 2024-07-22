// Highlight for node and subnodes of tree

export const addToHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
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
  
  export const removeFromHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
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
  