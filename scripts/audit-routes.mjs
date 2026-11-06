/**
 * ShrotiHost Route Audit Runner
 * Checks HTTP status codes for all 26 public routes and the 404 page.
 */

const BASE_URL = process.env.TEST_APP_URL || "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/advisor",
  "/app-development",
  "/blog",
  "/blog/shared-vs-reseller-hosting",
  "/blog/when-to-upgrade-to-vps",
  "/blog/wordpress-speed-optimization",
  "/blog/same-price-renewals-matter",
  "/checkout",
  "/compare",
  "/configurator",
  "/contact",
  "/domains",
  "/ecommerce-development",
  "/hosting",
  "/legal/aup",
  "/legal/privacy",
  "/legal/refund",
  "/legal/terms",
  "/master-reseller-hosting",
  "/reseller-hosting",
  "/unlimited-hosting",
  "/vps",
  "/web-development",
  "/wordpress-hosting",
  "/non-existent-test-404",
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Auditing ${routes.length} routes against ${BASE_URL}...\n`);
  let passCount = 0;
  let failCount = 0;

  for (const route of routes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`, {
        headers: { Connection: "close" },
      });
      const is404Route = route === "/non-existent-test-404";
      const expectedStatus = is404Route ? 404 : 200;

      if (res.status === expectedStatus) {
        passCount++;
        console.log(`  [PASS] ${route.padEnd(38)} -> HTTP ${res.status}`);
      } else {
        failCount++;
        console.error(`  [FAIL] ${route.padEnd(38)} -> Expected ${expectedStatus}, got ${res.status}`);
      }
    } catch (err) {
      failCount++;
      console.error(`  [ERROR] ${route.padEnd(37)} -> ${err.message}`);
    }
    await sleep(60);
  }

  console.log(`\nAudit Complete: ${passCount} passed, ${failCount} failed.`);
  if (failCount > 0) process.exit(1);
}

main();
