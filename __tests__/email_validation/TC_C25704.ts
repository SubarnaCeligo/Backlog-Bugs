import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C25704 from '../../testData/inputData/email_validations/C25704.json'
import admin from "./admin.json"

test.describe("C25704 Verify the hyperlinks on email must navigate to expected org account if account user has access to more than 5 orgs", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("C25704 Verify the hyperlinks on email must navigate to expected org account if account user has access to more than 5 orgs", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C25704, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.flowBuilder.clickByText('Playwright Automation');
      await io.flowBuilder.clickByText('IO Automation');
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C22303",true);
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
      await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
      await io.assert.verifyElementDisplayedByText('Playwright Automation', 'Playwright Automation org is not selected');
    });
  });