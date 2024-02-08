import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`TC_C119670`, () => {
  test(`C119670  Verify cloned integration has the Plain text option for media type`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='TC_C27545'")
    await io.homePage.clickByText("TC_C27545")
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
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.PLAINTEXT, 'Plain text');
});
});
