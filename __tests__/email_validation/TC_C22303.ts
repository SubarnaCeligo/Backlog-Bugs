import { test } from "@celigo/ui-core-automation";
import { decrypt } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";
import C22303 from '../../testData/inputData/email_validations/C22303.json'
import admin from "./admin.json"

test.describe("C22303 Verify whether the navigation is appropriate according to the org for which email received.", () => {
  test.beforeEach(async ({ io, page }) => {
    const res1 = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      admin
    );
  });

  test("@Env-All @Zephyr-IO-T293 C22303 Verify whether the navigation is appropriate according to the org for which email received.", async ({ io, page }) => {
    const id = await io.createResourceFromAPI(C22303, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.flowBuilder.delay(1000 * 60 * 15);
    const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22303", true, "pwqa1");
    await io.homePage.navigateTo(res[2].split('>')[0]);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB, 'The app crashed while clicking on the link in the email notification')
  });
});