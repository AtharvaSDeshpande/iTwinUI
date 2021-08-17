/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Badge } from './Badge';
import { SoftBackgrounds } from '../utils/common';

beforeAll(() => {
  window.CSS = { supports: () => true, escape: (i) => i };
});

it('should render in its most basic state', () => {
  const { container } = render(<Badge>label</Badge>);
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe('label');
  expect(badge.title).toBeFalsy();
});

it('should set inline background color correctly', () => {
  const { container } = render(<Badge backgroundColor='skyblue'>label</Badge>);

  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge.textContent).toBe('label');
  expect(badge.style.getPropertyValue('--badge-color')).toEqual(
    SoftBackgrounds.skyblue,
  );
});

it.each([
  ['primary', '#A5D7F5'],
  ['positive', '#C3E1AF'],
  ['negative', '#EFA9A9'],
  ['warning', '#F9D7AB'],
])('should render %s status badge', (key, value) => {
  const { container } = render(<Badge backgroundColor={key}>label</Badge>);
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge.textContent).toBe('label');
  expect(badge.style.getPropertyValue('--badge-color')).toEqual(value);
});

it('should work with custom colors', () => {
  const { container } = render(<Badge backgroundColor={'pink'}>label</Badge>);
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge.textContent).toBe('label');
  expect(badge.style.getPropertyValue('--badge-color')).toEqual('pink');
});

it('should add className and style correctly', () => {
  const { container } = render(
    <Badge
      backgroundColor='skyblue'
      className='test-class'
      style={{ color: 'grey' }}
    >
      label
    </Badge>,
  );
  const badge = container.querySelector('.iui-badge.test-class') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.style.color).toBe('grey');
});

it('should work with long labels', () => {
  const label = 'Long label that gets truncated';
  const { container } = render(
    <Badge backgroundColor='skyblue' title={label}>
      {label}
    </Badge>,
  );
  const badge = container.querySelector('.iui-badge') as HTMLElement;
  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe(label);
  expect(badge.title).toBe(label);
});