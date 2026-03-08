import 'test/localStorage.mock';

import {
  USER_BUBBLE_THEME_STORAGE_KEY,
  applyUserBubbleTheme,
  initializeUserBubbleTheme,
} from './userBubbleTheme';

describe('userBubbleTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.userBubbleTheme;
  });

  it('applies and clears the root data attribute', () => {
    applyUserBubbleTheme('purple');
    expect(document.documentElement.dataset.userBubbleTheme).toBe('purple');

    applyUserBubbleTheme('default');
    expect(document.documentElement.dataset.userBubbleTheme).toBeUndefined();

    applyUserBubbleTheme('invalid');
    expect(document.documentElement.dataset.userBubbleTheme).toBeUndefined();
  });

  it('initializes from persisted storage', () => {
    window.localStorage.setItem(USER_BUBBLE_THEME_STORAGE_KEY, JSON.stringify('blue'));

    initializeUserBubbleTheme();

    expect(document.documentElement.dataset.userBubbleTheme).toBe('blue');
  });
});
