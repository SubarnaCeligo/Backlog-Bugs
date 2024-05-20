import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22310 from '../../testData/inputData/email_validations/C22310.json'
import admin from "./admin.json"

test.describe("C22310 Verify unsubscribe link for user accounts whether navigating to particular integration", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("@Env-STAGING @Zephyr-IO-T297 C22310 Verify unsubscribe link for user accounts whether navigating to particular integration", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C22310, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.homePage.loadingTime()
      await io.homePage.reloadPage()
      console.log("Waiting for 15 minutes");
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22310",true, "pwqa1");
      await io.homePage.navigateTo(res[5].split('\\')[0]);
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.loginPagePO.EMAIL_ID)
      await io.assert.verifyElementAttribute(`input${selectors.loginPagePO.EMAIL_ID}`, 'value', 'qaautomation1@celigo.com');
    });
  });