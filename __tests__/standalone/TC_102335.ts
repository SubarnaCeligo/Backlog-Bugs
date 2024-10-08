import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C102335", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T25641 TC_C102335", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Clicking on Add Source ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    test.step("*** selecting Slack ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SLACK);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_WEBHOOK_EXPORT);
    // await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "slack");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.REALTIME_KEY_TYPE, "test");

    //Updated the locator
    await io.homePage.click('[aria-label="Generate URL"]');
    test.step(" Clicking on Generate URL button", async ()=>{});
    await io.homePage.loadingTime();

    //Updated the assertion as getText is not retreiving data from "input" box
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.WEBHOOKPUBLICURL, 'value', '/data');
    test.step("*** Validating the data ***", async ()=>{});
    //DOUBT  NOT ABLE TO GET THE DATA @'[data-test='webhook.url'] input' which is blank/empty
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.REALTIME_KEY_TYPE, "testss");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
