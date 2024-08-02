import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S TC_T29350-Verify that 'ediProfile' option is not shown for Netsuite file provider import", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Bug-IO-75581 @Env-All @Priority-P2 @Zephyr-IO-T29350 Verify that 'ediProfile' option is not shown for Netsuite file provider import", async ({ io, page }) => {
    //Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    //Add Export
     await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    //Search and select an Netsuite
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Netsuite");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.TRANSFER_FILES);
    await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    //Select File type as EDIX12
    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    //Verify if EDI profile is being shown
    let isEDIProfileVisible = await io.flowBuilder.isVisible(selectors.homePagePO.EDI_PROFILE);
    await io.assert.expectToBeFalse(isEDIProfileVisible, 'EDI Profile is visible for Netsuite file provider import');

  });
});