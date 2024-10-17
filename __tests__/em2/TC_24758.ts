
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_24758 from "@testData/EM2.0/TC_24758.json";

test.describe("TC_24758", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T9598 TC_24758|Verify the sub tabs order in the error details vs the preview panel", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_24758);
await test.step(
      "Created Flow " +
        flows.get(TC_24758.name)["flowName"] +
        " With ID " +
        flows.get(TC_24758.name)["flowId"], async () => {
          
        }
    );

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_24758.name,
      flows.get(TC_24758.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_24758.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(
      "[data-test='Export']"
    );
    await io.homePage.loadingTime();
    test.step("Clicked on Export", async ()=>{});
    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("Clicked on Preview", async ()=>{});
    await io.homePage.click(
      selectors.mappings.HTTPRESPONSE
    );
    var preview = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    preview = preview.replace(/(\r\n|\n|\r)/gm, "");
    test.step("***Copied Data from Preview Pannel***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("Clicked on Close", async ()=>{});
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
    await io.homePage.click(selectors.integrationPagePO.HTTPRESPONSEERRORS);
    await io.homePage.loadingTime();
    var response = await io.homePage.getText(
      "div [class='ace_content']"
    );
    test.step("***Copied Data from Error Pannel***", async ()=>{});
    expect(preview).toEqual(response);
await test.step(
      "***Verified ordering of the subtabs between the preview panel and the error details section should be in sync i.e exactly the same***"
, async ()=>{});
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
