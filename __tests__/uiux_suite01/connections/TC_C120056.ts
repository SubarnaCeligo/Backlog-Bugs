import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C120056 from '../../../testData/inputData/Connections/C120056.json'

test.describe(`TC_C120056`, () => {
  test(`@Env-All @Zephyr-IO-T18657 C120056  Verify cloned integration has the Plain text option for media type`, async ({
    io,
    page
  }) => {
   var k =  await io.createResourceFromAPI(C120056, "FLOWS");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached("text='TC_C120056'")
    await io.homePage.clickByTextByIndex("TC_C120056", 0);
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
