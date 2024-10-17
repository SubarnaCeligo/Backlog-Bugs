
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24260_adobe_sign_hyperlink", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4457 TC_C24260_adobe_sign_hyperlink", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADOBESIGN);
    await io.homePage.loadingTime();
    test.step("*** clicked on adobe Sign adaptor ***", async ()=>{});
    test.step("*** clicked on adobe sign hyperlink  ***", async ()=>{});
    var resp = await io.homePage.isVisible("[href='https://docs.celigo.com/hc/en-us/articles/360057608471-Set-up-a-connection-to-Adobe-Sign']");
    await io.assert.expectToBeTrue(resp, "");
    test.step("*** adobe hyperlink element exist verified ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
