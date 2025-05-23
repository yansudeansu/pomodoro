import { describe, it, expect } from 'vitest';
import React from 'react';
import { AppIcons } from './Icons';

describe('AppIcons', () => {
  it('includes all expected icon keys', () => {
    const expectedKeys = [
      'trash',
      'add',
      'remove',
      'sparkle',
      'sparkles',
      'info',
      'brain',
      'calendar',
      'split',
      'link',
      'chevronDown',
      'chevronUp',
      'close',
      'chart',
      'moreHorizontal',
      'skip',
      'status',
    ];
    expect(Object.keys(AppIcons).sort()).toEqual(expectedKeys.sort());
  });

  it('each icon is a valid React component', () => {
    Object.values(AppIcons).forEach((IconComponent) => {
      const el = React.createElement(IconComponent);
      expect(React.isValidElement(el)).toBe(true);
    });
  });
});
