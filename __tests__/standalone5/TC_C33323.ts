
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C33323", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T3053 @Env-All TC_C33323", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_FILTER);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.CLICKBYTEXT, "HTTP");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click("//button[text()='Apply']");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Automation Flows");
    await io.homePage.loadingTime();

    let res = await page.$$(selectors.homePagePO.FIRSTINTEGRATION);
    let viewResponse = await res[0].textContent();

    await io.assert.expectToBeValue(String(viewResponse), "Automation Flows", "");

    const app = await page.$$(selectors.connectionsPagePO.APPLICATION_LIST);
    let appResponse = await app[0].textContent();

    expect(String(appResponse).includes("HTTP")).toEqual(true);

    test.step("*** integrations is filtered as per applications selected ***", async ()=>{});
  });
});
