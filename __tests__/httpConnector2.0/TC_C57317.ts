
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C57317 Verify the API endpoint for create and update records", () => {
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
  test("@Zephyr-IO-T17130 @Env-All TC_C57317 Verify the API endpoint for create and update records", async ({io,page}, testInfo) => {
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
      "Webhooks"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION
    );
    await io.homePage.click(
      selectors.importPagePO.CREATE_AND_UPDATE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.importPagePO.EXISTING_RECORDS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
     selectors.importPagePO.SOURCE_VALUE
    );
    await io.homePage.fillWebPage(
      selectors.importPagePO.ASSISTANT_METADATA_PATH_WEBHOOK_ID,
      "id"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    flowId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(
      "Verified the API endpoint if we have one create and update endpoint",
      async ()=>{}
    );
  });
});
