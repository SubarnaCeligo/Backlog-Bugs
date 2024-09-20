import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45326", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T3169 @Env-All TC_C45326", async ({io,page}, testInfo) => { //div[@id='react']/div/div/div/div/div/div/span/div/div
    await io.homePage.loadingTime();
    await io.homePage.selectTabInHelperMenu("Product portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const heading = await io.homePage.isVisible('text="Product portal"')
    await io.assert.expectToBeValue(heading.toString(), 'true', "") 
    await test.step("*** Verified Title is displayed ***",()=>{});
    await test.step("*** Verified  the Title(Header) should be Celigo Product portal ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});