import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3078|@Env-All @Zephyr-IO-T3080|@Env-All @Zephyr-IO-T3079", () => {
  test("@Env-All @Zephyr-IO-T3078|@Env-All @Zephyr-IO-T3080|@Env-All @Zephyr-IO-T3079", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T15388 export');
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.homePage.loadingTime();
    var parsefileButton = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.PARSE_FILES
    );
    await io.assert.expectToBeTrue(parsefileButton, "");
    expect(await page.getByText("Parse files being transferred").isVisible()).toBeTruthy();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PARSE_FALSE,
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    let element = await page.locator(
      selectors.flowBuilderPagePO.FILE_METADATA,
      );

    await element.scrollIntoViewIfNeeded();
    await io.homePage.loadingTime();
    expect(await page.getByText("File metadata only").isVisible()).toBeTruthy();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PARSE_TRUE,
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    let onServer = await page.locator(selectors.flowBuilderPagePO.SKIP_DELETE);
    await onServer.scrollIntoViewIfNeeded();
    await io.homePage.loadingTime();
    expect(await page.getByText("File metadata only").isVisible()).toBeFalsy();
await test.step(
      "'C15390': 'File metadata only' is shown underneath 'Leave file on server'" // not found in Zephyr
, async ()=>{});
  });
});
