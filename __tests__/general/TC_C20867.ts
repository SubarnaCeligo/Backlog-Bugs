
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C20867", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C20867", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    await test.step("*** Clicked on API token button ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.CREATEAPITOKEN
    );
    await test.step("***Clicked on Create New Token***",()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.AUTOPURGETOKEN
    );
    await test.step("***Clicked on Purge Token***",()=>{});
    var list = await io.homePage.getText(
      selectors.basePagePO.LIST_BOX
    );
    expect(list).toEqual("Never");
    expect(list).toEqual("1 Hour");
    expect(list).toEqual("4 Hours");
    expect(list).toEqual("1 Day");
    expect(list).toEqual("4 Days");
    expect(list).toEqual("10 Days");
    expect(list).toEqual("30 Days");
    await test.step(" Verified text displayed is correct  ***",()=>{});
    await io.homePage.click("[data-value='never']");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step("*** Clicken on Close ***",()=>{});
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step("*** Clicken on Discard Changes ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Naviating to Home Page ***",()=>{});
  });
});
