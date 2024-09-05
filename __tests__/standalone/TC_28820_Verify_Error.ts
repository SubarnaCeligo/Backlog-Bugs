
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_28820_Verify_Error", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4544 TC_28820_Verify_Error", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PAYLOCITY);
    test.step("*** clicked on Paylocity adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Paylocity Connection");
    test.step("*** Name the Paylocity connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    test.step("*** Clicked on save and close ***", async ()=>{});

    var inputMsg = "A value must be provided";
    var isErrorShown = io.homePage.getTextFromElement(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, inputMsg)
    expect(isErrorShown).toBeTruthy();
    test.step("*** Validating the error msg ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    
  });
});
