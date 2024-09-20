import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T25634 Verify user is able to close the Import/Export window after providing an invalid ID in the URL", () => { 
  test("@Env-All @Zephyr-IO-T25634 Verify user is able to close the Import/Export window after providing an invalid ID in the URL", async ({io, page}) => {
 
    await io.homePage.addStep("Go to imports page");
    await io.homePage.navigateTo(io.connectorUrl + "imports");
    await io.homePage.loadingTime();
   
    await io.homePage.addStep("Click on any import");
    await io.importsPage.waitForElementAttached(selectors.integrationPagePO.SELECTSTACKLIST)
    await io.importsPage.clickByIndex(selectors.integrationPagePO.SELECTSTACKLIST, 0);
    await io.homePage.loadingTime();

    await io.homePage.addStep("Get the page url and replace export ID with an invalid ID");
    let url = await page.url();
    // Find the part of the URL before the `?`
    const urlParts = url.split('?');
    const beforeQuery = urlParts[0];
    // Replace the export id with an invalid ID `?` with the random string
    const updatedUrl = beforeQuery.slice(0, -6) + 'a1b2c3d4' + '?' + urlParts[1];

    await io.homePage.addStep("Navigate to the link with invalid ID");
    await io.importsPage.navigateTo(updatedUrl);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.importsPage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    let navigatedUrl = await page.url();
    let expectedURL = process.env["IO_UI_CONNECTOR_URL"]+ 'imports';

    await io.homePage.addStep("Verify if drawer is closed automatically and the user is navigated back to imports page");
    await io.assert.expectToBeValue(expectedURL, navigatedUrl, 'Drawer is not closed automatically and the user is not navigated back to imports page');

  });
});