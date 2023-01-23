import { addFixtures } from "./fixture-helper";

(async function() {
    addFixtures().then(data => {
        console.log('Fixtures run successfully');
        process.exit(0);
    });
})();