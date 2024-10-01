
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/Zendesk_Connection_SD2.json";
import DATA from "@testData/STANDALONE/TC_C63262.json";

test.describe("TC_C63260_C63262_C63263", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test("TC_C63260 @Env-All @Zephyr-IO-T14544", async ({io,page}, testInfo) => {
    // C63260 Verify In imports that have a preview panel, the preview panel (and Populate button) should also be shown in the expanded view for mock response.
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of export from dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Create from scratch selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var conn = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText(conn);
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRESPONSE);
    test.step("*** Clicked on Mock Response ***", async ()=>{});
    // Populate with preview data
    var popWithPreview = await io.homePage.isVisible(selectors.flowBuilderPagePO.POPULWITHMOCKRESP1);
    await io.assert.expectToBeTrue(popWithPreview, "");
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRESPEDIT);
    test.step("*** Clicked on Expand Button ***", async ()=>{});

    var popWithPreview1 = await page.$$(
      selectors.flowBuilderPagePO.POPULWITHMOCKRESP1
    );
    var isExist = await popWithPreview1[1].isVisible();
    await io.assert.expectToBeTrue(isExist, "");
    test.step("*** Verified Populate button should also be shown in the expanded view for mock response. ***", async ()=>{});

    const label = await popWithPreview1[1].textContent();
    await io.assert.expectToContainValue("Populate with live data",label, "");
    test.step("Verified label for Populate button in the expanded view for mock response", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on close button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close button ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
  test("TC_C63262 @Env-All @Zephyr-IO-T14545", async ({io,page}, testInfo) => {
    // C63262 Verify If we add 'length' field in the mock data then It's showing incorrect validation error.
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Create from scratch selected ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var conn1 = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn1);
    await io.homePage.clickByText(conn1);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicked on Mock Output ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fill('#mockOutput-inline textarea', JSON.stringify(DATA.Body));
    test.step("*** Filling data into Mock Output field with one record ***", async ()=>{});

    // Error should not shown.
    var error = await io.homePage.isVisible(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
    await io.assert.expectToBeFalse(error, "");
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKOUT1);
    test.step("*** Clicked on Mock Output ***", async ()=>{});
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.homePage.loadingTime();
    await io.homePage.fill('#mockOutput-inline textarea', JSON.stringify(DATA.Body1));
    test.step("*** Filling data into Mock Output field with multiple record ***", async ()=>{});
    var error1 = await page.locator(
      selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR
    ).isVisible();
    // await expect(error1).toBeFalsy();
    await io.assert.expectToBeFalse(error1, "");
    test.step("*** Verified Error should not show ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
  test("TC_C63263 @Env-All @Zephyr-IO-T14546", async ({io,page}, testInfo) => {
    // C63263 Verify Error Message is showing on Expanded view, when we go to expanded view from non-expanded view.
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Create from scratch selected ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var conn1 = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn1);
    await io.homePage.clickByText(conn1);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicked on Mock Output ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD, "Testing");
    test.step("*** Filling data into Mock Output field with one record ***", async ()=>{});
    await io.homePage.loadingTime();

    // Error should shown.
    var errorDisp = await io.homePage.isVisible(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
    await io.assert.expectToBeTrue(errorDisp, "");
    test.step("*** Verified Error Message is showing on Non-Expanded view ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicked on Expand Button ***", async ()=>{});

    var errorDisp1 = await page.locator(
      selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR
    ).first().isVisible();
    await io.assert.expectToBeTrue(errorDisp1, "");
    test.step("*** Verified Error Message is showing on Expanded view ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
});
