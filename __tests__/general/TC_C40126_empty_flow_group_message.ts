import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C40126", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T5977 @Enc-All TC_C40126", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();
    var intId = await io.api.getIntegrationId("Don't use");


    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP);
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use1");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime()

    let tableBody = await io.homePage.getText(selectors.integrationPagePO.TABLEBODY)
    await io.assert.expectToBeValueInArray(tableBody, "Don't use", "");
    await io.assert.expectToBeValueInArray(tableBody, "No flows have been added to this group.", "");
    await io.assert.expectToBeValueInArray(tableBody, "Don't use1", "");
    await io.assert.expectToBeValueInArray(tableBody, "No flows have been added to this group.", "");

    await io.api.deleteIntegration(intId);
    

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
