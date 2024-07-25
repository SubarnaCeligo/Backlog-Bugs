import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C27561 from '../../testData/inputData/email_validations/C27516.json'
import admin from "./admin.json"

test.describe("C27516 User is navigated to sandbox after clicking on a link received from EM 2.0 flow error notification.", () => {
    test.beforeEach(async ({io, page}) => {
      const res1 = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
    });

    test("@Env-STAGING @Zephyr-IO-T307 C27516 User is navigated to sandbox after clicking on a link received from EM 2.0 flow error notification.", async ({io, page}) => {
      const id = await io.createResourceFromAPI(C27561, "FLOWS");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
      await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.homePage.loadingTime()
      await io.homePage.reloadPage()
      await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
      await io.flowBuilder.delay(1000 * 60 * 15);
      const res = await io.emailVal.getLinkFromEmail("1 new error: TC_C27516",true, "pwqa1");
      await io.homePage.navigateTo(res[2].split('>')[0]);
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
      await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
      await io.assert.verifyElementAttribute(selectors.homePagePO.PRODUCTION_BUTTON, 'aria-pressed', 'true');
    });
  });