import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C96888 Verify Filter's rows are properly aligned for NS import on How can we find existing records? field", () => {
  test("@Env-All @Zephyr-IO-T25946 C96888 Verify Filter's rows are properly aligned for NS import on How can we find existing records? field", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
    await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);

    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.clickByText("NETSUITE 347 CONNECTION");

    await io.flowBuilder.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "C96888"
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RECORD_TYPE);
    await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.RECORD_TYPE} input`, 'Account');
    await io.flowBuilder.clickByText("Account");
    await io.flowBuilder.click(selectors.mappings.UPDATE);
    await io.flowBuilder.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);

    if (!(await page.isVisible(selectors.flowBranchingPO.LOGICRULES_CONTAINER))) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
      await io.homePage.loadingTime();
    }

    await io.homePage.loadingTime();
    await page.selectOption(selectors.mappings.RULEFILTERCONTAINER + ' select', 'Formula (Text)');
    await io.homePage.loadingTime();
    const Symbol = await page.$(selectors.flowBuilderPagePO.RULE_FILTER);
    const displayValue = await Symbol.evaluate((el) => window.getComputedStyle(el).getPropertyValue('display'));
    expect(displayValue).toEqual('inline-flex');
  });
});
