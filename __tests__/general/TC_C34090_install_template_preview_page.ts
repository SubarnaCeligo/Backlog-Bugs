import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C34090_install_template_preview_page.json";

test.describe("TC_C34090", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5972 @Env-All  TC_C34090", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(
      io.connectorUrl + "marketplace"
    );
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Marketplace ***",()=>{});
    await io.homePage.isPageReady();
    // await io.homePage.clearTextValue(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    await io.homePage.click(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
 
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP");
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    const dropDownItem = await page.$$(selectors.homePagePO.INSTALL_TEMPLATE);
    await dropDownItem[0].click();

    var templateInstallPage = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.DRAWER
    );
    await io.assert.expectToBeTrue(templateInstallPage, "");
    var templateInstallPage_Text = await io.homePage.getTextFromElement(
      "//div[text()='Install template']",
      "Install template"
    );
    await io.assert.expectToBeTrue(templateInstallPage_Text, "");

    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
 
    expect(templateInstallPage).toBe(true);
    expect(templateInstallPage_Text).toBe(true);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
