
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C32358", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T4638 TC_C32358", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** selecting Amazon seller ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Amazonseller");
    test.step("*** Naming the Amazonseller ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.APITYPE);
    test.step("*** Clicking on api type ***", async ()=>{});
    var txt = await io.homePage.getTextFromElement(selectors.connectionsPagePO.AMAZONSP, "Selling Partner API (SP-API) (Beta)"
    );
    expect(txt).toBeFalsy();
    test.step("*** Verifying the dropdown values should not have Beta label to the SPI-API  ***", async ()=>{});

    var txt1 = await io.homePage.getTextFromElement(selectors.connectionsPagePO.AMAZONHYBRID, "Hybrid Selling Partner API (SP-API and MWS) (Beta)"
    );
    expect(txt1).toBeFalsy();
    test.step("*** Verifying the dropdown values should not have Beta label to the  Hybrid options  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZONHYBRID);
    test.step("*** Clicking on Amazon hybrid type ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
