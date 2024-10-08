
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/EM2.0/TC_C24816_C24818_C24757_C24759.json";
import { allure } from "allure-playwright";

test.describe("TC_C24816_C24818_C24757_C24759", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T9604 @Zephyr-IO-T9606 @Zephyr-IO-T9597 @Zephyr-IO-T9599 TC_C24816|Verify if you are able to switch the subtabs and also the tabs TC_C24818|Verify if the UX is not disturbed when the tabs are switched TC_C24757|Verify if the tabs are added under 'View HTTP Request' and 'View HTTP Response' in the error details section TC_C24759|Verify if 2 new actions are added in the action dropdown for both open and resolved errors", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
await test.step(
      "Created Flow " +
        flows.get(HTTP.name)["flowName"] +
        " With ID " +
        flows.get(HTTP.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      HTTP.name,
      flows.get(HTTP.name)["flowId"],
      [0, 0, 1]
    );
    
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await page.getByText("HTTP response").click();
    test.step("View HTTP Response", async ()=>{});
    var responseBody = await page.locator(
      selectors.flowBuilderPagePO.EM2DOT0PO.BODY).isVisible();
    await io.assert.expectToBeTrue(responseBody, "");
    test.step("Verified Body tab shown as default", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.OTHER
    );
    test.step("Clicked on Other Tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.HEADERS
    );
    test.step("Clicked on Headers Tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.BODY
    );
    test.step("Clicked on Body Tab", async ()=>{});
    await io.homePage.loadingTime();
    await page.getByText("HTTP request").click();
    test.step("View HTTP Request", async ()=>{});
    var requestBody = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.BODY).isVisible();
    await io.assert.expectToBeTrue(requestBody, "");
    test.step("Verified Body tab shown as default", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.OTHER
    );
    test.step("Clicked on Other Tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.HEADERS
    );
    test.step("Clicked on Header Tab", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.BODY
    );
    test.step("Clicked on Body Tab", async ()=>{});

    //Resolve Errors
    await page.getByText("Resolve & next").click();
    test.step("Click on the resolve button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB
    );
    test.step("Open the resolved errors subtab ", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
    test.step("Click on the action button", async ()=>{});
    await page.getByText("View HTTP response").click();
    test.step("View HTTP Response", async ()=>{});
    await page.getByText("HTTP request").click();
    test.step("HTTP Request", async ()=>{});
  });
});
