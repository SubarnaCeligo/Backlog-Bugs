
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_24253_Verify_Error", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4452 TC_24253_Verify_Error", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connections in Homepage ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADOBESIGN);
    test.step("*** clicked on adobeSign adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Adobe Sign Connection");
    await io.homePage.loadingTime();
    test.step("*** Name the GraphQL connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SUBDOMAIN, "AdobeSign");
    await io.homePage.loadingTime();
    test.step("*** entered the subDomain ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on Save and Authorize ***", async ()=>{});

    var inputMsg = "A value must be provided";
    var text = await io.homePage.getTextFromElement(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, inputMsg);
    expect(text).toBeTruthy();
    test.step("*** Validating the error msg ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
