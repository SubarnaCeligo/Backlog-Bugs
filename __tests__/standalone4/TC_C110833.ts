
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C110833", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });
  test("TC_C110833 @Zephyr-IO-T15662 @Env-All", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.INTEGRATORAPPLICATION);
   
    test.step("*** Selected IO as export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_WEBHOOK_EXPORT);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    test.step(" Clicking on Generate URL button", async ()=>{});
    await io.homePage.loadingTime();

    const OASLink = await page.locator(selectors.flowBuilderPagePO.WEBHOOKPUBLICURL);
    const link = await OASLink.inputValue();
    const isOASLinkAvailable = link?.trim() !== "";

    await io.assert.expectToBeTrue(isOASLinkAvailable, "OAS link is not available");

    test.step("*** Verified if user is able to see the OAS link in integrator.io webhook when the flow is partially configured. ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step(" Clicking on close button", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
