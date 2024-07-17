import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("API manager redirect production ", () => {
  test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING API manager redirect production", async ({ io, page, context }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DRAWERTOGGLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMANAGER);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime()
    await page.waitForTimeout(5000);
    await io.flowBuilder.delay(15000);
    const allPages = context.pages();
    await allPages[1].bringToFront();
    await allPages[1].waitForLoadState();
    const locator = await allPages[1].getByText("API Management");
    const currentUrl = await allPages[1].url();
    const apim = await locator.textContent();
    await io.assert.expectToBeTrue(apim.toString().includes("API Management"), "APIM page not found");
    const expectedUrl = 'integrator.io/#!/production/';
    const func = currentUrl.toString().includes(expectedUrl)
    await io.assert.expectToBeTrue(func, "urls doesn't match")
  });
});
