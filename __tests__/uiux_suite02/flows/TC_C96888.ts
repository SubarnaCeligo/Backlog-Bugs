import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C96888 Verify CSV file launcher", () => {
  test("@Env-QA @Zephyr-IO-T21560 C65490 Verify CSV file launcher", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.clickByText('Imports');
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
    await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);

    await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.flowBuilder.clickByText("NETSUITE 347 CONNECTION");

    await io.flowBuilder.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "C96888"
    );

    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RECORD_TYPE);
    await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.RECORD_TYPE} input`, 'Account')
    await io.flowBuilder.clickByText("Update");
    await io.flowBuilder.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);
    await io.flowBuilder.clickByText("Add filter");
    await io.homePage.loadingTime();
    await page.selectOption(selectors.mappings.RULEFILTERCONTAINER + ' select', 'Formula (Text)');

    const Symbol = await page.$(selectors.flowBuilderPagePO.FILTER_CONTENT + ' .rules-group-body');
    expect(await Symbol.screenshot()).toMatchSnapshot("C96888-PLAYWRIGHT-darwin.png");
  });
});
