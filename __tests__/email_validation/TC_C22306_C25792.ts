import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22306 from '../../testData/inputData/email_validations/C22306.json'
import monitor_all_manage_few from "./monitor_all_manage_few.json"
import admin from "./admin.json"

test.describe("C22306 Verified email links navigation for user account with manage and monitor permissions of different integraions", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("C22306 Verified email links navigation for user account with manage and monitor permissions of different integraions", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C22306, "FLOWS");
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        monitor_all_manage_few
      );
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22306",true);
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.loginPagePO.EMAIL_ID);
      await io.assert.verifyElementAttribute(`input${selectors.loginPagePO.EMAIL_ID}`, 'value', 'qaautomation1@celigo.com');
    });
  });