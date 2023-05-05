/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  InputFlexContainer,
  useTheme,
  SvgSearch,
  SvgCloseSmall,
  useSafeContext,
  useId,
  Icon,
  useMergedRefs,
} from '../utils/index.js';
import type {
  IconProps,
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
  InputFlexContainerProps,
} from '../utils/index.js';
import { IconButton } from '../Buttons/IconButton/index.js';
import type { IconButtonProps } from '../Buttons/IconButton/index.js';
import '@itwin/itwinui-css/css/input.css';

const SearchBoxContext = React.createContext<
  | {
      /**
       * Context prop for sizing subcomponents
       */
      size?: 'small' | 'large';
      /**
       * Context prop for disabling subcomponents
       */
      isDisabled?: boolean;
      /**
       * Id to pass to input
       */
      inputId: string;
      setInputId: (inputId: string) => void;
      /**
       * Ref for input subcomponent
       */
      inputRef: React.RefObject<HTMLInputElement>;
      /**
       * Ref for open button subcomponent
       */
      openButtonRef: React.RefObject<HTMLButtonElement>;
      /**
       * Callback for closing expandable searchbox
       */
      onCollapse?: () => void;
      /**
       * Callback for expanding searchbox
       */
      onExpand?: () => void;
      /**
       * Searchbox state
       */
      isExpanded?: boolean;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is expandable.
   * @default false
   */
  expandable?: boolean;
  /**
   * Searchbox state toggle.
   */
  isExpanded?: boolean;
  /**
   * Function that is called on expanding searchbox.
   */
  onExpand?: () => void;
  /**
   * Function that is called on collapsing searchbox.
   */
  onCollapse?: () => void;
  /**
   * Input props when using default searchbox.
   */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  /**
   * Modify size of the searchbox and it's subcomponents.
   */
  size?: 'small' | 'large';
};

const SearchBoxComponent = React.forwardRef((props, ref) => {
  useTheme();

  const {
    size,
    expandable = false,
    isDisabled = false,
    onCollapse: onCollapseProp,
    onExpand: onExpandProp,
    isExpanded: isExpandedProp,
    children,
    inputProps,
    className,
    ...rest
  } = props;

  const uid = useId();
  const [inputId, setInputId] = React.useState(uid);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const openButtonRef = React.useRef<HTMLButtonElement>(null);

  const [localExpanded, setLocalExpanded] = React.useState(isExpandedProp);

  const isExpanded = isExpandedProp ?? localExpanded;

  const onCollapse = () => {
    setLocalExpanded(false);
    onCollapseProp?.();
    queueMicrotask(() => openButtonRef.current?.focus({ preventScroll: true }));
  };

  const onExpand = () => {
    setLocalExpanded(true);
    onExpandProp?.();
    queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  };

  return (
    <SearchBoxContext.Provider
      value={{
        size,
        isDisabled,
        onCollapse,
        onExpand,
        inputRef,
        inputId,
        setInputId,
        openButtonRef,
        isExpanded,
      }}
    >
      <InputFlexContainer
        ref={ref}
        className={cx({ 'iui-expandable-searchbox': expandable }, className)}
        data-iui-size={size}
        isDisabled={isDisabled}
        data-iui-expanded={isExpanded}
        {...rest}
      >
        {children ?? (
          <>
            <SearchBoxCollapsedState>
              <SearchBoxExpandButton />
            </SearchBoxCollapsedState>

            <SearchBoxExpandedState>
              <SearchBoxInput {...inputProps} />

              {expandable ? <SearchBoxCollapseButton /> : <SearchBoxIcon />}
            </SearchBoxExpandedState>
          </>
        )}
      </InputFlexContainer>
    </SearchBoxContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  SearchBoxOwnProps & InputFlexContainerProps
>;

export type SearchBoxProps = PolymorphicComponentProps<
  'div',
  SearchBoxOwnProps & InputFlexContainerProps
>;

// ----------------------------------------------------------------------------

const SearchBoxCollapsedState = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { isExpanded } = useSafeContext(SearchBoxContext);
  return <>{isExpanded ? null : children ?? <SearchBoxExpandButton />}</>;
};
SearchBoxCollapsedState.displayName = 'SearchBox.CollapsedState';

// ----------------------------------------------------------------------------

const SearchBoxExpandedState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isExpanded } = useSafeContext(SearchBoxContext);
  return <>{isExpanded ? children : null}</>;
};
SearchBoxExpandedState.displayName = 'SearchBox.ExpandedState';

// ----------------------------------------------------------------------------
export type SearchBoxIconProps = PolymorphicComponentProps<'span', IconProps>;

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const { size: sizeContext } = useSafeContext(SearchBoxContext);

  return (
    <Icon
      aria-hidden
      className={cx('iui-search-icon', className)}
      size={sizeContext}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;

// ----------------------------------------------------------------------------

export type SearchBoxInputProps = React.ComponentProps<'input'>;

const SearchBoxInput = React.forwardRef(
  (props: SearchBoxInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { className, id: idProp, ...rest } = props;

    const { inputId, setInputId, isDisabled, inputRef } =
      useSafeContext(SearchBoxContext);

    React.useEffect(() => {
      if (idProp && idProp !== inputId) {
        setInputId(idProp);
      }
    }, [idProp, inputId, setInputId]);

    return (
      <input
        id={idProp ?? inputId}
        ref={useMergedRefs(ref, inputRef)}
        role='searchbox'
        type='text'
        className={cx('iui-search-input', className)}
        disabled={isDisabled}
        {...rest}
      />
    );
  },
);

// ----------------------------------------------------------------------------
export type SearchBoxButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxButton = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { size: sizeContext, isDisabled } = useSafeContext(SearchBoxContext);

  return (
    <IconButton
      styleType='borderless'
      size={sizeContext}
      ref={ref}
      disabled={isDisabled}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------
export type SearchBoxCloseButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxCollapseButton = React.forwardRef((props, ref) => {
  const { children, onClick: onClickProp, ...rest } = props;

  const {
    onCollapse,
    size: sizeContext,
    isDisabled,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={ref}
      aria-label='Close searchbox'
      size={sizeContext}
      disabled={isDisabled}
      onClick={(e) => {
        onClickProp?.(e);
        if (e.isDefaultPrevented()) {
          return;
        }
        onCollapse?.();
      }}
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
// ----------------------------------------------------------------------------
export type SearchBoxOpenButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxExpandButton = React.forwardRef((props, ref) => {
  const { children, className, onClick: onClickProp, ...rest } = props;

  const {
    onExpand,
    size: sizeContext,
    isDisabled,
    openButtonRef,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={useMergedRefs(ref, openButtonRef)}
      className={cx('iui-searchbox-open-button', className)}
      aria-label='Expand searchbox'
      size={sizeContext}
      disabled={isDisabled}
      onClick={(e) => {
        onClickProp?.(e);
        if (e.isDefaultPrevented()) {
          return;
        }
        onExpand?.();
      }}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * Searchbox component.
 * @example
 *  <Searchbox inputProps={{ placeholder: 'Basic search' }}/>
 *
 * @example
 * <SearchBox expandable inputProps={{ placeholder: 'Expandable search' }}/>
 */
export const SearchBox = Object.assign(SearchBoxComponent, {
  /**
   * Icon to be placed within Searchbox.
   * @default Looking glass icon
   */
  Icon: SearchBoxIcon,
  /**
   * Input to be placed within Searchbox
   */
  Input: SearchBoxInput,
  /**
   * Button to be placed within Searchbox. Default has looking glass icon.
   */
  Button: SearchBoxButton,
  /**
   * Close button for expandable Searchbox. Clicking on this button will collapse Searchbox.
   */
  CollapseButton: SearchBoxCollapseButton,
  /**
   * Open button for expandable Searchbox. Clicking on this will expand Searchbox.
   */
  ExpandButton: SearchBoxExpandButton,
  /**
   * Subcomponent to customise expanded state of the SearchBox
   */
  ExpandedState: SearchBoxExpandedState,
  /**
   * Subcomponent to customise collapsed state.
   */
  CollapsedState: SearchBoxCollapsedState,
});

export default SearchBox;
