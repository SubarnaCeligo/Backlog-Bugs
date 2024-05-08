import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@http`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
    });
  test(`TC_T26351 (1.0) @Zephyr-IO-T26351 @Env-All @Priority-P2`, async ({ io, page }) => {


    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.addStep("*** Navigated to export page ***");
    await io.importsPage.clickByText("Create import");
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, "HTTP");
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        await io.flowBuilder.loadingTime();

        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByText("HTTP ZENDESK CONNECTION");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Clicked on 'name' field and gave a name to our import ***");
        await io.importsPage.clickByText("Next");
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.ADVANCED, 'Advance section not present');
      await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
      await io.flowBuilder.click("[id='idLockTemplate'] [data-test='help-text-icon']");
      await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
      const secretText = (await io.flowBuilder.getText(
        selectors.myAccountPagePO.HELP_BUBBLE
      )) as string;
      await io.assert.expectToContainValue(
        `Concurrency ID lock templateEnter a handlebars expression to reference a unique ID for each record to ensure that it isn't processed by two concurrent import requests. A Concurrency ID lock template prevents integrator.io from simultaneously submitting duplicate records when the import connection has a concurrency level greater than 1. For example, if you are importing Zendesk records into NetSuite, then you could enter the {{{record.id}}} field to identify unique Zendesk records. No two records with the same Zendesk ID value would import into NetSuite at the same time.Was this helpful?Field path: import.idLockTemplate`,
        secretText,
        "secrettext name not found"
      );
  });
});
