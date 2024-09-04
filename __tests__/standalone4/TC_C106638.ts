
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C106638", () => {
  let platform;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C106638 @Zephyr-IO-T23744 @Env-All", async ({ io, page }, testInfo) => {
    test.step("Clicking on Create Flow", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();

    //Export
    test.step("*** Clicking on Add Source ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    test.step("*** selecting Salesforce ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP);
    test.step("*** Choosing type of export from dropdown ***", async () => { });
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);

    const statusBeforeAddingExportConn = await page.getByText("Online").isVisible();
    await expect(statusBeforeAddingExportConn).toBeFalsy();
    test.step("*** Verifieng connection status ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    var conn = "HTTP SLACK";
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("HTTP SLACK CONNECTION");
    await io.homePage.loadingTime();
    const statusAfterAddingExportConn = await page.getByText("Online").isVisible();
    await expect(statusAfterAddingExportConn).toBeTruthy();
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Verifieng connection status test.afterEach replacing connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    //Lookup
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Pageprocessors ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP);

    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    const statusBeforeAddingLookupConn = await page.getByText("Online").isVisible();
    await expect(statusBeforeAddingLookupConn).toBeFalsy();
    test.step("*** Verifieng connection status ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("HTTP SLACK CONNECTION");
    await io.homePage.loadingTime();
    const statusAfterAddingLookupConn = await page.getByText("Online").isVisible();
    await expect(statusAfterAddingLookupConn).toBeTruthy();
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Verifieng connection status test.afterEach replacing connection ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    //import
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Pageprocessors ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP);

    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var statusBeforeAddingImportConn = await page.getByText("Online").isVisible();
    await expect(statusBeforeAddingImportConn).toBeFalsy();
    test.step("*** Verifieng connection status ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("HTTP SLACK CONNECTION");
    await io.homePage.loadingTime();
    const statusAfterAddingImportConn = await page.getByText("Online").isVisible();
    await expect(statusAfterAddingImportConn).toBeTruthy();
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Verifieng connection status test.afterEach replacing connection ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
