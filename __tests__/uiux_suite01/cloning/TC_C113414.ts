import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C113414 Verify the JWT token while cloning the flow`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  
  });
test(`C113414 Verify the JWT token while cloning the flow`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='Docsign_DND'")
    await io.homePage.clickByText("Docsign_DND")
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.click(selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION);
    await io.flowBuilder.selectTextfromDropDown(page,"none");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
   await io.homePage.clickByTextByIndex("FTP CONNECTION",1)
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.connectionPage.clickByTextByIndex("CONNECTION_DOCSIGN",1);
  });
});
