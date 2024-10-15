import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C36480", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2293 @Env-All  TC_C36480", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "templates");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.CREATETEMPLATE);
    await test.step("*** clicked on create Template ***",()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Apps");
    await test.step("*** Naming the Template name  ***",()=>{});
    await io.homePage.clickByIndex(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input", 0);
    await test.step("*** Clicking on Applications  ***",()=>{});

    var toBePresentApps = ["15five", "3pl central", "4castplus", "accelo", "act-on"];
    for(var j in toBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input[type='text']").nth(0)
      ).fill(toBePresentApps[j]);
      
      await io.homePage.clearTextValue((`${selectors.integrationPagePO.CREATEIA_APPLICATIONS} input`));
      await page.keyboard.press('Enter');

    }

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    if (await io.homePage.isVisible('text="A document already exists. Please contact celigo support for further assistance."'))
    {
      await io.homePage.click(selectors.basePagePO.CLOSE);
      await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES)
    }
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Apps");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.LOGOSTRIP);
    await test.step("*** Verified logostrip component has been added to the templates   ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADDITIONALAPPS);
    await test.step("*** Verified the logos should be expandable when clicked on +   ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
