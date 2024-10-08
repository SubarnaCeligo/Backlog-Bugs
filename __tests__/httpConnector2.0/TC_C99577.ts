
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99577", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25611 @Env-All TC_C99577 Verify Disable quote validation and strip enclosing quotes new checkbox is added", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.EXPORTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "FTP CONNECTION"
    );
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C99577 FTP Export"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.FILE_TYPE
    );
    await io.homePage.loadingTime();
    await io.homePage.selectTextfromDropDown(page, "csv")
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    const disableQuoteText = await io.homePage.getText(
      selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_FIELD
    );
    expect(disableQuoteText).toContain(
      "Disable quote validation and strip enclosing quotes"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Disable quote validation and strip enclosing quotes new checkbox should be added***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T25610 @Env-All TC_C99578 Verify Help Text for Disable quote validation and strip enclosing quotes", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.EXPORTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "FTP CONNECTION"
    );
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C99578 FTP Export"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.FILE_TYPE
    );
    await io.homePage.loadingTime();
    await io.homePage.selectTextfromDropDown(page, "csv")
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    const disableQuoteText = await io.homePage.getText(
      selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_FIELD
    );
    expect(disableQuoteText).toContain(
      "Disable quote validation and strip enclosing quotes"
    );
    await io.homePage.click(
      selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_FIELD
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );

    var help = await io.homePage.getText(
      selectors.flowBuilderPagePO.STACKHELPTEXT
    );
    expect(help).toContain(
      "Use this field to disable the automatic detection and validation of enclosing quotes around CSV column values. If any starting and ending quotes are found in the CSV file, they will be removed."
    );

    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Help Text for Disable quote validation and strip enclosing quotes ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T25608 @Env-All TC_C99580 Verify Disable quote validation and strip enclosing quotes is uncheck by default", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.EXPORTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "FTP CONNECTION"
    );
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C99580 FTP Export"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.FILE_TYPE
    );
    await io.homePage.loadingTime();
    await io.homePage.selectTextfromDropDown(page, "csv")
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.loadingTime();
    const disableQuoteText = await io.homePage.getText(
      selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_FIELD
    );
    expect(disableQuoteText).toContain(
      "Disable quote validation and strip enclosing quotes"
    );
    const checkbox = await page.locator(
      selectors.exportsPagePO.DISABLE_QUOTE_VALIDATION_AND_STRIP_ENCLOSING_QUOTES
    );
    expect(checkbox).not.toBeChecked();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Disable quote validation and strip enclosing quotes is uncheck by default ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
