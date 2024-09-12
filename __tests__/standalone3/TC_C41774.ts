import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("TC_C41774_HelpText_PreviewAndSend", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5945 @Env-All TC_C41774_HelpText_PreviewAndSend", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
   
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    test.step("*** Clicking on next button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.exportsPagePO.PREVIEW_HELP_TEXT_ICON);
    test.step("*** Clicking on Help Text ***", async ()=>{});
    const text = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Toggle the Preview/Send button to either preview the request that will be sent to the destination application",String(text), "");

    //HelpText For Preview
    await io.assert.expectToContainValue("Click Preview to see the HTTP request constructed with a sample record from your flow data, according to your import configurations.",String(text), "");
    //HelpText For Send
    await io.assert.expectToContainValue("Click Send to initiate an import request to the destination application and view its HTTP request, response, and parsed output.Was this helpful?Field path: import.previewAndSend",String(text), "");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
  });
});
