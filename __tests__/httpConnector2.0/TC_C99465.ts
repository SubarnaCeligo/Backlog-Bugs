
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99465_TC_C99466", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25505 @Env-All TC_C99465 Verify the relative URL if it contains params for which we provided value", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.EXPORTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.JAZZHR_SELECTOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "JAZZ HR CONNECTION"
    );
    await test.step(
      "*** Choosing the desired JAZZHR connection ***",
      async ()=>{}
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C99465 JazzHR Export"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Users"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get all users"
    );
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.ASSISTANT_METADATA_PATH_PARAMS_NAME,
      "testname"
    );
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.ASSISTANT_METADATA_PATH_PARAMS_EMAIL,
      "testemail"
    );
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.ASSISTANT_METADATA_PATH_PARAMS_TYPE,
      "testtype"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.HTTP_TOGGLE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const relativeURI = await page.locator(selectors.exportsPagePO.HTTP_RELATIVE_URI).inputValue();
    expect(relativeURI).toContain(
      "/users/name/testname/email/testemail/type/testtype/page/{{{export.http.paging.page}}}"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C99465 JazzHR Export"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "*** Verified In relative URL test should  show only  path param value  for which we provided value***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T25506 @Env-All TC_C99466 Verify the relative URL if it only contains a single path params for which we provided value", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.EXPORTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.JAZZHR_SELECTOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "JAZZ HR CONNECTION"
    );
    await test.step(
      "*** Choosing the desired JAZZHR connection ***",
      async ()=>{}
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C99466 JazzHR Export"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Users"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Get all users"
    );
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.ASSISTANT_METADATA_PATH_PARAMS_NAME,
      "testname"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.HTTP_TOGGLE
      );
    }
    const relativeURI = await page.locator(selectors.exportsPagePO.HTTP_RELATIVE_URI).inputValue();
    expect(relativeURI).toContain(
      "/users/name/testname/page/{{{export.http.paging.page}}}"
    );

    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C99466 JazzHR Export"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "*** Verified In relative URL test should  show only one  path param value  for which we provided value***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
