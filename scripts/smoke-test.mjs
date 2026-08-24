#!/usr/bin/env node

const baseUrl = (process.env.SMOKE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

async function request(path, { expectedStatus = 200, validate } = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url);
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (response.status !== expectedStatus) {
    throw new Error(`${path} returned ${response.status}, expected ${expectedStatus}`);
  }

  if (validate) validate(body, response);

  return body;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const checks = [
  {
    name: 'health',
    path: '/health',
    validate: (body) => {
      assert(body.status, 'health response should include status');
    },
  },
  {
    name: 'states',
    path: '/v1/locations/states',
    validate: (body) => {
      assert(body.status === 'success', 'states response should be successful');
      assert(Array.isArray(body.data), 'states data should be an array');
      assert(body.data.some((state) => state.code === 'SP'), 'states should include SP');
    },
  },
  {
    name: 'national holidays',
    path: '/v1/holidays?year=2026&location=BR&limit=5',
    validate: (body) => {
      assert(body.status === 'success', 'holidays response should be successful');
      assert(Array.isArray(body.data), 'holidays data should be an array');
      assert(
        body.data.some((holiday) => holiday.date?.startsWith('2026-01-01')),
        'holidays should include 2026-01-01'
      );
    },
  },
  {
    name: 'business day count',
    path: '/v1/business-days?from=2026-01-01&to=2026-01-10&location=BR',
    validate: (body) => {
      assert(body.status === 'success', 'business-days response should be successful');
      assert(body.data.businessDays === 6, 'expected 6 business days from 2026-01-01 to 2026-01-10');
    },
  },
  {
    name: 'calendar month',
    path: '/v1/calendar/month?location=BR&year=2026&month=1',
    validate: (body) => {
      assert(body.status === 'success', 'calendar response should be successful');
      assert(body.data.summary.calendarDays === 31, 'January 2026 should have 31 calendar days');
    },
  },
  {
    name: 'ical export',
    path: '/v1/holidays/ical?location=BR&year=2026',
    validate: (body, response) => {
      assert(
        response.headers.get('content-type')?.includes('text/calendar'),
        'iCal response should use text/calendar'
      );
      assert(body.includes('BEGIN:VCALENDAR'), 'iCal response should include BEGIN:VCALENDAR');
    },
  },
  {
    name: 'data status',
    path: '/v1/data/status',
    validate: (body) => {
      assert(body.status === 'success', 'data status response should be successful');
      assert(body.data.supportedCountries.some((country) => country.code === 'BR'), 'data status should include BR');
    },
  },
];

async function main() {
  console.log(`Running smoke tests against ${baseUrl}`);

  for (const check of checks) {
    await request(check.path, { validate: check.validate });
    console.log(`ok - ${check.name}`);
  }

  console.log('Smoke tests passed.');
}

main().catch((error) => {
  console.error(`Smoke tests failed: ${error.message}`);
  process.exit(1);
});
