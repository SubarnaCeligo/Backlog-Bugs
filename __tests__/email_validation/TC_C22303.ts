import { test, expect } from "@celigo/ui-core-automation";
import { decrypt } from "@celigo/aut-utilities";
import { getRemainingMinutes } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";
import C22303 from '../../testData/inputData/email_validations/C22303.json'
import admin from "./admin.json"

test.describe("C22303 Verify whether the navigation is appropriate according to the org for which email received.", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("C22303 Verify whether the navigation is appropriate according to the org for which email received.", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C22303, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, 'io.auto.qa+300@celigo.com');
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt('SU9xYUAxMjM0NTZVaVV4VXNlcg=='));
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22303",true);
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NOTIFICATION);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION, 'Error notifiction not displayed');
      await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION, 'Flow not found');
    });
  });