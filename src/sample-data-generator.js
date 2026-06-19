/*! ModernGantt v2.0 Sample Data Generator | Microsoft event pattern | Author: Kashyap Makadia */
(function (global) {
  'use strict';

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function toIsoDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function normaliseCount(level, parentIndex) {
    if (typeof level.count === 'number') return level.count;
    const min = typeof level.minPerParent === 'number' ? level.minPerParent : 1;
    const max = typeof level.maxPerParent === 'number' ? level.maxPerParent : min;
    return randomInt(min, max);
  }

  /**
   * Generate Microsoft-style event timeline data for ModernGantt.
   *
   * Default hierarchy:
   *   Country -> City -> Event
   *
   * Example event names:
   *   Microsoft Build, AI Days, Virtual Training Days, Fabric Community Day, Azure Discovery Day
   *
   * @param {Object} options
   * @param {number} options.countryCount - Number of countries to use.
   * @param {number} options.minCitiesPerCountry - Minimum cities per country.
   * @param {number} options.maxCitiesPerCountry - Maximum cities per country.
   * @param {number} options.minEventsPerCity - Minimum events per city.
   * @param {number} options.maxEventsPerCity - Maximum events per city.
   * @param {number[]} options.years - Years to spread events across.
   * @param {string} options.fromField - Start date field name.
   * @param {string} options.toField - End date field name.
   * @returns {Array<Object>}
   */
  function generateMicrosoftEventData(options) {
    const config = Object.assign({
      countryCount: 6,
      minCitiesPerCountry: 2,
      maxCitiesPerCountry: 5,
      minEventsPerCity: 3,
      maxEventsPerCity: 8,
      years: [2025, 2026, 2027],
      fromField: 'startDate',
      toField: 'endDate',
      minDurationDays: 5,
      maxDurationDays: 30,
      countries: [
        'United Kingdom', 'United States', 'Germany', 'France', 'India', 'Canada',
        'Australia', 'Netherlands', 'Spain', 'Sweden'
      ],
      cityMap: {
        'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Reading'],
        'United States': ['Seattle', 'New York', 'Chicago', 'San Francisco', 'Atlanta'],
        'Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
        'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
        'India': ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'New Delhi'],
        'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
        'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
        'Netherlands': ['Amsterdam', 'Rotterdam', 'Utrecht'],
        'Spain': ['Madrid', 'Barcelona', 'Valencia'],
        'Sweden': ['Stockholm', 'Gothenburg', 'Malmö']
      },
      events: [
        'Microsoft Build',
        'AI Days',
        'Virtual Training Days',
        'Azure Discovery Day',
        'Fabric Community Day',
        'Power Platform Summit',
        'Security Immersion Workshop',
        'Developer Productivity Day',
        'Copilot Adoption Day',
        'Data & AI Roadshow'
      ],
      formats: ['In-person', 'Virtual', 'Hybrid'],
      audiences: ['Developers', 'IT Pros', 'Business Leaders', 'Data Professionals', 'Security Teams'],
      owners: ['Microsoft Events Team', 'Cloud Advocacy', 'Partner Team', 'Community Team', 'Field Marketing'],
      statuses: ['Planned', 'Confirmed', 'Live', 'Completed', 'Draft'],
      classes: ['ganttBlue', 'ganttRed', 'ganttGreen', 'ganttPurple', '']
    }, options || {});

    const result = [];
    const countries = config.countries.slice(0, config.countryCount);

    countries.forEach((country, countryIndex) => {
      const availableCities = config.cityMap[country] || [`${country} City 1`, `${country} City 2`];
      const cityCount = Math.min(availableCities.length, randomInt(config.minCitiesPerCountry, config.maxCitiesPerCountry));
      const cities = availableCities.slice(0, cityCount);

      cities.forEach((city, cityIndex) => {
        const eventCount = randomInt(config.minEventsPerCity, config.maxEventsPerCity);

        for (let eventIndex = 0; eventIndex < eventCount; eventIndex += 1) {
          const year = config.years[(countryIndex + cityIndex + eventIndex) % config.years.length];
          const eventName = config.events[eventIndex % config.events.length];
          const startDay = randomInt(1, 330);
          const duration = randomInt(config.minDurationDays, config.maxDurationDays);
          const startDate = addDays(new Date(year, 0, 1), startDay);
          const endDate = addDays(startDate, duration);
          const format = randomChoice(config.formats);
          const audience = randomChoice(config.audiences);

          result.push({
            Country: country,
            City: city,
            Event: eventName,
            EventName: `${eventName} - ${city}`,
            Format: format,
            Audience: audience,
            Owner: randomChoice(config.owners),
            Status: randomChoice(config.statuses),
            customClass: randomChoice(config.classes),
            TooltipText: `${eventName} | ${city}, ${country} | ${format} | ${audience}`,
            [config.fromField]: toIsoDate(startDate),
            [config.toField]: toIsoDate(endDate)
          });
        }
      });
    });

    return result.sort((a, b) => {
      const c = String(a.Country).localeCompare(String(b.Country));
      if (c) return c;
      const city = String(a.City).localeCompare(String(b.City));
      if (city) return city;
      return new Date(a[config.fromField]) - new Date(b[config.fromField]);
    });
  }

  global.generateMicrosoftEventData = generateMicrosoftEventData;
  global.ModernGanttSampleData = {
    generateMicrosoftEventData,
    randomInt,
    randomChoice,
    addDays,
    toIsoDate
  };
})(window);
