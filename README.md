# Modern Gantt v2.0

**Author:** Kashyap Makadia  
**Version:** 2.0.0  
**Pattern:** Microsoft-style event calendar  
**Default hierarchy:** Country → City → Event

Modern Gantt is a dependency-free JavaScript Gantt component for rendering grouped timeline data from flat JSON.

Demo : [https://kashyapmak.github.io/Modern-Gantt/] 

---

## Package Structure

```text
Modern-Gantt-v2.0
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

## Data Pattern

The sample generator creates Microsoft-style event records using this hierarchy:

```text
Country
  City
    Event
```

Example record:

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

The file `src/sample-data-generator.js` exposes:

```javascript
generateMicrosoftEventData(options)
```

### Generator options

```javascript
{
  countryCount: 6,
  minCitiesPerCountry: 2,
  maxCitiesPerCountry: 5,
  minEventsPerCity: 3,
  maxEventsPerCity: 8,
  years: [2025, 2026, 2027],
  fromField: 'startDate',
  toField: 'endDate',
  minDurationDays: 2,
  maxDurationDays: 21
}
```

### Example

```javascript
const eventData = generateMicrosoftEventData({
  countryCount: 5,
  minCitiesPerCountry: 2,
  maxCitiesPerCountry: 4,
  minEventsPerCity: 3,
  maxEventsPerCity: 6,
  years: [2025, 2026, 2027]
});
```

---

## Timeline Range

The timeline is automatically generated from the configured date fields:

```javascript
fromField: 'startDate',
toField: 'endDate'
```

The visual range expands to full years:

```text
January of minimum start year → December of maximum end year
```

No separate range option is required.

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

## Grouping

```javascript
groupBy: [
  { field: 'Country', sort: 'ASC', defaultVisible: true },
  { field: 'City', sort: 'ASC', defaultVisible: true },
  { field: 'Event', sort: 'ASC' }
]
```

### Group options

- `field`: field name to group by.
- `sort`: `ASC`, `DESC`, or `NONE-NULL`.
- `defaultVisible`: `true` expands the group by default; `false` collapses it.
- `groupCss`: optional CSS class for group rows.

---

## Sticky Header

```javascript
stickyHeader: true
```

Disable:

```javascript
stickyHeader: false
```

If a fixed page header exists above the chart:

```javascript
stickyTop: 56
```

---

## Themes

```javascript
theme: 'blue'
theme: 'green'
theme: 'emerald'
theme: 'purple'
theme: 'graphite'
```

Change theme after render:

```javascript
gantt.setTheme('purple');
```

---

## Toolbar Timeline Slider

```javascript
showScrollSlider: true,
scrollSliderSteps: 1000
```

The slider controls the horizontal scroll position of the timeline.

---

## Columns

Use default Name column plus extra columns:

```javascript
extraColumns: [
  { field: 'Format', title: 'Format', width: '90px' },
  { field: 'Status', title: 'Status', width: '90px' }
]
```

Or fully control columns:

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
barStyleField: 'barStyle'
```

Dynamic bar class:

```javascript
barClass: item => item.Status === 'Confirmed' ? 'ganttGreen' : 'ganttBlue'
```

Dynamic bar style:

```javascript
barStyle: item => ({
  backgroundColor: item.Format === 'Virtual' ? '#dbeafe' : '#dcfce7'
})
```

---

## Tooltip and Popup

```javascript
tooltipField: 'TooltipText',
popupTarget: '#popup',
popupTemplate: item => `<pre>${JSON.stringify(item, null, 2)}</pre>`
```

---

## Events

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
```

---

## Full Configuration Reference

```javascript
{
  data: [],
  source: null,
  groupBy: [],
  fromField: 'startDate',
  toField: 'endDate',
  labelField: 'Event',
  barText: null,
  barClassField: 'customClass',
  barStyleField: 'barStyle',
  barClass: null,
  barStyle: null,
  tooltipTemplate: null,
  tooltipField: null,
  popupTarget: null,
  popupClass: 'mg-popup',
  popupTemplate: null,
  title: '',
  scale: 'months',
  theme: 'blue',
  stickyHeader: true,
  stickyTop: 0,
  showScrollSlider: true,
  scrollSliderSteps: 1000,
  leftPanelWidth: '25%',
  leftPanelMinWidth: '240px',
  leftPanelMaxWidth: '560px',
  minTimelineWidth: 1024,
  rowHeight: 32,
  barHeight: 20,
  headerRowHeight: 28,
  weekPrefix: 'W',
  showWeekPrefix: true,
  fullMonthNames: true,
  groupAccordion: true,
  collapseGroups: false,
  leafSortByFrom: true,
  focusCurrentYear: true,
  scrollToToday: false,
  showTodayMarker: true,
  oddEvenYearBackground: true,
  oddEvenMonthBackground: true,
  noDataMessage: 'No event timeline data available.',
  loading: false,
  loadingMessage: 'Loading events...',
  pagination: { enabled: false, pageSize: 100 },
  columns: null,
  extraColumns: [],
  onItemClick: null,
  onRender: null,
  onError: null
}
```

---

## Troubleshooting

### Timeline does not cover all years

Check that `fromField` and `toField` contain valid dates.

### Header is not sticky

Check:

```javascript
stickyHeader: true
```

If the page has a fixed header:

```javascript
stickyTop: 56
```

### Bars are missing

Check each item has valid dates:

```javascript
startDate: '2026-01-01',
endDate: '2026-02-01'
```

### Slider disabled

The slider disables when no horizontal overflow exists.

---

## Recommended Production Defaults

```javascript
{
  theme: 'green',
  stickyHeader: true,
  scale: 'months',
  showScrollSlider: true,
  groupAccordion: true,
  leafSortByFrom: true,
  noDataMessage: 'No event timeline data available.'
}
```
