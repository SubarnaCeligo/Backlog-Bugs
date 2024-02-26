import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", () => {
    test("C61932_App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        // Validating successfully navigated
        await page.goto('https://qaprod.staging.integrator.io/')
    });
  });
  