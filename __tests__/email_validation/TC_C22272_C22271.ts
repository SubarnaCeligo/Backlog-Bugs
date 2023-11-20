import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22272 from '../../testData/inputData/email_validations/C22272.json'
import admin from "./admin.json"

test.describe("C22272 Verify flow error email from user account which has 2 account permission", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("C22272 Verify flow error email from user account which has 2 account permission", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C22272, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22272",true);
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.loginPagePO.EMAIL_ID)
      await io.assert.verifyElementAttribute(`input${selectors.loginPagePO.EMAIL_ID}`, 'value', 'qaautomation1@celigo.com');
    });
  });