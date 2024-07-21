// src/components/TreeNode/TreeNode.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TreeNode from './TreeNode';

const sampleNode = {
  id: '1',
  label: 'Parent Node',
  children: [
    {
      id: '2',
      label: 'Child Node 1',
      children: [
        {
          id: '3',
          label: 'Sub Child Node 1',
        },
      ],
    },
    {
      id: '4',
      label: 'Child Node 2',
    },
  ],
};

const mockOnClick = jest.fn();
const mockOnHighlight = jest.fn();

describe('TreeNode Component', () => {
  it('renders without crashing', () => {
    render(
      <TreeNode
        node={sampleNode}
        highlightedNodes={[]}
        onClick={mockOnClick}
        onHighlight={mockOnHighlight}
      />
    );
    expect(screen.getByText('Parent Node')).toBeInTheDocument();
  });

  it('toggles children visibility on click', async () => {
    render(
      <TreeNode
        node={sampleNode}
        highlightedNodes={[]}
        onClick={mockOnClick}
        onHighlight={mockOnHighlight}
      />
    );

    const parentNode = screen.getByText('Parent Node');
    fireEvent.click(parentNode);

    expect(mockOnClick).toHaveBeenCalledWith('1', true);
    expect(screen.getByText('Child Node 1')).toBeInTheDocument();
    expect(screen.getByText('Child Node 2')).toBeInTheDocument();

    fireEvent.click(parentNode);

    expect(mockOnClick).toHaveBeenCalledWith('1', false);
    expect(screen.queryByText('Child Node 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child Node 2')).not.toBeInTheDocument();
  });

  it('highlights node and children on open', async () => {
    render(
      <TreeNode
        node={sampleNode}
        highlightedNodes={['1', '2']}
        onClick={mockOnClick}
        onHighlight={mockOnHighlight}
      />
    );

    const parentNode = screen.getByText('Parent Node');
    fireEvent.click(parentNode);

    expect(mockOnHighlight).toHaveBeenCalledWith('1', true);
    expect(mockOnHighlight).toHaveBeenCalledWith('2', true);

    const childNode1 = screen.getByText('Child Node 1');
    expect(childNode1).toHaveClass('highlighted');
  });

  it('fetches and displays additional data for leaf nodes', async () => {
    const fetchAdditionalData = jest.fn(() =>
      Promise.resolve({ description: 'Sample description' })
    );

    const leafNode = {
      id: '5',
      label: 'Leaf Node',
    };

    render(
      <TreeNode
        node={leafNode}
        highlightedNodes={[]}
        onClick={mockOnClick}
        onHighlight={mockOnHighlight}
        fetchAdditionalData={fetchAdditionalData}
      />
    );

    const leafNodeLabel = screen.getByText('Leaf Node');
    fireEvent.click(leafNodeLabel);

    expect(fetchAdditionalData).toHaveBeenCalledWith('5');
    expect(await screen.findByText('Sample description')).toBeInTheDocument();
  });
});
