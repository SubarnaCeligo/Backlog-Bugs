import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22304 from '../../testData/inputData/email_validations/C22304.json'
import manage_all_monitor_few from "./manage_all_monitor_few.json"
import admin from "./admin.json"

test.describe("C22304 Verify email notification navigation with multiple users who has manage and monitor permission for selected integrations", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("@Env-STAGING @Zephyr-IO-T294 C22304 Verify email notification navigation with multiple users who has manage and monitor permission for selected integrations", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C22304, "FLOWS");
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        manage_all_monitor_few
      );
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.homePage.loadingTime()
    await io.homePage.reloadPage()
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22304",true, "pwqa1");
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.loginPagePO.EMAIL_ID)
      await io.assert.verifyElementAttribute(`input${selectors.loginPagePO.EMAIL_ID}`, 'value', 'qaautomation1@celigo.com');
    });
  });