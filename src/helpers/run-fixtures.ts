import { addFixtures, addFixturesWithForeignKeys } from "./fixture-helper";

(async function () {
  addFixtures().then(async () => {
    addFixturesWithForeignKeys().then(async () => {
      console.log("Fixtures run successfully");
      process.exit(0);
    });
  });
})();
