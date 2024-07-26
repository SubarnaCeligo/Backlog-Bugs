
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


  test("@Env-All @Zephyr-IO-T11647 TC_C28883_Verify when the user expands the “Sorting and grouping records” section ,user will see the “Sort records by fields” function first, then the “Group records by fields” function UI_Backlog", async ({ io }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io. flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,"FTP CONNECTION")
    await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    // Validating sort/group records available
    await io.homePage.clickByText("How would you like to group and sort records?");
    await io.assert.verifyElementDisplayedByText('Sort records by fields', 'Not available')
    await io.assert.verifyElementDisplayedByText('Group records by fields', 'Not available')
  });

