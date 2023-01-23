import { addFixtures } from "./fixture-helper";

(async function () {
  addFixtures().then(() => {
    console.log("Fixtures run successfully");
    process.exit(0);
  });
})();
