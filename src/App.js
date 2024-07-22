import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTreeData, setHighlightedNodes } from './redux/treeSlice';
import { loadTreeData } from './utils/treeUtils';
import { addToHighlightedNodes, removeFromHighlightedNodes } from './utils/highlightUtils';
import ThemeToggle from './components/ThemeToggle';
import './dist/styles.css';

const TreeMenu = lazy(() => import('./components/TreeMenu'));

const App = () => {
  const dispatch = useDispatch();
  const treeData = useSelector((state) => state.tree.treeData);
  const additionalData = useSelector((state) => state.tree.additionalData);
  const highlightedNodes = useSelector((state) => state.tree.highlightedNodes);
  const theme = useSelector((state) => state.tree.theme);

  useEffect(() => {
    loadTreeData(dispatch, setTreeData);
  }, [dispatch]);

  const handleNodeClick = (nodeId, isOpening) => {
    const newHighlightedNodes = new Set(highlightedNodes);
    if (isOpening) {
      addToHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    } else {
      removeFromHighlightedNodes(treeData, nodeId, newHighlightedNodes);
    }
    dispatch(setHighlightedNodes([...newHighlightedNodes]));
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle />
      <div className="main-container-parent">
        <h1>Dynamic Tree Structure</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TreeMenu items={treeData} onClick={handleNodeClick} />
        </Suspense>
      </div>
      <div className="additional-data-container">
        {additionalData && (
          <div className="additional-data">
            <h2>Additional Data:</h2>
            <div className="description">
              {additionalData.description || 'No description available'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
