function api1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ service: 'Users', data: 120 }), 1000);
  });
}

function api2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ service: 'Orders', data: 45 }), 3000);
  });
}

function api3() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Service down')), 1500);
  });
}

// This function adds a timeout behavior to any promise.
// Two promises run in parallel:
//   1. API promise
//   2. Timeout promise
// Promise.race decides the result based on whichever finishes first.
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });

  // Race between API promise and timeout promise.
  // Whichever finishes first decides the result.
  return Promise.race([promise, timeout]);
}

async function fetchData() {
  const TIMEOUT = 2000; // 2 seconds timeout for each API

  // All APIs start in parallel here
  const promises = [
    withTimeout(api1(), TIMEOUT),
    withTimeout(api2(), TIMEOUT),
    withTimeout(api3(), TIMEOUT),
  ];

  // Wait for all of them to settle (fulfilled or rejected)
  const results = await Promise.allSettled(promises);

  const successful = [];
  const failed = [];

  results.forEach((res, index) => {
    if (res.status === 'fulfilled') {
      successful.push(res.value);
    } else {
      failed.push({
        api: index + 1,
        reason: res.reason.message,
      });
    }
  });

  return { successful, failed };
}

// Since fetchData returns a promise, .then is required
fetchData()
  .then((report) => {
    console.log('FINAL REPORT');

    console.log('\nSuccessful Responses:');
    console.log(report.successful);

    console.log('\nFailed Responses:');
    console.log(report.failed);
  })
  .catch((err) => {
    // Optional: Promise.allSettled itself doesn't throw,
    // but this catches unexpected system errors.
    console.error('Unexpected system error:', err);
  });
