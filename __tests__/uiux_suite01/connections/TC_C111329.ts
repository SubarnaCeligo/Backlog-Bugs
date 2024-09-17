import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C111324.json";

test.describe(`TC_C111329`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-QA @Env-STAGING @Zephyr-IO-T8854 TC_C111329", async ({io, page}) => {
    await io.homePage.loadingTime()
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.click(selectors.basePagePO.CLOSE);  
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS) 

    await io.flowBuilder.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
    
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 2);
    await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.OPEN_ACTION_CLICK);
 
    await io.assert.verifyElementIsDisplayed(
    selectors.importPagePO.AUTO_POPULATE_MAPPINGS,
    "Auto-populate is not present"
  );

  });
});
