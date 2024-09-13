import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C20867", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T6803 @Env-All TC_C20867", async ({io,page}, testInfo) => {
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
      selectors.basePagePO.MENU_ITEM
    );
    expect(list[1]).toEqual("Never");
    expect(list[2]).toEqual("1 Hour");
    expect(list[3]).toEqual("4 Hours");
    expect(list[4]).toEqual("1 Day");
    expect(list[5]).toEqual("4 Days");
    expect(list[6]).toEqual("10 Days");
    expect(list[7]).toEqual("30 Days");
    await test.step(" Verified text displayed is correct  ***",()=>{});
    await io.homePage.click(selectors.connectionsPagePO.NEVER);
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
