# Modern Gantt v2.1 — Complete Reference Guide

**Author:** Kashyap Makadia  
**Version:** 2.1.0  
**Plugin Type:** Dependency-free JavaScript Gantt chart  
**Sample Context:** Microsoft-style event calendar  
**Default Example Hierarchy:** Country → City → Event

---

## Overview

Modern Gantt renders grouped timeline data from a flat JSON array. It supports days, weeks and months views, accordion grouping, sticky headers, a horizontal timeline slider, themes, tooltips, popups, public methods and event callbacks.

The default sample pattern is:

```text
Country
  City
    Event
```

---

## Package Structure

```text
Modern-Gantt-v2.1
├─ index.html
├─ README.md
├─ manifest.json
├─ features.md
└─ src
   ├─ modern-gantt.css
   ├─ modern-gantt.js
   └─ sample-data-generator.js
```

---

## Quick Start

```html
<link rel="stylesheet" href="src/modern-gantt.css">
<div id="gantt"></div>
<script src="src/sample-data-generator.js"></script>
<script src="src/modern-gantt.js"></script>
```

```javascript
const gantt = new ModernGantt('#gantt', {
  title: 'Microsoft Events Calendar',
  theme: 'green',
  stickyHeader: true,
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

## Data Model

Modern Gantt expects flat records.

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

---

## Sample Data Generator

```javascript
generateMicrosoftEventData(options)
```

| Option | Default | Type | Description |
|---|---:|---|---|
| `countryCount` | `6` | number | Number of countries used. |
| `minCitiesPerCountry` | `2` | number | Minimum city count per country. |
| `maxCitiesPerCountry` | `4` | number | Maximum city count per country. |
| `minEventsPerCity` | `3` | number | Minimum events generated per city. |
| `maxEventsPerCity` | `7` | number | Maximum events generated per city. |
| `years` | `[2025, 2026, 2027]` | number[] | Years used for sample event dates. |
| `fromField` | `'startDate'` | string | Generated start date field. |
| `toField` | `'endDate'` | string | Generated end date field. |
| `minDurationDays` | `2` | number | Minimum event duration. |
| `maxDurationDays` | `21` | number | Maximum event duration. |

---

## Grouping

```javascript
groupBy: [
  { field: 'Country', sort: 'ASC', defaultVisible: true },
  { field: 'City', sort: 'ASC', defaultVisible: true },
  { field: 'Event', sort: 'ASC' }
]
```

| Property | Type | Description |
|---|---|---|
| `field` | string | Field name used for grouping. |
| `sort` | string | `ASC`, `DESC`, or `NONE-NULL`. |
| `groupCss` | string | Optional CSS class applied to group rows. |
| `defaultVisible` | boolean | Expanded/collapsed default state. |

---

## Timeline Width Auto-Fit

v2.1 includes optional responsive timeline sizing. Users can provide min/max values or omit them and let the plugin calculate sensible defaults.

```javascript
timelineFitMode: 'auto',
minMonthWidth: 90,
maxMonthWidth: 220,
minWeekWidth: 54,
maxWeekWidth: 120,
minDayWidth: 28,
maxDayWidth: 72
```

### Fit modes

| Value | Description |
|---|---|
| `auto` | Expands timeline cells based on available width, while respecting min/max constraints. |
| `fixed` | Uses previous fixed/minimum width behavior. |

All min/max width properties are optional. If not supplied, Modern Gantt calculates internal defaults.

---

## Accordion Controls

v2.1 adds toolbar-level accordion controls similar to drill expand/collapse buttons.

```javascript
showAccordionControls: true
```

Public methods:

```javascript
gantt.expandAll();
gantt.collapseAll();
gantt.expandLevel(0);
gantt.collapseLevel(0);
gantt.expandLevel(1);
gantt.collapseLevel(1);
```

- Level `0` is the first grouping level, e.g. `Country`.
- Level `1` is the second grouping level, e.g. `City`.
- `expandAll()` and `collapseAll()` apply to all group levels.

---

## Views

```javascript
scale: 'days'
scale: 'weeks'
scale: 'months'
```

- `days`: Years / Months / Day numbers
- `weeks`: Years / Months / ISO week numbers
- `months`: Years / Months

---

## Themes

```javascript
theme: 'blue'
theme: 'green'
theme: 'emerald'
theme: 'purple'
theme: 'graphite'
```

```javascript
gantt.setTheme('green');
```

---

## Sticky Header

```javascript
stickyHeader: true,
stickyTop: 0
```

Use `stickyTop` when the page has a fixed header above the chart.

---

## Toolbar Timeline Slider

```javascript
showScrollSlider: true,
scrollSliderSteps: 1000
```

The slider controls horizontal timeline scrolling and stays synchronized with manual horizontal scrolling.

---

## Columns

```javascript
extraColumns: [
  { field: 'Format', title: 'Format', width: '90px' },
  { field: 'Status', title: 'Status', width: '90px' }
]
```

Full custom columns:

```javascript
columns: [
  { field: '__label', title: 'Name', width: '1.5fr' },
  { field: 'Format', title: 'Format', width: '90px' },
  { field: 'Status', title: 'Status', width: '90px' }
]
```

---

## Bar Configuration

```javascript
barText: item => item.EventName,
barClassField: 'customClass',
barStyleField: 'barStyle',
barClass: item => item.Status === 'Confirmed' ? 'ganttGreen' : 'ganttBlue',
barStyle: item => ({ backgroundColor: item.Format === 'Virtual' ? '#dbeafe' : '#dcfce7' })
```

---

## Tooltip and Popup

```javascript
tooltipField: 'TooltipText',
popupTarget: '#popup',
popupClass: 'mg-popup',
popupTemplate: item => `<pre>${JSON.stringify(item, null, 2)}</pre>`
```

---

## Events and Callbacks

```javascript
onItemClick: (item, context, event) => console.log(item),
onRender: (instance, context) => console.log(context),
onError: (error, context) => console.error(error, context)
```

Native event:

```javascript
document.querySelector('#gantt').addEventListener('gantt:itemclick', e => {
  console.log(e.detail.item);
});
```

---

## Public Methods

```javascript
gantt.setData(data);
gantt.refresh();
gantt.setLoading(true, 'Loading...');
gantt.setLoading(false);
gantt.setTheme('green');
gantt.scrollToCurrent();
gantt.scrollToCurrentYear();
gantt.scrollToDate(new Date('2026-06-01'));
gantt.expandAll();
gantt.collapseAll();
gantt.expandLevel(0);
gantt.collapseLevel(0);
```

---

## Full Plugin Options Reference

| Option | Default | Type | Description |
|---|---:|---|---|
| `data` | `[]` | Array | Primary flat JSON data. |
| `source` | `null` | Array | Alternative data input. |
| `groupBy` | `[]` | Array | Group hierarchy. |
| `fromField` | `'startDate'` | string | Start date field. |
| `toField` | `'endDate'` | string | End date field. |
| `labelField` | `'Event'` | string | Default label field. |
| `barText` | `null` | string/function | Bar label field/callback. |
| `barClassField` | `'customClass'` | string | Bar CSS class field. |
| `barStyleField` | `'barStyle'` | string | Bar style field. |
| `barClass` | `null` | function | Bar class callback. |
| `barStyle` | `null` | function | Bar style callback. |
| `tooltipTemplate` | `null` | function | Tooltip callback. |
| `tooltipField` | `null` | string | Tooltip field. |
| `popupTarget` | `null` | string | Popup container selector. |
| `popupClass` | `'mg-popup'` | string | Popup CSS class. |
| `popupTemplate` | `null` | function | Popup HTML callback. |
| `title` | `''` | string | Toolbar title. |
| `scale` | `'months'` | string | `days`, `weeks`, or `months`. |
| `theme` | `'blue'` | string | `blue`, `green`, `emerald`, `purple`, `graphite`. |
| `stickyHeader` | `true` | boolean | Enables sticky header. |
| `stickyTop` | `0` | number | Sticky top offset. |
| `showScrollSlider` | `true` | boolean | Shows horizontal timeline slider. |
| `scrollSliderSteps` | `1000` | number | Slider precision. |
| `showAccordionControls` | `true` | boolean | Shows expand/collapse toolbar buttons. |
| `timelineFitMode` | `'auto'` | string | `auto` or `fixed`. |
| `minMonthWidth` | `null` | number | Optional minimum month width. Internal default is used if omitted. |
| `maxMonthWidth` | `null` | number | Optional maximum month width. Internal default is used if omitted. |
| `minWeekWidth` | `null` | number | Optional minimum week width. Internal default is used if omitted. |
| `maxWeekWidth` | `null` | number | Optional maximum week width. Internal default is used if omitted. |
| `minDayWidth` | `null` | number | Optional minimum day width. Internal default is used if omitted. |
| `maxDayWidth` | `null` | number | Optional maximum day width. Internal default is used if omitted. |
| `leftPanelWidth` | `'25%'` | string | Preferred left width. |
| `leftPanelMinWidth` | `'240px'` | string | Minimum left width. |
| `leftPanelMaxWidth` | `'560px'` | string | Maximum left width. |
| `minTimelineWidth` | `1024` | number | Minimum timeline width. |
| `rowHeight` | `32` | number | Row height. |
| `barHeight` | `20` | number | Bar height. |
| `headerRowHeight` | `28` | number | Header row height. |
| `weekPrefix` | `'W'` | string | Week prefix. |
| `showWeekPrefix` | `true` | boolean | Shows week prefix. |
| `fullMonthNames` | `true` | boolean | Shows full month names. |
| `groupAccordion` | `true` | boolean | Enables row accordion. |
| `collapseGroups` | `false` | boolean | Collapses groups initially. |
| `leafSortByFrom` | `true` | boolean | Sorts leaf rows by start date. |
| `focusCurrentYear` | `true` | boolean | Focuses current year on initial render. |
| `scrollToToday` | `false` | boolean | Scrolls to current date/period. |
| `showTodayMarker` | `true` | boolean | Shows today marker. |
| `oddEvenYearBackground` | `true` | boolean | Alternating year grid background. |
| `oddEvenMonthBackground` | `true` | boolean | Alternating month grid background. |
| `noDataMessage` | text | string | Empty data message. |
| `loading` | `false` | boolean | Initial loading state. |
| `loadingMessage` | text | string | Loading message. |
| `pagination` | object | object | Optional raw-data pagination. |
| `columns` | `null` | Array | Full custom columns. |
| `extraColumns` | `[]` | Array | Extra columns. |
| `onItemClick` | `null` | function | Bar click callback. |
| `onRender` | `null` | function | Render callback. |
| `onError` | `null` | function | Error callback. |

---

## Troubleshooting

### Timeline does not expand on a wide screen

Use:

```javascript
timelineFitMode: 'auto'
```

Optionally set:

```javascript
minMonthWidth: 90,
maxMonthWidth: 260
```

