
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C36480", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C36480", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "templates");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click("[data-test='addNewListing']");
    await test.step("*** clicked on create Template ***",()=>{});

    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Apps"
    );
    await test.step("*** Naming the Template name  ***",()=>{});
    await io.homePage.click(
      "[id='applications']"
    );
    await test.step("*** Clicking on Applications  ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FIVE);
    await io.homePage.click(
      selectors.flowBuilderPagePO.PLCENTRAL
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CASTPLUS
    );
    await io.homePage.click(selectors.flowBuilderPagePO.ACCELO);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTON);
await test.step(
      "*** Creating template with more than 4 apps   ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.click("//input[@type='text']");
    await io.homePage.fillWebPage(
      "//input[@type='text']",
      "Apps"
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      "[data-test='logoStrip']"
    );
await test.step(
      "*** Verified logostrip component has been added to the templates   ***"
, async ()=>{});
    await io.homePage.click(
      "[id='additionalApps']"
    );
await test.step(
      "*** Verified the logos should be expandable when clicked on +   ***"
, async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
