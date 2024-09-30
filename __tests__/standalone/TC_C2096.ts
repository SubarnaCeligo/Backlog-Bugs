
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C2096.json";

test.describe("TC_C2096", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T1838 TC_C2096", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var connection = HTTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, connection);
    test.step("*** Choosing the Zendesk HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP ");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** CLicked on advanced section ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CONFIGASYNCHELPER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ASYNCHELPERTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const asynchelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectNotToContainValue(String(asynchelptext), "If data is exported asynchronously, check this field to select the Async Helper configuration to be used.", "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.flowBuilderPagePO.ASYNCHELPERIDTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const generatorhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(generatorhelptext)).toContain("Select an existing Async Helper configuration or create a new one to be used for async response processing.");
    test.step("*** Verified The helptexts should be shown correctly for all the fields ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
