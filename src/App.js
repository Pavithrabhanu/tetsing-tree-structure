import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import ParentNode from './components/TreeMenu';
import ThemeToggle from './components/ThemeToggle';
import { fetchTreeData, fetchAdditionalData } from './utils/dynamicApi';
import { setTreeData, setAdditionalData, setHighlightedNodes } from './redux/actions';
// import './App.css';
// import './ThemeToggle.css';
// import './TreeMenu.css';
import '../src/dist/styles.css';
import TreeMenu from './components/TreeMenu';

const App = () => {
  // Use dispatch to send actions to the Redux store
  const dispatch = useDispatch();
  
  // Access tree data, additional data, highlighted nodes, and current theme from the Redux store
  const treeData = useSelector((state) => state.treeData);
  const additionalData = useSelector((state) => state.additionalData);
  const highlightedNodes = useSelector((state) => state.highlightedNodes);
  const theme = useSelector((state) => state.theme);

  // Effect to load tree data when the component mounts
  useEffect(() => {
    const loadTreeData = async () => {
      const data = await fetchTreeData();
      dispatch(setTreeData(data));
    };

    loadTreeData();
  }, [dispatch]); 

  // Handler for node click events
  const handleNodeClick = (nodeId, isOpening) => {
    const newHighlightedNodes = new Set(highlightedNodes);
    if (isOpening) {
      addToHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    } else {
      removeFromHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    }
    dispatch(setHighlightedNodes([...newHighlightedNodes]));
  };

  // Function to add nodes and their children to the highlighted set
  const addToHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
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

  // Function to remove nodes and their children from the highlighted set
  const removeFromHighlightedNodes = (nodes, targetNodeId, highlightedSet) => {
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

  // Handler for leaf node click events
  // const handleLeafClick = async (nodeId) => {
  //   try {
  //     const data = await fetchAdditionalData(nodeId);
  //     dispatch(setAdditionalData(data));
  //   } catch (error) {
  //     dispatch(setAdditionalData(null)); 
  //   }
  // };

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle />
      <div className='main-container-parent'>
        <h1>Dynamic Tree Structure</h1>
        <TreeMenu
          items={treeData}
          highlightedNodes={highlightedNodes}
          onClick={handleNodeClick}
        />
      </div>
      <div className="additional-data-container">
        {additionalData && (
          <div className="additional-data">
            <h2>Additional Data:</h2>
            <div className="description">{additionalData.description || 'No description available'}</div>
          </div>
       )  //  : (
        //   <p>No additional data or node not clicked.</p>
        // )
        }
      </div>
    </div>
  );
};

export default App;
