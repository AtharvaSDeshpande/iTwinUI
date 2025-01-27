/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ProgressLinear } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 200px)' }}>
      <ProgressLinear indeterminate />
    </div>
  );
};
