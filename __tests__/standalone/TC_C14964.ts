
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C14964", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1850 TC_C14964", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
    test.step("*** clicked onADP AS2 adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.MDNSIGNING);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const MDNhelptext = await page.getByText("This field describes what signing algorithm, if any, integrator.io will use when sending back MDNs to your trading partner.");
    console.log("MDNhelptextId ", MDNhelptext);
    await expect(MDNhelptext).toBeVisible();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SIGNATUREVERIFICATIONHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const signaturehelptext = await page.getByText("This is the algorithm used by integrator.io to calculate the digest of the incoming message from your trading partner.");
    await expect(signaturehelptext).toBeVisible();
    test.step("*** Verified the  help text is as expected for the MDN signature verification field ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
