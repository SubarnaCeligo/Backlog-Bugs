
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1088", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1088_Verify_AbleTOAccess_RecycleBin_From_T&H_header", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(
      io.connectorUrl + "recycleBin"
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var recycleBin =await (await page.$(selectors.integrationPagePO.INTNAME)).textContent();
    expect(recycleBin).toEqual("Recycle bin");
await test.step(
      " Verified We should be able to access the Recycle bin from the T&H header. ***"
, async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
