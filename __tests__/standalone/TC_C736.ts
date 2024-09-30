
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C736", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1387 TC_C99363 TC_C736", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicking on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicking on My Account ***", async ()=>{});

    await io.homePage.clearTextValue(selectors.basePagePO.ADD_NAME);
    test.step("*** Deleting Name ***", async ()=>{});

    var err = await io.homePage.getText(selectors.flowBuilderPagePO.NAME_GET)
    await io.assert.expectToContainValue( "A value must be provided", String(err),"");

    test.step("*** The Name text box is highlighted with red and hovering on test is displaying a message saying that This field is required  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
