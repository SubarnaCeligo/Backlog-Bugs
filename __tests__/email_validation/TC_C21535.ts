import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C21535 from '../../testData/inputData/email_validations/C21535.json'
import admin from "./admin.json"

test.describe("C21535 Verify email link for > 1000 JOB errors", () => {
  test.beforeEach(async ({ io, page }) => {
    const res1 = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      admin
    );
  });

  test("@Env-All @Zephyr-IO-T287 C21535 Verify email link for > 1000 JOB errors", async ({ io, page }) => {
    const id = await io.createResourceFromAPI(C21535, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime()
    await io.homePage.reloadPage()
    await io.flowBuilder.delay(1000 * 60 * 15);
    const res = await io.emailVal.getLinkFromEmail("1 new errors: TC_C21535", true, "pwqa1");
    await io.homePage.navigateTo(res[2].split('>')[0]);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB, 'Error dashboard did not open');
  });
});