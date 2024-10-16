
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22562_KB_doc", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4632 TC_C22562_KB_doc", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** clicked on connections in Homepage ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** clicked on GraphQl adaptor ***", async ()=>{});
    var kbDOc = await io.homePage.isVisible("[href='https://docs.celigo.com/hc/en-us/articles/4843857027227']");
    await io.assert.expectToBeTrue(kbDOc, "");
    test.step("*** Verifying  KB doc hyperlink is visible   ***", async ()=>{});

    await io.assert.verifyElementToBeClickable("[href='https://docs.celigo.com/hc/en-us/articles/4843857027227']")
    test.step("*** Verifying  KB doc hyperlink is clickable   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
