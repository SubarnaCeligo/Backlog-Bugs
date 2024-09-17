
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C60406_TC_C60407_TC_C60408", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T23203 @Env-All TC_C60406 Verify the api version dropdown when the api version is not selected at connection", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    test.step("*** Selected loopreturns as the adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "LOOP RETURNS NO VERSION"
    );
    await test.step(
      "*** Choosing the desired Loop Returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Returns API"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Advanced shipping notice"
    );
    test.step("*** Selecting Resource and Endpoint ***", async () => { });
    const apiVersion = await page.locator(selectors.exportsPagePO.ASSISTANT_META_DATA_VERSION)
    await expect(apiVersion).toBeVisible();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Verified api version shown by default in the export"
      , async () => { });
  });
  test("@Zephyr-IO-T23204 @Env-All TC_C60407 Verify the api version dropdown when the api version is selected at connection", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    test.step("*** Selected loopreturns as the adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "LOOP RETURNS CONNECTION"
    );
    await test.step(
      "*** Choosing the desired Loop Returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Listings API"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "List allowlisted items"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiVersion1 = await page.locator(selectors.exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await expect(apiVersion1).not.toBeVisible();
    await test.step(
      "Verified if api version is not shown in the export",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on Pageprocessors ***", async () => { });
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );

    test.step("*** Clicking on Import records ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "LOOP RETURNS CONNECTION"
    );
    await test.step(
      "*** Choosing the desired Loop Returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Actions"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Create fraud report"
    );
    test.step("*** Selecting Resource and Endpoint ***", async () => { });
    const apiVersion2 = await page.locator(selectors.exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await expect(apiVersion2).not.toBeVisible();
    await test.step(
      "Verified if api version is not shown in the import",
      async ()=>{}
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Verified  Api version dropdown if the api version is selected at connection"
      , async () => { });
  });
  test("@Zephyr-IO-T23205 @Env-All TC_C60408 Verify whether user is switch between the versions", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    test.step("*** Selected loopreturns as the adaptor ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "LOOP RETURNS NO VERSION"
    );
    await test.step(
      "*** Choosing the desired Loop Returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Returns API"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Detailed"
    );
    test.step("*** Selecting Resource and Endpoint ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiVersionField = await page.locator(selectors.exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await apiVersionField.click();
    const apiVersions = await page.locator(selectors.myAccountPagePO.SELECTTYPE);
    const v1 = apiVersions.nth(1);
    const v2 = apiVersions.nth(2);
    expect(await v1.textContent()).toBe('v1');
    expect(await v2.textContent()).toBe('v2');
    await v1.click();
    expect(await apiVersionField.textContent()).toBe("v1");
    await apiVersionField.click();
    await v2.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(await apiVersionField.textContent()).toBe("v2");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "Verified whether user can switch between the api versions in the export",
      async () => {}
    );

    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    test.step("*** Selected Loop Returns as the adaptor ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on what would you like to do ", async () => { });
    await test.step(
      "*** Clicking on Look up additional records ***",
      async () => {});
    await io.homePage.click(
      selectors.mappings.LOOKUP_RECORD
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicked on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "LOOP RETURNS NO VERSION"
    );
    await test.step(
      "*** Choosing the desired Loop Returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Returns API"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Detailed"
    );
    test.step("*** Selecting Resource and Endpoint ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiVersionField2 = await page.locator(selectors.exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await apiVersionField2.click();
    await io.homePage.loadingTime();
    const apiVersions2 = await page.locator(selectors.myAccountPagePO.SELECTTYPE);
    const ppv1 = apiVersions2.nth(1);
    const ppv2 = apiVersions2.nth(2);
    expect(await ppv1.textContent()).toBe('v1');
    expect(await ppv2.textContent()).toBe('v2');
    await ppv1.click();
    expect(await apiVersionField2.textContent()).toBe("v1");
    await apiVersionField2.click();
    await ppv2.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(await apiVersionField2.textContent()).toBe("v2");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Verified whether user can switch between the api versions in the lookup",
      async () => {}
    );
  });
});
