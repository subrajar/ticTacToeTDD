import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './App';

describe('Game', () => {
  it('renders without errors', () => {
    render(<Game />);
  });

  it('displays the correct initial status message', () => {
    const { getByText } = render(<Game />);
    const text = getByText('Next player: X');
    expect(text).toBeInTheDocument();
  });


  it('displays the correct winner message', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    const statusElement = getByText('Winner: X');
    expect(statusElement).toBeInTheDocument();
  });

  it('allows jumping to a specific move', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');
    const moves = getByText('Go to move #2');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(moves);

    const statusElement = getByText('Next player: O');
    expect(statusElement).toBeInTheDocument();
  });

});
