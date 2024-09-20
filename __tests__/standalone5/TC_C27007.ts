
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("C27007 Security Breadcrumbs Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T5093 @Env-All TC_C27007 Verify launching using invalid org id.", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(`${io.data.links.FLOW_BUILDER_PAGE_URL}/sso/celigo1`);
    await io.homePage.loadingTime();
    io.assert.verifyElementContainsText('body', 'Invalid organization id.')
  });
});
