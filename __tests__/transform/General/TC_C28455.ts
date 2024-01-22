
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import SF from "@testData/GENERAL/TC_C28455.json";
test.describe("TC_C28455", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C28455", async ({io,page}, testInfo) => {
    if (
      process.env["NODE_ENV"] == "qa" ||
      process.env["NODE_ENV"] == "qaprod"
    ) {
      var flows = await io.api.createImpOrExpAndFlowsThruAPI(SF);
await test.step(
        "*** Created Flows :" + flows.get(SF.name)["flowName"]
, async ()=>{});
      await io.homePage.reloadPage();
      await io.flowBuilder.navigateToTheFlow(
        flows.get(SF.name)["flowId"]
      );
    } else {
      var flows1 = await io.api.createImpOrExpAndFlowsThruAPI(SF.Staging);
await test.step(
        "*** Created Flows :" + flows1.get(SF.name)["flowName"]
, async ()=>{});
      await io.homePage.reloadPage();
      await io.flowBuilder.navigateToTheFlow(
        flows1.get(SF.name)["flowId"]
      );
    }
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCRIPTS
    );
    await test.step("***Clicked on Script ***",()=>{});

    //Name
    await io.homePage.isPageLoaded();
    await io.homePage.click(".MuiTableSortLabel-root");
    var NameBeforeSorting = await io.homePage.getText(
      selectors.connectionsPagePO.CONNECTIONNAMEFROMROW
    );
    await io.homePage.click(".MuiTableSortLabel-root");
    await test.step("*** clicked on Last updated***",()=>{});
    var NameAfterSorting = await io.homePage.getText(
      selectors.connectionsPagePO.CONNECTIONNAMEFROMROW
    );

    //Last Updated
    var ScriptBeforeSortingTime = await io.homePage.getText(
      selectors.connectionsPagePO.CONNECTIONNAMEFROMROW
    );
    await io.homePage.click(selectors.basePagePO.TIME);
    await test.step("*** clicked on Last updated***",()=>{});
    var ScriptAfterSortingTime = await io.homePage.getText(
      selectors.connectionsPagePO.CONNECTIONNAMEFROMROW
    );
    expect(NameBeforeSorting).not.toEqual(NameAfterSorting);
await test.step(
      "*** Sorting is working properly in Name tab***"
, async ()=>{});
    expect(ScriptBeforeSortingTime).not.toEqual(ScriptAfterSortingTime);
await test.step(
      "*** Sorting is working properly in Time tab.***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
