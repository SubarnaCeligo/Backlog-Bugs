import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27646 Verify back arrow should not be displayed in Create Lookup drawer on HTTP lookups UI_Backlog", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T9665 C27646 Verify back arrow should not be displayed in Create Lookup drawer on HTTP lookups UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP connection');
    await io.flowBuilder.clickByTextByIndex('HTTP connection', 0);
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_BODY);
    await io.connectionPage.waitForElementAttached(selectors.mappings.CREATELOOKUP);
    await io.flowBuilder.click(selectors.mappings.CREATELOOKUP)
    //Validating back arrow not visible
    await io.assert.verifyElementNotBeFound(selectors.homePagePO.GO_BACK)
  });
}); 
