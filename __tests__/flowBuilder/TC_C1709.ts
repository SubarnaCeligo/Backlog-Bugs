import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T2928", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2928", async ({io}) => {
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Click on create Connection ***", async ()=>{});
    let name = (await io.homePage.getText(selectors.flowBuilderPagePO.MICROSOFT_SQL)).toString();
    await io.assert.expectToContainValue("Microsoft SQL", name, "");
    test.step("*** MS SQL is changed to Microsoft SQL ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on imports in Homepage ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create import ***", async ()=>{});
    let name1 = (await io.homePage.getText(selectors.flowBuilderPagePO.MICROSOFT_SQL)).toString();
    await io.assert.expectToContainValue("Microsoft SQL", name1, "");
    test.step("*** MS SQL is changed to Microsoft SQL ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on exports in Homepage ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create export ***", async ()=>{});
    let name2 = (await io.homePage.getText(selectors.flowBuilderPagePO.MICROSOFT_SQL)).toString();
    await io.assert.expectToContainValue("Microsoft SQL", name2, "");
    test.step("*** MS SQL is changed to Microsoft SQL ***", async ()=>{});
  });
});
