/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  SvgStatusErrorHollow,
  SvgStatusSuccessHollow,
} from '@itwin/itwinui-icons-react';
import React from 'react';
import { ProgressLinear, Icon } from '@itwin/itwinui-react';

export default {
  title: 'ProgressLinear',
};

export const Determinate = () => {
  return <ProgressLinear value={50} />;
};

export const DeterminateAnimated = () => {
  return <ProgressLinear value={50} isAnimated />;
};

export const Indeterminate = () => {
  return <ProgressLinear indeterminate />;
};

export const LabeledCenter = () => {
  return <ProgressLinear value={50} labels={['Centered Label']} />;
};

export const LabeledLeftRight = () => {
  return <ProgressLinear value={50} labels={['Loading...', '50%']} />;
};

export const Positive = () => {
  return (
    <ProgressLinear
      value={100}
      labels={[
        'Upload done!',
        <Icon key='icon'>
          <SvgStatusSuccessHollow />
        </Icon>,
      ]}
      status='positive'
    />
  );
};

export const Negative = () => {
  return (
    <ProgressLinear
      value={45}
      labels={[
        'Upload failed',
        <Icon key='icon'>
          <SvgStatusErrorHollow />
        </Icon>,
      ]}
      status='negative'
    />
  );
};
