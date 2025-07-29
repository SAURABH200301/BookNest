/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  // better for simulating user interactions
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  const mockSetOpenSignInModal = jest.fn();

  beforeEach(() => {
    mockSetOpenSignInModal.mockClear();
  });

  test('renders Favorites menu item', () => {
    render(<Navbar setOpenSignInModal={mockSetOpenSignInModal} />);
    const favoriteElement = screen.getAllByText(/favorites/i)[0]; // it appears twice (desktop/mobile)
    expect(favoriteElement).toBeInTheDocument();
  });

  test('renders user settings in menu when avatar is clicked', async () => {
    render(<Navbar setOpenSignInModal={mockSetOpenSignInModal} />);

    const avatarButton = screen.getByRole('button', { name: /open settings/i });
    expect(avatarButton).toBeInTheDocument();

    // open user menu inside act
    await act(async () => {
      await userEvent.click(avatarButton);
    });

    // User Settings should appear
    for (const setting of ['Profile', 'Account', 'SignIn', 'Logout']) {
      expect(screen.getByText(setting)).toBeInTheDocument();
    }
  });

  test('calls setOpenSignInModal when SignIn setting is clicked', async () => {
    render(<Navbar setOpenSignInModal={mockSetOpenSignInModal} />);

    const avatarButton = screen.getByRole('button', { name: /open settings/i });
    await act(async () => {
      await userEvent.click(avatarButton);
    });

    const signInMenuItem = screen.getByText('SignIn');
    await act(async () => {
      await userEvent.click(signInMenuItem);
    });

    expect(mockSetOpenSignInModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenSignInModal).toHaveBeenCalledWith(true);
  });

  test('opens and closes navigation menu on mobile icon button click', async () => {
    render(<Navbar setOpenSignInModal={mockSetOpenSignInModal} />);

    // The navigation menu icon button is labeled 'menu' (aria-label)
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();

    // click to open menu inside act
    await act(async () => {
      await userEvent.click(menuButton);
    });

    // Check that the Favorites menuitem is visible in opened menu
    const menuItem = screen.getAllByText(/favorites/i)[0]; // menu has Favorites item
    expect(menuItem).toBeVisible();

    // click menu item to close the menu inside act
    await act(async () => {
      await userEvent.click(menuItem);
    });

    // You can optionally test menu closed state here if you have a way to detect it
  });
});
