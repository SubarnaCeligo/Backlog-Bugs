import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C23879 from "@testData/EM2.0/TC_C23879.json";


test.describe("TC_C33286", () => {
  test.beforeEach(async ({io,page}, testInfo) => {

    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C23879);
await test.step(
      "Created Flow " +
        flows.get(TC_C23879.name)["flowName"] +
        " With ID " +
        flows.get(TC_C23879.name)["flowId"],async () => {
          
        }
    );

    await io.api.checkJobStatusFromAPI(
      TC_C23879.name,
      flows.get(TC_C23879.name)["flowId"],
      [1, 0, 1]
    );
    await io.homePage.loadingTime();

  });
  test("@Zephyr-IO-T1467 @Env-All  TC_C33286_Verify if the user checked the checkbox, on all the dashboards it is displayed in relative format like 1hour ago.", async ({io,page}, testInfo) => {
    var lastUpdatedArray1 = [];
    var lastUpdatedArray2 = [];
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile")
    await test.step("*** Clicking on Profile ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

     var checkBox1 = await (
        await page.locator(
           selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        )
      ).getAttribute("value");

      if(checkBox1 === "false") {
        await io.homePage.click(
          selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX
        );
        await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      }
      await io.homePage.loadingTime();
      await io.homePage.isPageLoaded();
      await io.homePage.click(selectors.basePagePO.DASHBOARD);
      await io.homePage.loadingTime();
      await test.step("*** Clicked on dashboard ***",()=>{});
      await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
      await io.homePage.isVisible(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
      await io.homePage.loadingTime();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      let lastUpdated1 = await page.$$(
        selectors.myAccountPagePO.LOCAL_DATE_TIME
      );
      lastUpdatedArray1 = [];
      for (let i of lastUpdated1) {
        let text = await i.textContent();
        if (text != "") {
          lastUpdatedArray1.push(text);
        }
      }
      if(lastUpdatedArray1[0].includes("ago")) {
      await io.assert.expectToContainValue("ago",lastUpdatedArray1[0],"");
      }
    
  });
});
