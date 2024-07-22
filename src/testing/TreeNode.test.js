import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeNode from '../components/TreeNode'; // Adjust the path as needed

// Test cases for TreeNode component
describe('TreeNode Component', () => {
  test('displays all children when node is expanded', () => {
    // Sample node data with children
    const nodeWithChildren = {
      id: '1',
      label: 'Parent Node',
      children: [
        { id: '1-1', label: 'Child Node 1' },
        { id: '1-2', label: 'Child Node 2' },
      ],
    };

    // Render the TreeNode component
    render(
      <TreeNode
        node={nodeWithChildren}
        highlightedNodes={[]}
        onClick={() => {}}
        onHighlight={() => {}}
      />
    );

    // Check that child nodes are not visible initially
    expect(screen.queryByText('Child Node 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child Node 2')).not.toBeInTheDocument();

    // Simulate a click to expand the parent node
    fireEvent.click(screen.getByText('Parent Node'));

    // Check that child nodes are now visible
    expect(screen.getByText('Child Node 1')).toBeInTheDocument();
    expect(screen.getByText('Child Node 2')).toBeInTheDocument();
  });
});
