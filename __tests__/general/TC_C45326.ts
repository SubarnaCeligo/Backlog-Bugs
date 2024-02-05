
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45326", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C45326", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.selectTabInHelperMenu("Product portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    let title = await io.homePage.getText('//*[@id="react"]/div[1]/div[1]/div[1]/div[1]/div[2]/div/span/div/div');
    await io.assert.expectToBeValue(String(title), "Celigo: Product portal", "");
    await test.step("*** Verified Title is displayed ***",()=>{});
    await test.step("*** Verified  the Title(Header) should be Celigo Product portal ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
