import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C26455", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2988| To verify Amazon Redshift and Google BigQuery should be categorized under `Databases`", async ({io}) => {
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    var graph = await io.homePage.getText(
      "[class=' css-old1by']"
    );
    var str = JSON.stringify(graph).replace("/[s+\n]/g", "");
    console.log("name", str);
    await io.assert.expectToContainValue("Amazon Redshift",str, "");
    await io.assert.expectToContainValue("Google BigQuery",str, "");
await test.step(
      "*** Amazon Redshift and Google BigQuery should be categorized under Databases ***"
, async ()=>{});
  });
});
