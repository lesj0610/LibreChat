import React from 'react';
import { Provider, createStore } from 'jotai';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import 'test/localStorage.mock';
import 'test/matchMedia.mock';
import { UserBubbleThemeSelector } from './General';
import { USER_BUBBLE_THEME_STORAGE_KEY } from '~/store/userBubbleTheme';

const renderSelector = () => {
  const store = createStore();

  return render(
    <RecoilRoot>
      <Provider store={store}>
        <UserBubbleThemeSelector portal={false} />
      </Provider>
    </RecoilRoot>,
  );
};

describe('UserBubbleThemeSelector', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.userBubbleTheme;

    global.ResizeObserver = class MockedResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };
  });

  it('renders with the default option selected', () => {
    const { getByText, getByTestId } = renderSelector();

    expect(getByText('Chat color')).toBeInTheDocument();
    expect(getByTestId('user-bubble-theme-selector')).toHaveTextContent('Default');
  });

  it('updates the selection, storage, and root dataset', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = renderSelector();

    await user.click(getByTestId('user-bubble-theme-selector'));
    await user.click(getByRole('option', { name: 'Purple' }));

    await waitFor(() => {
      expect(getByTestId('user-bubble-theme-selector')).toHaveTextContent('Purple');
      expect(document.documentElement.dataset.userBubbleTheme).toBe('purple');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        USER_BUBBLE_THEME_STORAGE_KEY,
        JSON.stringify('purple'),
      );
    });
  });
});
