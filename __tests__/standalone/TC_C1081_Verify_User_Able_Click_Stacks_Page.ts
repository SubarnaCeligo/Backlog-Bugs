
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C1081_Verify_User_Able_Click_Stacks_Page", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T6722 TC_C1081_Verify_User_Able_Click_Stacks_Page", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    
    await io.homePage.goToMenu("Resources","Stacks");
    await io.homePage.loadingTime();
    test.step("Clicked on stack button", async ()=>{});

    var title = await io.homePage.getText(selectors.flowGroupingPagePO.SELECT_TILE)
    test.step("*** Validating user able to click Stacks Page ***", async ()=>{});
    
    await io.assert.expectToContainValue( "Stacks", String(title),"");
    test.step("*** Navigate to home page ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
