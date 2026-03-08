import { createStorageAtomWithEffect, initializeFromStorage } from './jotai-utils';

export const USER_BUBBLE_THEME_STORAGE_KEY = 'userBubbleTheme';
export const DEFAULT_USER_BUBBLE_THEME = 'default';

export const USER_BUBBLE_THEMES = [
  DEFAULT_USER_BUBBLE_THEME,
  'blue',
  'green',
  'yellow',
  'pink',
  'orange',
  'purple',
] as const;

export type UserBubbleTheme = (typeof USER_BUBBLE_THEMES)[number];

const validUserBubbleThemes = new Set<string>(USER_BUBBLE_THEMES);

export function applyUserBubbleTheme(theme: UserBubbleTheme | string): void {
  const root = document.documentElement;

  if (!validUserBubbleThemes.has(theme) || theme === DEFAULT_USER_BUBBLE_THEME) {
    delete root.dataset.userBubbleTheme;
    return;
  }

  root.dataset.userBubbleTheme = theme;
}

export const userBubbleThemeAtom = createStorageAtomWithEffect<UserBubbleTheme>(
  USER_BUBBLE_THEME_STORAGE_KEY,
  DEFAULT_USER_BUBBLE_THEME,
  applyUserBubbleTheme,
);

export function initializeUserBubbleTheme(): void {
  initializeFromStorage(
    USER_BUBBLE_THEME_STORAGE_KEY,
    DEFAULT_USER_BUBBLE_THEME,
    applyUserBubbleTheme,
  );
}
