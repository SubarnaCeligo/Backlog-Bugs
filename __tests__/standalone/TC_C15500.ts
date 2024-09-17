
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C15500", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Go To Flows Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1851 TC_C15500", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.connectorUrl + "scripts");
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("Clicked On Create Script", async ()=>{});
    await io.homePage.click(`[id='insertFunction'] ${selectors.exportsPagePO.HELP_TEXT_ICLIENT}`);
    test.step("Clicked On Insert Function Stub Helptext", async ()=>{});
    
    var text = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    var expected =
      "Select a function stub to add a model entry point for a built-in hook. Each stub includes example parameters, a return value, and self-documenting comments.";
    test.step("Insert Function Stub Helptext Is As Expected", async ()=>{});
    expect(text).toContain(expected);

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(`[id="content"] ${selectors.exportsPagePO.HELP_TEXT_ICLIENT}`);
    test.step("Clicked On Edit Content Helptext", async ()=>{});
    var text1 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    var expected1 =
      "Edit your script in the pane below, or expand the view by using the control. Your script should be valid JavaScript and may contain multiple functions that can be used across a range of flows within your account.";
    test.step("Edit Content Helptext Is As Expected", async ()=>{});
    expect(text1).toContain(expected1);
  });
});
