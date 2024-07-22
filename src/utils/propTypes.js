import PropTypes from 'prop-types';

// Define node shape once and reuse it
const nodeShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
});

const treeNodeShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.array,
});

const propTypes = {
  treeNode: treeNodeShape,
  treeMenu: {
    items: PropTypes.arrayOf(treeNodeShape).isRequired,
    onClick: PropTypes.func.isRequired,
  },
  subTreeMenu: {
    node: nodeShape.isRequired,
    highlightedNodeId: PropTypes.string,
    onNodeClick: PropTypes.func.isRequired,
    onLeafClick: PropTypes.func.isRequired,
    onHighlight: PropTypes.func.isRequired,
  },
};

export default propTypes;
