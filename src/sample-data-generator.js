/*! ModernGantt v2.1 Sample Data Generator | Microsoft event pattern | Author: Kashyap Makadia */
(function (global) {
  'use strict';
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function randomChoice(items) { return items[Math.floor(Math.random() * items.length)]; }
  function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
  function toIsoDate(date) { return date.toISOString().slice(0, 10); }
  function generateMicrosoftEventData(options) {
    const config = Object.assign({
      countryCount: 6, minCitiesPerCountry: 2, maxCitiesPerCountry: 4, minEventsPerCity: 3, maxEventsPerCity: 7,
      years: [2025, 2026, 2027], fromField: 'startDate', toField: 'endDate', minDurationDays: 2, maxDurationDays: 21,
      countries: ['United Kingdom','United States','Germany','France','India','Canada','Australia','Netherlands','Spain','Sweden'],
      cityMap: {
        'United Kingdom': ['London','Manchester','Birmingham','Edinburgh','Reading'],
        'United States': ['Seattle','New York','Chicago','San Francisco','Atlanta'],
        'Germany': ['Berlin','Munich','Frankfurt','Hamburg','Cologne'],
        'France': ['Paris','Lyon','Marseille','Toulouse'],
        'India': ['Bengaluru','Hyderabad','Mumbai','Pune','New Delhi'],
        'Canada': ['Toronto','Vancouver','Montreal','Ottawa'],
        'Australia': ['Sydney','Melbourne','Brisbane','Perth'],
        'Netherlands': ['Amsterdam','Rotterdam','Utrecht'],
        'Spain': ['Madrid','Barcelona','Valencia'],
        'Sweden': ['Stockholm','Gothenburg','Malmö']
      },
      events: ['Microsoft Build','AI Days','Virtual Training Days','Azure Discovery Day','Fabric Community Day','Power Platform Summit','Security Immersion Workshop','Developer Productivity Day','Copilot Adoption Day','Data & AI Roadshow'],
      formats: ['In-person','Virtual','Hybrid'], audiences: ['Developers','IT Pros','Business Leaders','Data Professionals','Security Teams'],
      owners: ['Microsoft Events Team','Cloud Advocacy','Partner Team','Community Team','Field Marketing'], statuses: ['Planned','Confirmed','Live','Completed','Draft'],
      classes: ['ganttBlue','ganttRed','ganttGreen','ganttPurple','']
    }, options || {});
    const result = [];
    config.countries.slice(0, config.countryCount).forEach((country, countryIndex) => {
      const availableCities = config.cityMap[country] || [`${country} City 1`, `${country} City 2`];
      const cityCount = Math.min(availableCities.length, randomInt(config.minCitiesPerCountry, config.maxCitiesPerCountry));
      availableCities.slice(0, cityCount).forEach((city, cityIndex) => {
        const eventCount = randomInt(config.minEventsPerCity, config.maxEventsPerCity);
        for (let eventIndex = 0; eventIndex < eventCount; eventIndex++) {
          const year = config.years[(countryIndex + cityIndex + eventIndex) % config.years.length];
          const eventName = config.events[eventIndex % config.events.length];
          const start = addDays(new Date(year, 0, 1), randomInt(1, 330));
          const end = addDays(start, randomInt(config.minDurationDays, config.maxDurationDays));
          const format = randomChoice(config.formats), audience = randomChoice(config.audiences);
          result.push({ Country: country, City: city, Event: eventName, EventName: `${eventName} - ${city}`, Format: format, Audience: audience, Owner: randomChoice(config.owners), Status: randomChoice(config.statuses), customClass: randomChoice(config.classes), TooltipText: `${eventName} | ${city}, ${country} | ${format} | ${audience}`, [config.fromField]: toIsoDate(start), [config.toField]: toIsoDate(end) });
        }
      });
    });
    return result.sort((a,b)=>String(a.Country).localeCompare(String(b.Country))||String(a.City).localeCompare(String(b.City))||new Date(a[config.fromField])-new Date(b[config.fromField]));
  }
  global.generateMicrosoftEventData = generateMicrosoftEventData;
  global.ModernGanttSampleData = { generateMicrosoftEventData, randomInt, randomChoice, addDays, toIsoDate };
})(window);
