import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C9744.json";
import TC1 from "@testData/FlowBuilder/TC_C20054.json";

test.describe("TC_C42652", () => {
  test("@Env-All @Zephyr-IO-T3069", async ({ io, page }) => {
    await test.step(
      "***Navigated To The Account Which Has Multiple Imports, Exports, Flows, Integrations***"
      , async () => { });
    await io.homePage.navigateTo(io.connectorUrl + "imports");
    test.step("***Navigated To The Imports Page***", async () => { });
    await io.homePage.loadingTime();
    var time = await io.homePage.checkResponseTime();
    test.step("***Imports Page Is Loaded In" + time + "***", async () => { });
    await io.homePage.click(
      selectors.integrationPagePO.LOAD_MORE
    );
    test.step("***User Is Able To Load More***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.NETSUITE_CONNECTION
    );
    var result = await page.$(
      "div.MuiPaper-elevation16 > div");
    test.step("***Able To Create New Imports***", async () => { });
    expect(result.isVisible()).toBeTruthy();

    await io.homePage.navigateTo(io.connectorUrl + "exports");
    test.step("***Navigated To The Exports Page***", async () => { });
    await io.homePage.loadingTime();
    var time1 = await io.homePage.checkResponseTime();
    await test.step(
      "***Exports Page Is Loaded In" + time1 + "***"
      , async () => { });
      await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.LOAD_MORE
    );
    test.step("***User Is Able To Load More***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.NETSUITE_CONNECTION
    );
    var result1 = await page.$(
      "div.MuiPaper-elevation16 > div");
    test.step("***Able To Create New Imports***", async () => { });
    expect(result1.isVisible()).toBeTruthy();

    await io.homePage.navigateTo(io.connectorUrl + "connections");
    test.step("***Navigated To The connections Page***", async () => { });
    await io.homePage.loadingTime();
    var time2 = await io.homePage.checkResponseTime();
    await test.step(
      "***Exports Page Is Loaded In" + time2 + "***"
      , async () => { });
      await io.homePage.loadingTime();
    if (await page.$(selectors.integrationPagePO.LOAD_MORE)!== null) {
      await io.homePage.click(
        selectors.integrationPagePO.LOAD_MORE
      );
    }
    test.step("***User Is Able To Load More***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.NETSUITE_CONNECTION
    );
    var result2 = await page.$(
      "div.MuiPaper-elevation16 > div");
    test.step("***Able To Create New Imports***", async () => { });
    expect(result2.isVisible()).toBeTruthy();
  });
    test("@Env-All @Zephyr-IO-T3076", async ({io}) => {
      //*Create Flow
      await io.api.createImpOrExpAndFlowsThruAPI(TC);
      var flowId = await io.api.getFlowId(TC.name);
      await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
      await io.homePage.loadingTime();
  await test.step(
        "***Navigated To FlowBuilder For The Created Flow***"
  , async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.IMPORT_MAPPINGS
      );
      test.step("***Navigated To Import Mapping Page***", async ()=>{});
      var text = await io.homePage.getText(
        selectors.flowGroupingPagePO.ALERT_MESSAGE
      );
      var expected =
        "Invalid or unauthorized connection. Please authorize the Salesforce connection.";
  await test.step(
        "***Connection Offline Error Message Is shown***"
  , async ()=>{});
      expect(text).toContain(expected);
    });
    test("@Env-All @Zephyr-IO-T2929", async ({io,page}) => {
      //*Create Flow
      await io.api.createImpOrExpAndFlowsThruAPI(TC1);
      var flowId = await io.api.getFlowId(TC1.name);
      await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
      await io.homePage.loadingTime();
  await test.step(
        "***Navigated To FlowBuilder For The Created Flow***"
  , async ()=>{});
      await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
      test.step("***Opened mysql Imports Page***", async ()=>{});
      await io.homePage.loadingTime();
      var checked =await (await page.$(
      selectors.flowBuilderPagePO.IGNORE_EXISTING
      )).isChecked();
      if (checked == true) {
        test.step("***Checked The Existing Records***", async ()=>{});
      } else {
        await io.homePage.click(
          selectors.flowBuilderPagePO.IGNORE_EXISTING
        );
        test.step("***Checked The Existing Records***", async ()=>{});
      }
      await io.homePage.click(
        selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
      );
      await io.homePage.click(
        selectors.flowBuilderPagePO.DBLOOKUP
      );
      test.step("***Navigated To Import Lookup Page***", async ()=>{});
      await io.homePage.click(
        selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
      );
      test.step("***Clicked On Static Lookup***", async ()=>{});
      await io.homePage.click(
        selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
      );
      await io.homePage.click(
       selectors.mappings.STATICLOOKUPIMPORT
      );
  await test.step(
        "***User Is Able To Navigate Between Boxes When clicked***"
  , async ()=>{});

      await io.homePage.click(
       selectors.mappings.STATICLOOKUPEXPORT
      );
      await io.homePage.fillWebPage(
        selectors.mappings.STATICLOOKUPEXPORT,
        "name"
      );
  await test.step(
        "***User is not allowed to type in the text box until test is clicked***"
  , async ()=>{});
      try {
        await io.homePage.fillWebPage(
          selectors.mappings.STATICLOOKUPIMPORT,
          "name"
        );
      } catch (e) {
        //console.log("User is not allowed to type in the text box until test is clicked");
      }
    });
});
