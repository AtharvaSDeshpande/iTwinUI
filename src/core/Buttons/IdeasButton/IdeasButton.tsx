import React from 'react';

import '@bentley/itwinui/css/buttons.css';
import { SvgSmileyHappy2 } from '@bentley/icons-generic-react';

export type IdeasButtonProps = {
  /**
   * On click handler.
   */
  onClick?: () => void;
  /**
   * Localize 'Feedback' label if needed.
   * @default 'Feedback'
   */
  feedbackLabel?: string;
};
/**
 * Ideas button
 * @example
 * <IdeasButton />
 */
export const IdeasButton = React.forwardRef<
  HTMLButtonElement,
  IdeasButtonProps
>((props, ref) => {
  const { feedbackLabel = 'Feedback', onClick } = props;

  return (
    <button
      ref={ref}
      className='iui-buttons-idea'
      onClick={onClick}
      type='button'
    >
      <SvgSmileyHappy2 className='iui-buttons-icon' />
      {feedbackLabel}
    </button>
  );
});

export default IdeasButton;
