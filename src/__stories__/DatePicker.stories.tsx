import * as React from 'react';
import { CalendarPicker, DatePicker, DesktopDatePicker } from '@mui/lab';
import { Box, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersCalendar from '@mui/lab/CalendarPicker/PickersCalendar';
import { useCalendarState } from '@mui/lab/CalendarPicker/useCalendarState';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

export const standard = () => {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <>
      <Box mb={6}>
        <p>Default `DatePicker` component.</p>
        <p><code>import DatePicker from '@mui/lab';</code></p>
        <ul>
          <li>"The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop."</li>
          <li>Renders entire component (input, popup calendar with built-in month/year selection).</li>
        </ul>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export const calendarPicker = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <>
      <Box mb={6}>
        <p>Test using the <a href="https://mui.com/components/date-picker/#sub-components"><code>CalendarPicker</code></a> sub-component.</p>
        <p><code>import CalendarPicker from '@mui/lab';</code></p>
        <ul>
          <li>Allows rendering calendar view independently but includes built-in month/year selection.</li>
          <li>If this option is accessible, can we compromise on the design and use the built-in month/year selection?</li>
        </ul>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </LocalizationProvider>
    </>
  );
};

const TestCalendar = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    isDateDisabled,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd,
  } = useCalendarState({
    date,
    // defaultCalendarMonth: null,
    // reduceAnimations: false,
    // onMonthChange,
    // minDate,
    // maxDate,
    // shouldDisableDate,
    // disablePast,
    // disableFuture,
  });

  console.log({calendarState});

  return (
    <PickersCalendar
      {...calendarState}
      reduceAnimations={false}
      date={date}
      onChange={(newDate) => setDate(newDate)}
      currentMonth={calendarState.currentMonth}
      isDateDisabled={() => false}
      autoFocus={true}
      onMonthSwitchingAnimationEnd={onMonthSwitchingAnimationEnd}
      onFocusedDayChange={changeFocusedDay}
      // loading={true}
      // renderLoading={() => <>loading...</>}
    />
  );
}

export const CalendarStandalone = () => {
  return (
    <>
      <Box mb={6}>
        <p>Standalone calendar test using <code>PickersCalendar</code> and <code>useCalendarState</code> (from <a href="https://mui.com/components/date-picker/#sub-components">CalendarPicker</a> sub-component).</p>
        <p><code>import PickersCalendar from '@mui/lab/CalendarPicker/PickersCalendar';</code></p>
        <p><code>import useCalendarState from '@mui/lab/CalendarPicker/useCalendarState';</code></p>
        <ul>
          <li>Lower level (undocumented?) calendar view component without built-ins and state handling.</li>
          <li>This would allow the flexibility we need for the month/year select inputs but with the additional complexity of handling state on our end.</li>
        </ul>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TestCalendar />
      </LocalizationProvider>
    </>
  );
};

const InputBase = (props: TextFieldProps) => {
  const { InputProps, ...rest } = props;
  const { endAdornment, ...InputPropsRest } = InputProps || {};
  const iconAdornment = (
    <InputAdornment position="end" sx={{ color: 'inherit' }}>
      <IconButton color="inherit" aria-label="Choose date" onClick={() => console.log('open date picker...')}>
        <span aria-hidden>📅</span>
      </IconButton>
    </InputAdornment>
  );

  return <TextField InputProps={{ endAdornment: iconAdornment, ...InputPropsRest }} {...rest} />
};

const InputTest = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <DesktopDatePicker
      label="Select date"
      value={value}
      minDate={new Date('2017-01-01')}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => <InputBase {...params} />}
    />
  );
};

export const InputStandalone = () => {
  return (
    <>
      <Box mb={6}>
        <p>Standalone input test using `DesktopDatePicker`.</p>
        <p><code>import DesktopDatePicker from '@mui/lab';</code></p>
        <ul>
          <li>There doesn't seem to be a way to use the input field date formating/masking provided though the `DatePicker` in a standalone fashion.</li>
          <li>Due to the input component being provided through DatePicker's `renderInput` prop, we can provide a custom `TextField` with our own `IconButton` adornment to bypass the default functionality.</li>
        </ul>
        <p><small>Note: The calendar emoji is for example sake and logs to the console on click.</small></p>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <InputTest />
      </LocalizationProvider>
    </>
  );
};
