import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that the application logo changes after selecting a TP connection from connection dropdown in FTP/AS2 export page.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Bug-IO-88645 @Env-QA @Priority-P2 @Zephyr-IO-T37293 Verify that the application logo changes after selecting a TP connection from connection dropdown in FTP/AS2 export page.", async ({ io, page }) => {
    //Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    //Add Export
     await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    //Search and select an AS2
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "AS2");
    await io.flowBuilder.click('[data-test="AS2"]');
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    //Verify logo before selecting TP connection
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.APPLICATION_LOGO, 'src', 'as2.png');

    //Select the connection
    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "AAFES_CONNECTION");
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    //Verify logo after selecting TP connection
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.APPLICATION_LOGO, 'src', 'aafes.svg');

  });
});