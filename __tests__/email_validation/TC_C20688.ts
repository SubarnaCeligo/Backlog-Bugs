import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C20688 from '../../testData/inputData/email_validations/C20688.json'
import admin from "./admin.json"

test.describe("C20688 EM 2.0- email notification - clicking on 'Unsubscribe'  in the email should navigate to Notifications page of the integration(Only for Flow Error Notification)", () => {
  test.beforeEach(async ({ io, page }) => {
    const res1 = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      admin
    );
  });

  test("@Env-All @Zephyr-IO-T277 C20688 EM 2.0- email notification - clicking on 'Unsubscribe'  in the email should navigate to Notifications page of the integration(Only for Flow Error Notification)", async ({ io, page }) => {
    const id = await io.createResourceFromAPI(C20688, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime()
    await io.homePage.reloadPage()
    await io.flowBuilder.delay(1000 * 60 * 15);
    const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C20688", true, "pwqa1");
    await io.homePage.navigateTo(res[5].split('\\')[0]);
    await io.flowBuilder.waitForElementAttached('text="Notify me of flow error"')
    await io.assert.verifyElementDisplayedByText('Notify me of flow error', 'Notify me of flow error is not displayed');
    await io.assert.verifyElementDisplayedByText('Notify me when connection goes offline', 'Notify me when connection goes offline is not displayed');
  });
});