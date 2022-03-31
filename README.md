# MUI v5 DatePicker

## Input Field

| Component   | Built-in? | Replacable? | Other? |
| ----------- | --------- | ----------- | ------ |
| Input       | yes       | yes         | -      |
| Icon button | yes       | yes         | -      |
| Masking     | yes       | yes         | -      |
| Formatting  | yes       | yes         | -      |

## Month/Year Selection

| Component              | Built-in? | Replacable? | Other?          |
| ---------------------- | --------- | ----------- | --------------- |
| Year select input      | no        | no          | -               |
| Month select input     | no        | no          | (same as above) |
| Month prev/next arrows | yes       | yes         | -               |

## Calendar View

Various options...

### DatePicker

> The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.

Renders entire component (input, popup calendar with built-in month/year selection).

### StaticDatePicker

> It's possible to render any date picker without the modal/popover and text field.
> This can be helpful when building custom popover/modal containers.

Allows rendering calendar view independently but still includes built-in month/year selection.

### PickersCalendar

Lower level (undocumented?) calendar view component without built-ins and state handling.

This would allow the flexibility we need for the month/year select inputs but with the additional complexity of handling state on our end.

## Keyboard AX

- Open calendar by focusing on input, then select icon button.
- Initial focus is set on current day.
- Change day with arrow keys.
- Tab to: Year selection - 4-wide select grid.
- Tab to: Month selection - prev/next arrows.
- Tab to: Current day (only when visible).
- Changing month with arrows seems to disabled day selection (focus may need to be reset on blur).

## Localization

> This component relies on the date management library of your choice. It supports date-fns, luxon, dayjs, moment and any other library via a public dateAdapter interface.

### Jalali Calendar System

Supported when using date-fns library.

> Install date-fns-jalali and use @date-io/date-fns-jalali adapter to support Jalali calendar.

## Questions

- Can we compromise on design (use month/year selection as provided from MUI) if component is accessible as is?
- Can the input component be used standalone? This would be needed if we use `PickersCalendar` standalone to customize month/year selection.

## General 3rd Party Questions

- What date management library are products using?
  - `Moment` (along with `cldr-data` and `globalize` for date formatting in Collab)
- Is only providing support for date-fns (react date picker) or dayjs (mantine) an option?
- Is Jalali support a requirement?
