
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C33645 from "@testData/EM2.0/TC_C33645.json";
import { allure } from "allure-playwright";

test.describe("TC_C33645", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T9832 TC_C33645", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C33645);
await test.step(
      "Created Flow " +
        flows.get(TC_C33645.name)["flowName"] +
        " With ID " +
        flows.get(TC_C33645.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      TC_C33645.name,
      flows.get(TC_C33645.name)["flowId"],
      [1, 0, 1]
    );
    await io.em2.getEm2ErrorTable(
      flows.get(TC_C33645.name)["flowId"]
    );
    await io.flowBuilder.delay(30000);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT
    );
    await io.homePage.isPageReady();
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.homePage.loadingTime();
    var tex;
    if (process.env["ENVIRONMENT"] == "qaprod") {
      tex = await io.homePage.getTextFromElement(
        "tbody > tr:nth-child(1) > td:nth-child(4) > div > div",
        "Zendesk Support"
      );
    } else {
      tex = await io.homePage.getTextFromElement(
        "tbody > tr:nth-child(1) > td:nth-child(4) > div > div",
        "HTTP"
      );
    }
    await io.assert.expectToBeTrue(tex, "");
    test.step("** Checked the error source **", async ()=>{});
    await io.emailPage.closeWindow();
  });
});
