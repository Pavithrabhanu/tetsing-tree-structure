import { useState, useCallback } from 'react';
import { handleHighlight } from '../utils/treeUtils';
import { getAdditionalData } from '../utils/fetchAdditionalData';
//custom hook to manage the tree behaviour state
export const useTreeNode = (node, onHighlight, onClick) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [dataError, setDataError] = useState(false);

  const toggleNode = useCallback(async () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    onClick(node.id, newOpenState);

    if (node.children) {
      handleHighlight(node, newOpenState, onHighlight);
    } else {
      if (!showAdditionalData) {
        await getAdditionalData(node.id, setAdditionalData, setDataError);
      }
      setShowAdditionalData(!showAdditionalData);
    }
  }, [isOpen, node, onClick, onHighlight, showAdditionalData]);

  return {
    isOpen,
    showAdditionalData,
    additionalData,
    dataError,
    toggleNode,
  };
};
