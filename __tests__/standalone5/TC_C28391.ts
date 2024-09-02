
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28391", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All TC_C28391 @Zephyr-IO-T889", async ({io,page}, testInfo) => {
    const result = await io.homePage.getText('h3');
    await io.assert.expectToContainValue("My integrations", String(result), "");

    test.step("*** Home page with all the integration tiles are loaded by default ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
