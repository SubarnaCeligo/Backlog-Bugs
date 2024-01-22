
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C30843_C30848_scriptDebugger.json";

test.describe("TC_C30843_C30848_scriptDebugger", () => {
  test.beforeEach(async ({io}) => {
    let postSubmit = await io.api.getScriptId(FTP.scriptBody.name);
    if (!postSubmit)
      postSubmit = await io.api.createScriptViaAPI(
        FTP.scriptBody
      );
    await test.step("*** Navigating to Flows Page ***",()=>{});
    await io.goToFlowsPage();
  });
  test("TC_C30843_C30848_scriptDebugger", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);

    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await test.step("*** Navigated to the flow based on ID ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click("[id='scripts']");
    await test.step("*** Clicked on scripts tab ***",()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    await test.step("*** Clicked on action menu of script ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);
    await test.step("*** Clicked on execution logs of script ***",()=>{});
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.click(
      selectors.myAccountPagePO.DATEFILTER
    );
await test.step(
      "*** Clicking on date filter in script execution logs ***"
, async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.DATERANGEOPTION,
      "Custom"
    );
    await test.step("*** Clicking on custom date range ***",()=>{});

    await io.homePage.click(
      selectors.integrationPagePO.SELECTTODAY
    );
await test.step(
      "*** Selecting today's date from the options ***"
, async ()=>{});

    await io.homePage.click(
      selectors.integrationPagePO.APPLYSELECTRANGE
    );
    await test.step("*** Clicking on apply ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.myAccountPagePO.PAUSEFETCH
    );

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    let text = await io.homePage.getText(
      selectors.myAccountPagePO.FETCHEXCUTIONTEXT
    );
    await expect(text).toContain("Fetching paused... ");
await test.step(
      "*** Verified Fetching Pauses on clicking on Pause button ***"
, async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.myAccountPagePO.RESUMEFETCH
    );

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    let text1 = await io.homePage.getText(
      selectors.myAccountPagePO.FETCHEXCUTIONTEXT
    );
    await expect(text1).toContain("Fetching logs... ");
await test.step(
      "*** Verified Fetching logs on clicking on Resume button ***"
, async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to homePage ***",()=>{});
  });
});
