
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51675 from "@testData/EM2.0/TC_C51675.json";

test.describe("TC_C51675", () => {

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19826 TC_C51675", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("Mysql to mysql flow_DND");
    test.step("Clicked on the flow", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();
    const text = (await io.homePage.getText(selectors.basePagePO.ACE_CONTENT)).toString();
    test.step("Retrieved first error message.", async ()=>{});

    await io.homePage.click("[data-test='nextError']");
    const text1 = (await io.homePage.getText(selectors.basePagePO.ACE_CONTENT)).toString();
    await io.assert.expectNotToBeValue(text, text1, "");
    test.step("Error Editor displayed next error message.", async ()=>{})

    await io.homePage.click("[data-test='previousError']");
    const firsttextagain = await io.homePage.getText(selectors.basePagePO.ACE_CONTENT);
    await io.assert.expectToBeValue(String(firsttextagain), text, "");
await test.step(
      " Verfied the screen navigates to Previous error's 'Edit Retry Data' tab "
, async ()=>{});
    // C51675 done
  });
});
