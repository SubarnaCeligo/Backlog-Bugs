import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C23058.json";
  

test.describe("C23058", () => {
  test("@Zephyr-IO-T1435 @Env-All C23058", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);

    var id = await io.api.getFlowId(FTP.name);
    await io.homePage.reloadPage();
    //Run Flow
    test.step("*** Checking Dashboard Count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI( FTP.name, flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );
    var count = await io.api.validateJobCountFromAPI(FTP.name, FTP.qa__expectedDashboardCount);
    test.step("*** Navigate to recyclebin ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, FTP.name);
    await io.homePage.loadingTime()
    await io.homePage.clickButtonBasedOnLabelName(selectors.importPagePO.STATUS+">a", FTP.name);
    await io.homePage.loadingTime()
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click('[data-test="timezone"]');
     
    await page.locator('[role="listbox"]').scrollIntoViewIfNeeded();
    await io.homePage.selectTextfromDropDown(page, "Asia/Magadan");

    await io.homePage.click('[data-test="timezone"]');
     
    await page.locator('[role="listbox"]').scrollIntoViewIfNeeded();
    await io.homePage.selectTextfromDropDown(page, "Pacific/Auckland");
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.goToFlowsPage();
    const result1 = await io.homePage.getText('table>tbody>tr:nth-child(1)>td:nth-child(4)');

    await io.homePage.selectTabInProfileMenu("Profile")
    await io.homePage.loadingTime();
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click('[data-test="timezone"]');
    await page.locator('[role="listbox"]').scrollIntoViewIfNeeded();
    await io.homePage.selectTextfromDropDown(page, "Asia/Magadan");
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.goToFlowsPage();
    const result2 = await io.homePage.getText('table>tbody>tr:nth-child(1)>td:nth-child(4)');
    await io.assert.expectNotToBeValue(String(result1),String(result2), '');

  });
});
