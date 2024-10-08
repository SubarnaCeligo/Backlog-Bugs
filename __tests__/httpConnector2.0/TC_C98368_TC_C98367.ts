
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C98368_TC_C98367", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T7171 @Zephyr-IO-T7170 @Env-All TC_C98368 TC_C98367 Verify fields in the bigquery connection form", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    test.step("*** Selected snowflake as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const projectId = await io.homePage.getText(
      selectors.connectionsPagePO.DEFAULT_DB_PROJECT_ID_LABEL
    );
    expect(projectId).toContain("Default project ID");
    await io.homePage.click(
      selectors.connectionsPagePO.DEFAULT_DB_PROJECT_ID_HELPTEXT_BTN
    );
    await io.homePage.loadingTime();
    const helpText1 = await io.homePage.getText(
      selectors.flowBuilderPagePO.STACKHELPTEXT
    );
    expect(helpText1).toContain(
      "Enter the default BigQuery project ID to use. This value can be overwritten in your flows."
    );

    await test.step(
      "*** Verified defaultprojectid name and help text***",
      async ()=>{}
    );

    const dataset = await io.homePage.getText(
      selectors.connectionsPagePO.DEFAULT_DB_DATASET_LABEL
    );
    expect(dataset).toContain("Default dataset");

    await io.homePage.click(
      selectors.connectionsPagePO.DEFAULT_DB_DATASET_HELPTEXT_BTN
    );
    await io.homePage.loadingTime();
    const helpText2 = await io.homePage.getText(
      selectors.flowBuilderPagePO.STACKHELPTEXT
    );
    expect(helpText2).toContain(
      "Enter the default dataset name that contains the tables and views to use. This value can be overwritten in your flows."
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified Default dataset name and help text ***",
      async ()=>{}
    );

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
