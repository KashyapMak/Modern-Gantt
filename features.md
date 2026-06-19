# Modern Gantt v2.0 - Internal Feature Notes

This file is intended for internal/project reference and is not required for end-user plugin release notes.

## Included Features

- Dependency-free JavaScript Gantt plugin.
- Flat JSON input.
- Data-driven timeline range from fromField/toField.
- Microsoft event sample pattern: Country → City → Event.
- Sample events include Microsoft Build, AI Days, Virtual Training Days, Azure Discovery Day, Fabric Community Day, Power Platform Summit, Security Immersion Workshop, Developer Productivity Day, Copilot Adoption Day, and Data & AI Roadshow.
- Built-in sample data generator.
- Grouping by configurable hierarchy.
- Accordion groups.
- Default visible group configuration.
- Left panel configurable columns.
- Timeline views: days, weeks, months.
- ISO week labels with configurable prefix.
- Sticky header integrated with stickyHeader property.
- Header band avoids overlay clone patch.
- Right header synced with right timeline horizontal scroll.
- Timeline scroll slider in toolbar.
- Themes: blue, bp, emerald, purple, graphite.
- BP-inspired colour theme.
- Month header colours.
- Year header light/dark pattern.
- Today marker.
- Bar labels from field or callback.
- Bar CSS class from field or callback.
- Bar style from field or callback.
- Tooltip from field or callback.
- Popup on bar click.
- onItemClick callback.
- Native gantt:itemclick event.
- onRender callback.
- onError callback.
- Loading state.
- No-data state.
- Optional pagination.
- Public methods: setData, refresh, setLoading, setTheme, scrollToCurrent, scrollToCurrentYear, scrollToDate.

## Version 2.0 Sample Context

Final demo context changed from:

Country → Campaign → Channel

to:

Country → City → Event

This better demonstrates an event-planning scenario using Microsoft-style events.
