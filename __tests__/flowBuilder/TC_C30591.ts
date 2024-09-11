import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30591.json";


test.describe("@Env-All @Zephyr-IO-T2893|@Env-All @Zephyr-IO-T2895|@Env-All @Zephyr-IO-T2896|@Env-All @Zephyr-IO-T2898|@Env-All @Zephyr-IO-T2899|@Env-All @Zephyr-IO-T2900", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2893|@Env-All @Zephyr-IO-T2895|@Env-All @Zephyr-IO-T2896|@Env-All @Zephyr-IO-T2898|@Env-All @Zephyr-IO-T2899|@Env-All @Zephyr-IO-T2900", async ({ io, page }) => {
    // Creating a flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);

    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);

    test.step("Opening import", async () => { });
    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    await io.homePage.loadingTime();

    await test.step(
      "Selecting the 'Ignore existing records' checkbox"
      , async () => { });
    await io.homePage.click(
      "[data-test='ignoreExisting']"
    );
    await test.step(
      "Clicking on 'How would you like to identify existing records?' dropdown"
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.SPECIFIC_FIELD_POPULATED
    );

    test.step("Selecting 'Run a dynamic lookup' option", async () => { });
    await io.homePage.click(
      selectors.importPagePO.DYNAMICLOOKUP
    );

    test.step("Clicking on 'Lookup' dropdown", async () => { });
    await io.homePage.click(
      "[data-test='rdbms.ignoreExistingLookupName']"
    );

    test.step("Verifying the dropdown options", async () => { });
    await io.homePage.loadingTime();
    const isOption1Available = await (
      await page.locator("[data-value='orderid_lookup']")
    ).isVisible();
    const isOption2Available = await (
      await page.locator("[data-value='ship_lookup']")
    ).isVisible();
    await io.assert.expectToBeTrue(isOption1Available, "");
    await io.assert.expectToBeTrue(isOption2Available, "");

    test.step("Selecting a lookup", async () => { });
    await io.homePage.click("[data-value='ship_lookup']");
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.EDITLOOKUP
    );
    await io.homePage.loadingTime();
    await io.homePage.fill(
      '[name="_name"]',
      'ship_look'
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE, 1
    );
    await io.homePage.loadingTime();
    await expect(await page.getByText('ship_look').isVisible()).toBeTruthy();
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU, 2
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.MANAGE_LOOKUP
    );
    await io.homePage.loadingTime();
    await expect(await page.getByText('orderid_lookup').isVisible()).toBeTruthy(); //C30594
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU, 3
    );
    await io.homePage.clickByText("Edit lookup");
    await io.homePage.loadingTime();
    await io.homePage.fill(
      '[name="_name"]',
      'ship_lookup'
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE, 1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEXBUTTON
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='rdbms.ignoreExistingLookupName']"
    );
    await expect(await page.getByText('orderid_lookup').isVisible()).toBeFalsy();
    await io.homePage.clickByTextByIndex(
      'ship_look', 1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU, 2
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.MANAGE_LOOKUP
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU, 3
    );
    await io.homePage.clickByText("Delete lookup");
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEXBUTTON
    );
    await io.homePage.loadingTime();
    await expect(await page.getByText('ship_lookup').isVisible()).toBeFalsy();

    test.step("Saving and closing import page", async () => { });
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    await io.homePage.loadingTime();

    test.step("Opening Handlebar editor", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );

    test.step("Selecting Manage lookups", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.DBLOOKUP

    );

    test.step("Clicking on Create lookup", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.CREATE_LOOKUP_FROM_MANAGE
    );

    test.step("Entering query", async () => { });
    await io.homePage.loadingTime();
    const query = "select * from Templates.Order LIMIT 1";
    await io.homePage.click("[id='_query'] .ace_content");
    await page.keyboard.type(query);

    test.step("Entering Column", async () => { });
    await io.homePage.fillWebPage(
      "[data-test='_extract'] input",
      "customerid"
    );

    test.step("Entering Name", async () => { });
    await io.homePage.fillWebPage(
      "[data-test='_name'] input",
      "customer_lookup"
    );

    test.step("Saving and closing", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE, 0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEXBUTTON
    );

    test.step("Closing Handlebar editor", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);

    test.step("Clicking on Lookup menu", async () => { });
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU, 2
    );

    test.step("Selecting Manage lookups option", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.MANAGE_LOOKUP
    );
    await io.homePage.loadingTime();
    await expect(await page.getByText('customer_lookup').isVisible()).toBeTruthy();
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEXBUTTON
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE, 0
    );
    await io.homePage.loadingTime();
  });
})