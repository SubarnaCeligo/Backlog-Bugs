
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/Amazon_SP_API_Hybrid.json";
import connectionPayload from "@testData/STANDALONE/TC_C29682.json";

test.describe("TC_C29682", () => {
  let connId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    let response = await io.api.postCall("v1/connections", connectionPayload);
    connId = response._id;
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection("TC_C29682_Amazon_Hybrid", connId);
  });

  test("@Zephyr-IO-T1916 @Env-All TC_C29682", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Click on create Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Selected Amazon Seller Central as the adaptor ***", async ()=>{});
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "TC_C29682_Amazon_Hybrid");
    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Amazon SP API Hybrid");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Validating Help Text ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SPAPITYPE);
    test.step("*** Clicking on ? ***", async ()=>{});
    var apiText = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    await expect(apiText).toContain("Selling Partner API (SP-API): The Selling Partner API is a REST-based API and is an evolution of the legacy Amazon Marketplace Web Service (MWS) APIs. It’s recommended you integrate using SP-APIs.Marketplace Web Service API (MWS): Amazon Marketplace Web Service (Amazon MWS) is the legacy web service API.");
    test.step("*** verified Help Text ***", async ()=>{});
    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to HomePage ***", async ()=>{});
  });
});
