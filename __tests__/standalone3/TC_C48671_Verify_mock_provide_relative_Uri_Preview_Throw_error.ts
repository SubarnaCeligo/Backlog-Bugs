import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("TC_C48671_Verify_mock_provide_relative_Uri_Preview_Throw_error", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage()
  });
  test("@Zephyr-IO-T10026 @Env-All TC_C48671_Verify_mock_provide_relative_Uri_Preview_Throw_error", async ({ io, page }, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Page generator ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async () => { });
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = HTTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired connection ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_EXPORT");
    test.step("*** Renaming the Export ***", async () => { });
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Clicking on the Http Method ***", async () => { });
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("*** Clicking on the Http GET Method ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "/xmlparser");
    test.step("*** Providing reltive URL ***", async () => { });
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** Export type ***", async () => { });
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** Clicking on preview button ***", async () => { });
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Clicking on parsed output ***", async () => { });
    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    test.step("*** Validating error message ***", async () => { });
    var parsedOutput = await io.homePage.copyResourceData("#ace-editor");
    await io.assert.expectToContainValue(`error`,parsedOutput,"")
    await io.assert.expectToContainValue(`InvalidEndpoint`,parsedOutput,"")
    await io.assert.expectToContainValue("Not found", parsedOutput, "");
  });
});
