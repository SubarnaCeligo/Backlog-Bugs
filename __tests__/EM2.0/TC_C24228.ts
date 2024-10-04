
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24228", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7199 TC_C24228|Verify Retry Dropdown error options", async ({io,page}, testInfo) => {
    //Open flow
    test.step("Clicking on the flow Mysql to mysql flow_DND", async ()=>{});
    var flowId = await io.api.getFlowId("Mysql to mysql flow_DND");
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    test.step("Selecting errors by clicking on checkboxes", async ()=>{});

    await io.homePage.clickButtonByIndex(
      selectors.myAccountPagePO.ERROR_CHECKBOX,
      1
    );
    await io.homePage.clickButtonByIndex(
      selectors.myAccountPagePO.ERROR_CHECKBOX,
      3
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );

    var selectedErrorCount = await (
      (await io.homePage.getText(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_SELECTED)).toString())
      .replace(/\r?\n|\r/g, " ")
      .split(" ")[0];
    var allErrorText = await (
      (await io.homePage.getText(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL)).toString()).replace(/\r?\n|\r/g, " ");
    test.step("Verifying Retry Dropdown options", async ()=>{});
    await io.assert.expectToBeValue(String(selectedErrorCount), "2", "");
    await io.assert.expectToBeValue(String(allErrorText), "1000 retriable errors", "");
  });
});
