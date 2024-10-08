
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C33443.json";
import SF from "@testData/STANDALONE/SF_EM2.json";

test.describe("TC_C33443", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T9737 TC_C33443", async ({io, page}) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    const flowId = flows.get(TC.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    test.step("*** Entering into the created flow ***", async ()=>{});

    await io.homePage.click(
      selectors.flowBranchingPO.ROUTER_BUTTON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.MENUITEM
    );
await test.step(
      "*** Clicking on plus icon of lookup and clicked on lookup ***"
, async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    test.step("*** Selected SF as the adaptor ***", async ()=>{});

    await io.homePage.click(
      selectors.mappings.LOOKUP_RECORD
    );

    await page.getByText("Create flow step").click();
    await io.homePage.loadingTime();
    test.step("*** Selecting Lookup ***", async ()=>{});

    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'SALESFORCE CONNECTION');
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
await test.step(
      "*** Choosing the desired Salesforce connection ***"
, async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on the NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "AutomationStandalone_TC_C33443_LOOKUP"
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SF_SOQL_QUERY,
      "Select id,name,invalidColumnName from Account"
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    // await io.homePage.click(
    //   "[aria-label='Close']"
    // );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

await test.step(
      "*** Filling all the details of LOOKUP and saving test ***"
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [1, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);

    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    var err1 = await io.homePage.getText(
      "tr.Mui-selected"
    );
    err1 = String(err1).replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' '); 
    await expect(err1).toContain(
      "Select id,name,invalidColumnName from Account ^ ERROR at Row:1:Column:16 No such column 'invalidColumnName' on entity 'Account'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names."
    );
    test.step("*** Checking the error ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEW_REQUEST
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on the HTTP Request option ***", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.OTHER
    );
    await io.homePage.loadingTime();
await test.step(
      "*** Clicking on the Other tab of HTTP Request option ***"
, async ()=>{});

    var httpRequest = await io.homePage.getText(
      selectors.flowBuilderPagePO.ERROR_DATA
    );
    await io.assert.expectToContainValue("https://do0000000catveay-dev-ed.my.salesforce.com/services/data/v61.0/query/?q", String(httpRequest),"");
    test.step("*** Checking the query ***", async ()=>{});

    await io.assert.expectToContainValue('"method"', String(httpRequest), "");
await test.step(
      "*** Checking that the field name of method ***"
, async ()=>{});

      await io.assert.expectToContainValue('"GET"', String(httpRequest), "");
await test.step(
      "*** Checking that the field value of method is GET ***"
, async ()=>{});
    await page.getByText("HTTP response").nth(1).click();
    test.step("*** Swithching to HTTP Response tab ***", async ()=>{});

    var httpResponse = await io.homePage.getText(
      selectors.flowBuilderPagePO.ERROR_DATA
    );
    await io.assert.expectToContainValue('"errorCode"', String(httpResponse), "");
await test.step(
      "*** Checking that the field name is error code***"
, async ()=>{});
    
    await io.assert.expectToContainValue('"INVALID_FIELD"', String(httpResponse), "");
await test.step(
      "*** Checking that the error code is INVALID_FIELD ***"
, async ()=>{});
  });
});
