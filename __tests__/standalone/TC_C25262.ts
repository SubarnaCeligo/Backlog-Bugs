
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25262", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4463 TC_C25262", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.FULFILLMENT);
    await io.homePage.loadingTime();
    test.step("*** clicked on fulfillment.com adaptor ***", async ()=>{});
    let result = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONGUIDELINKFULFILLMENT);
    await io.assert.expectToBeValue(String(result), "Connection guide", "");
    test.step("*** KB doc hyperlink is visible ***", async ()=>{});
    
    test.step("Verifying  link is clickable", async ()=>{});
    await io.assert.verifyElementToBeClickable(selectors.connectionsPagePO.CONNECTIONGUIDELINKFULFILLMENT)
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicked on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    test.step("*** clicked on Resources  in Homepage ***", async ()=>{});
  });
});
