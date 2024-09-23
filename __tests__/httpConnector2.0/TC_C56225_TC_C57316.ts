
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C56225_TC_C57316 Verify the API endpoint", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  }),
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17056 @Zephyr-IO-T17059 @Env-All TC_C56225_TC_C57316 Verify the API endpoint", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.HAPPY_RETURNS_CONNECTION
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    test.step("*** Clicking on create flow step ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_NAME,
      "Happy Returns Import"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "HAPPY RETURNS CONNECTION"
    );
    await test.step(
      "*** Choosing the desired Happy returns connection ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Partner API"
    );
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    //TC57316 -Verify the API endpoint dont have any create and update endpoint

    const composite = await io.homePage.selectTextfromDropDown(page,
      selectors.importPagePO.CREATE_AND_UPDATE
    )
    expect(composite).toBeFalsy();
    await test.step(
      "Verified the API endpoint if we dont have any create and update endpoint",
      async ()=>{}
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Approve an RMA."
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator(selectors.importPagePO.ASSISTANT_METADATA_PATH_RMA_ID).first().click();
    await page.keyboard.type("123");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    flowId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const mapper1Btn =await (await page.$(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON)).isVisible()
    await io.assert.expectToBeTrue(mapper1Btn, "");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var text2 = await io.homePage.getText(
      selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_1
    );
    var expected2 = "returning[*].approve";
    await test.step(
      "***Inclusion Fields Are Added For Happy Return Import***",
      async ()=>{}
    );
    expect(text2).toEqual(expected2);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
