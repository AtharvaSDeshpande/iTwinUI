import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DatePicker, IconButton } from '../../src/core';
import {
  DatePickerProps,
  generateLocalizedStrings,
} from '../../src/core/DatePicker/DatePicker';
import { SvgCalendar } from '@bentley/icons-generic-react';

export default {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: { component: 'Date picker component to select a date.' },
    },
  },
  argTypes: {
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    date: { control: 'date' },
    setFocus: { defaultValue: true },
  },
} as Meta<DatePickerProps>;

export const Basic: Story<DatePickerProps> = (args) => {
  const { date = new Date(), setFocus = true, localizedNames } = args;
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  useEffect(() => {
    setCurrentDate(new Date(date));
    return () => action('', { clearOnStoryChange: true })();
  }, [date]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)}>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <DatePicker
          date={currentDate}
          onChange={onChange}
          style={{ display: 'block' }}
          localizedNames={localizedNames}
          setFocus={setFocus}
        />
      )}
    </>
  );
};

Basic.args = {
  date: new Date(),
};

export const Localized: Story<DatePickerProps> = (args) => {
  const {
    date = new Date(),
    setFocus = true,
    localizedNames = generateLocalizedStrings('ja'),
  } = args;
  const [opened, setOpened] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const onChange = (date: Date) => {
    setCurrentDate(date);
    action(`New date value: ${date}`, { clearOnStoryChange: false })();
  };

  useEffect(() => {
    setCurrentDate(new Date(date));
    return () => action('', { clearOnStoryChange: true })();
  }, [date]);
  return (
    <>
      <IconButton onClick={() => setOpened(!opened)}>
        <SvgCalendar />
      </IconButton>
      <span style={{ marginLeft: 16 }}>{currentDate.toString()}</span>
      {opened && (
        <DatePicker
          date={currentDate}
          onChange={onChange}
          style={{ display: 'block' }}
          localizedNames={localizedNames}
          setFocus={setFocus}
        />
      )}
    </>
  );
};

Localized.args = {
  date: new Date(),
  localizedNames: generateLocalizedStrings('ja'),
};
