
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/GENERAL/TC_C2221_installTemplate.json";

test.describe("TC_C45559", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C45559", async ({io,page}, testInfo) => {
    await test.step("*** Navigating to license url ***",()=>{});
    if (process.env["NODE_ENV"] == "qa") {
      await io.homePage.navigateTo(TC.qa_lic);
    } else if (process.env["NODE_ENV"] == "qaprod") {
      await io.homePage.navigateTo(TC.qaprod_lic);
    } else if (process.env["NODE_ENV"] == "platformone") {
      await io.homePage.navigateTo(TC.platformone_lic);
    } else {
      await io.homePage.navigateTo(TC.staging_lic);
    }
    // let SS0Text = await (
    //   page.$(selectors.flowBuilderPagePO.LICENSEBODY)
    // ).getText();

    let SS0Text = await io.homePage.getText(selectors.flowBuilderPagePO.LICENSEBODY)
    await expect(SS0Text).toContain('"sso":true');
     

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
