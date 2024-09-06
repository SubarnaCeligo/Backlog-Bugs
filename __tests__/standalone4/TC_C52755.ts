
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52755 from "@testData/STANDALONE/TC_C52755.json";

test.describe("TC_C52755", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowID]);
  });
  test("TC_C52755 @Zephyr-IO-T22562 @Env-All", async ({ io, page }, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52755);
    await test.step("Created Flow " + flows.get(TC_C52755.name)["flowName"] +
        " With ID " +
        flows.get(TC_C52755.name)["flowId"],async ()=>{}
    );
    await io.flowBuilder.navigateToTheFlow( flows.get(TC_C52755.name)["flowId"]
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/assets/FTP_uploads/TC_C52753.json");
    await io.homePage.loadingTime();

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Click on import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on search button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);

    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOME_SEARCH, "Tile");

    await io.homePage.loadingTime();
    test.step("*** Validate the message if there is no destinatioin with test ***", async ()=>{});
    await io.assert.verifyElementDisplayedByText("Your search term doesn't match any destination fields.", "The message is not displayed");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
