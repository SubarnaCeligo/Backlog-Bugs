
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C28435_Freshservice_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4531 @Env-All TC_C28435_Verify_the_field_names_and_help_texts_in_Freshservice", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click("[data-test='Freshservice']");
    await io.homePage.loadingTime();
    test.step("*** clicked on Freshservice adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Freshservice_Connection");
    var results = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.API_KEYS_FIELD, "API key");
    await io.assert.expectToBeTrue(results, "");

    var subdomain = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.ADOBE_SUBDOMAIN1, "Subdomain");
    await io.assert.expectToBeTrue(subdomain, "");
  });
});
