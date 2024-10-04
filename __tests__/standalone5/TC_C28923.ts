
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/Azure_Storage.json";

test.describe("TC_C28923", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T1891 @Env-All TC_C28923", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Click on create Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.AZUREBLOBSTORAGE);
    test.step("*** Selected Azure Blob Storage as the adaptor ***", async ()=>{});
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    var conn = HTTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Export");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");
    test.step("*** Selecting the file type from the DROPDOWN ***", async ()=>{});

    //Directory Path:
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.CONTAINER, 0);
    test.step("*** Clicking on ? ***", async ()=>{});
    var path = await io.homePage.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
    await expect(path[0]).toContain("Specify the Azure blob storage container that has the files to be transferred. integrator.io will transfer all files and also delete them from the folder once the transfer completes. You can also (optionally) configure integrator.io to leave files in the folder or transfer files that match a certain 'starts with' or 'ends with' file name pattern.Was this helpful?"
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** verified Help Text for Directory Path ***", async ()=>{});

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking Discard Changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to HomePage ***", async ()=>{});
  });
});
