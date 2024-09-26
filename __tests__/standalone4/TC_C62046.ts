
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/STANDALONE/FTP_Conn_Stand2.json";

test.describe("TC_C62046", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("TC_C62046 @Env-All @Zephyr-IO-T11780", async ({io,page}, testInfo) => {
    // C62046 Verify Truncate low delimiter Help text under CSV type in FTP Import
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);
    test.step("*** Choosing type of export from dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var conn = SF[0]["connectionId"];
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("FTP CONNECTION");
    test.step("*** Choosing the desired SALESFORCE connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "csv");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ROWDELI);
    test.step("*** Clicking on Help Icon ***", async ()=>{});
    test.step("*** Verifying Help Text ***", async ()=>{});
    var helpText = await io.homePage.getText(selectors.importPagePO.INPUTHELP);
    await io.assert.expectToContainValue("Select this option to prevent errors that may occur if a string value in the CSV file exceeds the maximum allowed length.",String(helpText), "");
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
});
