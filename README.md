# Modern Gantt v2.0.1 — Complete Reference Guide

**Author:** Kashyap Makadia  
**Version:** 2.0.1  
**Plugin Type:** Dependency-free JavaScript Gantt chart  
**Sample Context:** Microsoft-style event calendar  
**Default Example Hierarchy:** Country → City → Event

---

## 1. Overview

Modern Gantt is a dependency-free JavaScript Gantt chart plugin for rendering grouped timeline data from a flat JSON array. It is designed for event, campaign, project, release, roadmap, and scheduling scenarios where timeline items need to be grouped, displayed with configurable labels, and visualized across days, weeks, or months.

Demo : [https://kashyapmak.github.io/Modern-Gantt/] 

The v2.0.1 sample package uses a Microsoft-style event-planning pattern:

```text
Country
  City
    Event
```

Example event categories include:

```text
Microsoft Build
AI Days
Virtual Training Days
Azure Discovery Day
Fabric Community Day
Power Platform Summit
Security Immersion Workshop
Developer Productivity Day
Copilot Adoption Day
Data & AI Roadshow
```

---

## 2. Package Structure

The recommended v2.0.1 package structure is:

```text
Modern-Gantt-v2.0.1
├─ index.html
├─ README.md
├─ manifest.json
├─ features.md
└─ src
   ├─ modern-gantt.css
   ├─ modern-gantt.js
   └─ sample-data-generator.js
```

### File purpose

| File | Purpose |
|---|---|
| `index.html` | Working demo page using Microsoft-style sample data. |
| `README.md` | Complete public documentation and configuration guide. |
| `manifest.json` | Package metadata. |
| `features.md` | Internal feature inventory/reference notes. |
| `src/modern-gantt.css` | Plugin styles, layout, themes, sticky header, and bar styling. |
| `src/modern-gantt.js` | Core ModernGantt plugin. |
| `src/sample-data-generator.js` | Microsoft event sample data generator. |

---

## 3. Quick Start

### 3.1 Add CSS

```html
<link rel="stylesheet" href="src/modern-gantt.css">
```

### 3.2 Add Gantt container

```html
<div id="gantt"></div>
```

### 3.3 Add JavaScript files

```html
<script src="src/sample-data-generator.js"></script>
<script src="src/modern-gantt.js"></script>
```

### 3.4 Initialize ModernGantt

```javascript
const data = generateMicrosoftEventData();

const gantt = new ModernGantt('#gantt', {
  title: 'Microsoft Events Calendar',
  theme: 'green',
  stickyHeader: true,
  data,
  scale: 'months',
  groupBy: [
    { field: 'Country', sort: 'ASC', defaultVisible: true },
    { field: 'City', sort: 'ASC', defaultVisible: true },
    { field: 'Event', sort: 'ASC' }
  ],
  fromField: 'startDate',
  toField: 'endDate',
  labelField: 'Event',
  barText: item => item.EventName,
  tooltipField: 'TooltipText',
  extraColumns: [
    { field: 'Format', title: 'Format', width: '90px' },
    { field: 'Status', title: 'Status', width: '90px' }
  ]
});
```

---

## 4. Complete Demo Example

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Modern Gantt v2.0.1 - Microsoft Events</title>
  <link rel="stylesheet" href="src/modern-gantt.css">
</head>
<body>
  <h1>Modern Gantt v2.0.1 - Microsoft Events</h1>

  <div id="gantt"></div>
  <div id="popup" style="display:none"></div>

  <script src="src/sample-data-generator.js"></script>
  <script src="src/modern-gantt.js"></script>
  <script>
    const data = generateMicrosoftEventData({
      countryCount: 6,
      minCitiesPerCountry: 2,
      maxCitiesPerCountry: 4,
      minEventsPerCity: 3,
      maxEventsPerCity: 7,
      years: [2025, 2026, 2027]
    });

    const gantt = new ModernGantt('#gantt', {
      title: 'Microsoft Events Calendar',
      theme: 'green',
      stickyHeader: true,
      data,
      scale: 'months',
      groupBy: [
        { field: 'Country', sort: 'ASC', defaultVisible: true },
        { field: 'City', sort: 'ASC', defaultVisible: true },
        { field: 'Event', sort: 'ASC' }
      ],
      fromField: 'startDate',
      toField: 'endDate',
      labelField: 'Event',
      barText: item => item.EventName,
      tooltipField: 'TooltipText',
      popupTarget: '#popup',
      popupTemplate: item => `<strong>${item.EventName}</strong><pre>${JSON.stringify(item, null, 2)}</pre>`,
      extraColumns: [
        { field: 'Format', title: 'Format', width: '90px' },
        { field: 'Status', title: 'Status', width: '90px' }
      ],
      onItemClick: item => console.log('Clicked event:', item),
      onRender: (instance, context) => console.log('Rendered:', context),
      onError: (error, context) => console.error('ModernGantt error:', context, error)
    });
  </script>
</body>
</html>
```

---

## 5. Data Model

Modern Gantt expects a flat JavaScript array. The plugin groups the data internally using the `groupBy` configuration.

### 5.1 Microsoft event sample record

```javascript
{
  Country: 'United Kingdom',
  City: 'London',
  Event: 'Microsoft Build',
  EventName: 'Microsoft Build - London',
  Format: 'Hybrid',
  Audience: 'Developers',
  Owner: 'Microsoft Events Team',
  Status: 'Confirmed',
  customClass: 'ganttBlue',
  TooltipText: 'Microsoft Build | London, United Kingdom | Hybrid | Developers',
  startDate: '2026-04-12',
  endDate: '2026-04-19'
}
```

### 5.2 Required fields

At minimum, each Gantt item should include valid start and end date fields.

```javascript
{
  startDate: '2026-04-12',
  endDate: '2026-04-19'
}
```

The date field names are configurable:

```javascript
fromField: 'startDate',
toField: 'endDate'
```

### 5.3 Recommended fields for Microsoft event pattern

| Field | Type | Description |
|---|---:|---|
| `Country` | string | Top-level grouping field. |
| `City` | string | Second-level grouping field. |
| `Event` | string | Event category/name used as lowest-level grouping. |
| `EventName` | string | Display-friendly event label used on Gantt bars. |
| `Format` | string | Event format such as `In-person`, `Virtual`, or `Hybrid`. |
| `Audience` | string | Main audience segment. |
| `Owner` | string | Owner/team responsible for the event. |
| `Status` | string | Planning status. |
| `customClass` | string | CSS class applied to the Gantt bar. |
| `TooltipText` | string | Tooltip text for the event item. |
| `startDate` | date string | Timeline start date. |
| `endDate` | date string | Timeline end date. |

---

## 6. Sample Data Generator

The package includes:

```text
src/sample-data-generator.js
```

It exposes:

```javascript
generateMicrosoftEventData(options)
```

### 6.1 Basic usage

```javascript
const data = generateMicrosoftEventData();
```

### 6.2 Custom usage

```javascript
const data = generateMicrosoftEventData({
  countryCount: 5,
  minCitiesPerCountry: 2,
  maxCitiesPerCountry: 4,
  minEventsPerCity: 3,
  maxEventsPerCity: 6,
  years: [2025, 2026, 2027]
});
```

### 6.3 Generator options

| Option | Default | Type | Description |
|---|---:|---|---|
| `countryCount` | `6` | number | Number of countries included from the built-in country list. |
| `minCitiesPerCountry` | `2` | number | Minimum city count per country. |
| `maxCitiesPerCountry` | `4` | number | Maximum city count per country. |
| `minEventsPerCity` | `3` | number | Minimum event count generated for each city. |
| `maxEventsPerCity` | `7` | number | Maximum event count generated for each city. |
| `years` | `[2025, 2026, 2027]` | number[] | Years across which event dates are distributed. |
| `fromField` | `'startDate'` | string | Name of generated start date field. |
| `toField` | `'endDate'` | string | Name of generated end date field. |
| `minDurationDays` | `2` | number | Minimum event duration. |
| `maxDurationDays` | `21` | number | Maximum event duration. |
| `countries` | built-in list | string[] | Optional country override list. |
| `cityMap` | built-in map | object | Optional country-to-city map. |
| `events` | built-in list | string[] | Optional event name list. |
| `formats` | built-in list | string[] | Optional format list. |
| `audiences` | built-in list | string[] | Optional audience list. |
| `owners` | built-in list | string[] | Optional owner/team list. |
| `statuses` | built-in list | string[] | Optional status list. |
| `classes` | built-in list | string[] | Optional bar CSS class list. |

---

## 7. Grouping

Grouping is configured with `groupBy`.

```javascript
groupBy: [
  { field: 'Country', sort: 'ASC', defaultVisible: true },
  { field: 'City', sort: 'ASC', defaultVisible: true },
  { field: 'Event', sort: 'ASC' }
]
```

This renders:

```text
Country
  City
    Event
```

The lowest grouping level becomes the visual timeline row.

### 7.1 Group configuration object

```javascript
{
  field: 'Country',
  sort: 'ASC',
  groupCss: 'my-country-row',
  defaultVisible: true
}
```

### 7.2 Group properties

| Property | Type | Required | Description |
|---|---:|---:|---|
| `field` | string | Yes | Field name from each data item used for grouping. |
| `sort` | string | No | Sort mode: `ASC`, `DESC`, or `NONE-NULL`. |
| `groupCss` | string | No | CSS class applied to generated group rows. |
| `defaultVisible` | boolean | No | Indicates whether group is expanded by default. |

### 7.3 Sort options

| Value | Description |
|---|---|
| `ASC` | Sort ascending. Blank/null values move to the bottom. |
| `DESC` | Sort descending. Blank/null values move to the bottom. |
| `NONE-NULL` | Preserve original order but move blank/null values to the bottom. |

---

## 8. Timeline Range

Modern Gantt is data-driven. Timeline range is calculated from all items using:

```javascript
fromField: 'startDate',
toField: 'endDate'
```

The visual range expands to whole years:

```text
January of minimum start year → December of maximum end year
```

Example:

```javascript
[
  { startDate: '2025-03-01', endDate: '2025-04-01' },
  { startDate: '2027-05-01', endDate: '2027-06-01' }
]
```

Generated timeline:

```text
January 2025 → December 2027
```

---

## 9. Scale Views

### 9.1 Supported scales

```javascript
scale: 'days'
scale: 'weeks'
scale: 'months'
```

### 9.2 Months view

Header:

```text
Year
Month
```

### 9.3 Weeks view

Header:

```text
Year
Month
Week number
```

Week labels can use a prefix:

```javascript
showWeekPrefix: true,
weekPrefix: 'W'
```

Example:

```text
W1, W2, W3
```

### 9.4 Days view

Header:

```text
Year
Month
Day number
```

---

## 10. Sticky Header

Sticky header is integrated directly in the plugin.

```javascript
stickyHeader: true
```

Disable sticky header:

```javascript
stickyHeader: false
```

### 10.1 Offset for fixed page navigation

If the page has a fixed navigation bar above the chart, set:

```javascript
stickyTop: 56
```

This prevents the Gantt toolbar from hiding under the fixed navigation.

---

## 11. Horizontal Timeline Slider

The toolbar includes an optional slider to control horizontal timeline scrolling.

```javascript
showScrollSlider: true,
scrollSliderSteps: 1000
```

Disable:

```javascript
showScrollSlider: false
```

The slider is synchronized with the right timeline panel scroll position.

---

## 12. Themes

### 12.1 Available themes

```javascript
theme: 'blue'
theme: 'green'
theme: 'emerald'
theme: 'purple'
theme: 'graphite'
```

### 12.2 Change theme after rendering

```javascript
gantt.setTheme('purple');
```

---

## 13. Columns

### 13.1 Default column

If no custom columns are supplied, the plugin uses:

```javascript
{ field: '__label', title: 'Name', width: '1.5fr' }
```

### 13.2 Add extra columns

```javascript
extraColumns: [
  { field: 'Format', title: 'Format', width: '90px' },
  { field: 'Status', title: 'Status', width: '90px' }
]
```

### 13.3 Fully custom columns

```javascript
columns: [
  { field: '__label', title: 'Name', width: '1.5fr' },
  { field: 'Format', title: 'Format', width: '90px' },
  { field: 'Status', title: 'Status', width: '90px' }
]
```

### 13.4 Column formatter

```javascript
columns: [
  {
    field: 'Status',
    title: 'Status',
    width: '90px',
    formatter: row => row.type === 'leaf' && row.items[0] ? row.items[0].Status : ''
  }
]
```

---

## 14. Gantt Bars

### 14.1 Bar label

Use a field:

```javascript
barText: 'EventName'
```

Use a callback:

```javascript
barText: item => item.EventName
```

### 14.2 Bar CSS class from data

```javascript
barClassField: 'customClass'
```

Data:

```javascript
{
  customClass: 'ganttBlue'
}
```

### 14.3 Bar CSS class from callback

```javascript
barClass: item => item.Status === 'Confirmed' ? 'ganttGreen' : 'ganttBlue'
```

### 14.4 Bar inline style from data

```javascript
barStyleField: 'barStyle'
```

Data:

```javascript
{
  barStyle: 'background:#fef3c7;border-color:#f59e0b;color:#92400e;'
}
```

### 14.5 Bar inline style from callback

```javascript
barStyle: item => ({
  backgroundColor: item.Format === 'Virtual' ? '#dbeafe' : '#dcfce7'
})
```

---

## 15. Tooltip and Popup

### 15.1 Tooltip from field

```javascript
tooltipField: 'TooltipText'
```

### 15.2 Tooltip from callback

```javascript
tooltipTemplate: item => `${item.EventName} | ${item.City}, ${item.Country}`
```

### 15.3 Popup

HTML:

```html
<div id="popup"></div>
```

Configuration:

```javascript
popupTarget: '#popup',
popupClass: 'mg-popup',
popupTemplate: item => `<pre>${JSON.stringify(item, null, 2)}</pre>`
```

---

## 16. Events and Callbacks

### 16.1 onItemClick

```javascript
onItemClick: (item, context, event) => {
  console.log(item);
  console.log(context.row);
  console.log(context.bar);
}
```

### 16.2 Native event

```javascript
document.querySelector('#gantt').addEventListener('gantt:itemclick', e => {
  console.log(e.detail.item);
});
```

### 16.3 onRender

```javascript
onRender: (instance, context) => {
  console.log(context.rows);
  console.log(context.visibleRows);
  console.log(context.scale);
  console.log(context.range);
}
```

### 16.4 onError

```javascript
onError: (error, context) => {
  console.error('ModernGantt error:', context, error);
}
```

---

## 17. Public Methods

### setData

```javascript
gantt.setData(newData);
```

Replaces the current data and redraws the chart.

### refresh

```javascript
gantt.refresh();
```

Redraws the chart using current data and options.

### setLoading

```javascript
gantt.setLoading(true, 'Loading events...');
gantt.setLoading(false);
```

Shows or hides loading state.

### setTheme

```javascript
gantt.setTheme('green');
```

Changes theme after render.

### scrollToCurrent

```javascript
gantt.scrollToCurrent();
```

Scrolls to current date when current date is within timeline range.

### scrollToCurrentYear

```javascript
gantt.scrollToCurrentYear();
```

Scrolls near the start of the current year.

### scrollToDate

```javascript
gantt.scrollToDate(new Date('2026-06-01'));
```

Scrolls to a specific date.

---

## 18. Full Plugin Options Reference

| Option | Default | Type | Description |
|---|---:|---|---|
| `data` | `[]` | Array | Primary flat JSON data array. |
| `source` | `null` | Array | Alternative data input. `data` is preferred when both exist. |
| `groupBy` | `[]` | Array | Group hierarchy configuration. |
| `fromField` | `'startDate'` | string | Start date field name. |
| `toField` | `'endDate'` | string | End date field name. |
| `labelField` | `'Event'` | string | Default label field. |
| `barText` | `null` | string/function | Field name or callback for bar text. |
| `barClassField` | `'customClass'` | string | Field containing bar CSS class. |
| `barStyleField` | `'barStyle'` | string | Field containing inline CSS style string. |
| `barClass` | `null` | function | Callback returning bar CSS class. |
| `barStyle` | `null` | function | Callback returning style object. |
| `tooltipTemplate` | `null` | function | Callback returning tooltip text. |
| `tooltipField` | `null` | string | Field containing tooltip text. |
| `popupTarget` | `null` | string | CSS selector for popup container. |
| `popupClass` | `'mg-popup'` | string | CSS class applied to popup container. |
| `popupTemplate` | `null` | function | Callback returning popup HTML. |
| `title` | `''` | string | Toolbar title. |
| `scale` | `'months'` | string | Timeline scale: `days`, `weeks`, or `months`. |
| `theme` | `'blue'` | string | Theme: `blue`, `green`, `emerald`, `purple`, or `graphite`. |
| `stickyHeader` | `true` | boolean | Enables sticky toolbar and header band. |
| `stickyTop` | `0` | number | Pixel offset for fixed site headers. |
| `showScrollSlider` | `true` | boolean | Shows horizontal timeline slider. |
| `scrollSliderSteps` | `1000` | number | Slider precision. |
| `leftPanelWidth` | `'25%'` | string | Preferred left panel width. |
| `leftPanelMinWidth` | `'240px'` | string | Minimum left panel width. |
| `leftPanelMaxWidth` | `'560px'` | string | Maximum left panel width. |
| `minTimelineWidth` | `1024` | number | Minimum timeline pixel width. |
| `rowHeight` | `32` | number | Timeline and left row height. |
| `barHeight` | `20` | number | Gantt bar height. |
| `headerRowHeight` | `28` | number | Each header row height. |
| `weekPrefix` | `'W'` | string | Prefix for week labels. |
| `showWeekPrefix` | `true` | boolean | Show or hide week prefix. |
| `fullMonthNames` | `true` | boolean | Show full month names. |
| `groupAccordion` | `true` | boolean | Enables group expand/collapse. |
| `collapseGroups` | `false` | boolean | Collapses groups initially. |
| `leafSortByFrom` | `true` | boolean | Sorts lowest-level rows by start date. |
| `focusCurrentYear` | `true` | boolean | Focuses near current year on initial render. |
| `scrollToToday` | `false` | boolean | Scrolls to today/current period on render. |
| `showTodayMarker` | `true` | boolean | Shows current date marker when in range. |
| `oddEvenYearBackground` | `true` | boolean | Enables alternating year background in grid. |
| `oddEvenMonthBackground` | `true` | boolean | Enables alternating month background in grid. |
| `noDataMessage` | `'No event timeline data available.'` | string | Message for empty data. |
| `loading` | `false` | boolean | Initial loading state. |
| `loadingMessage` | `'Loading events...'` | string | Loading message. |
| `pagination` | `{ enabled:false, pageSize:100 }` | object | Optional raw-data pagination. |
| `columns` | `null` | Array | Full custom columns. |
| `extraColumns` | `[]` | Array | Extra columns appended to default column. |
| `onItemClick` | `null` | function | Bar click callback. |
| `onRender` | `null` | function | Render callback. |
| `onError` | `null` | function | Error callback. |

---

## 19. Recommended Microsoft Event Configuration

```javascript
const gantt = new ModernGantt('#gantt', {
  title: 'Microsoft Events Calendar',
  theme: 'green',
  stickyHeader: true,
  showScrollSlider: true,
  data: generateMicrosoftEventData(),
  scale: 'months',
  groupBy: [
    { field: 'Country', sort: 'ASC', defaultVisible: true },
    { field: 'City', sort: 'ASC', defaultVisible: true },
    { field: 'Event', sort: 'ASC' }
  ],
  fromField: 'startDate',
  toField: 'endDate',
  labelField: 'Event',
  barText: item => item.EventName,
  tooltipField: 'TooltipText',
  extraColumns: [
    { field: 'Format', title: 'Format', width: '90px' },
    { field: 'Status', title: 'Status', width: '90px' }
  ]
});
```

---

## 20. Troubleshooting

### 20.1 `ReferenceError: initialFocus is not defined`

Use v2.0.1 or later. The issue is fixed by passing `initialFocus` into `drawRows(initialFocus)`.

### 20.2 Timeline does not cover all expected years

Check that all items have valid date values in configured fields:

```javascript
fromField: 'startDate',
toField: 'endDate'
```

### 20.3 Header is not sticky

Check:

```javascript
stickyHeader: true
```

If there is a fixed top page header:

```javascript
stickyTop: 56
```

### 20.4 Bars are not visible

Check:

- Start and end date values are valid.
- End date is after start date.
- The item appears within the generated range.
- The item belongs to the lowest grouping level.

### 20.5 Slider is disabled

The slider is disabled when there is no horizontal overflow.

Try:

```javascript
scale: 'days'
```

or increase:

```javascript
minTimelineWidth: 1800
```

---

## 21. Internal Notes

`features.md` is intended as an internal reference file. It is included in the package for project traceability but is not required for end-user setup.
