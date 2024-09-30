
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C28920.json";
import HTTP from "@testData/STANDALONE/Azure_Storage.json";

test.describe("TC_C28920_verify_help_text_for_Azure_Import", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5177 @Env-All TC_C28920_verify_help_text_for_Azure_Import", async ({io,page}, testInfo) => {
    test.step("*** Click on create flow ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
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
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Import");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.isPageReady();

    test.step("*** Click on the container name help text ***", async ()=>{});
    await io.homePage.clickButtonByIndex("[id='http.relativeURI'] button.MuiIconButton-root", 0);
    test.step("*** Validate the help text***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT)
    await io.assert.expectToContainValue("Specify the Azure blob storage container that has the files to be transferred", String(data),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    test.step("*** Click on the file name help text ***", async ()=>{});
    await io.homePage.clickButtonByIndex("[id='file.fileName'] button.MuiIconButton-root", 0);
    test.step("*** Validate the help text***", async ()=>{});
    data = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT)
    await io.assert.expectToContainValue("Use this field to specify how the files being uploaded to the Azure blob storage container should be named. You can type '{{{' to include a predefined timestamp template in your file name.", String(data),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    test.step("*** close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
