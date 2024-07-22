
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51813 Verify defaut value for MarkExported Batch Size field", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T26748 TC_C51813 Verify defaut value for MarkExported Batch Size field", async ({ io, page}, testInfo) => {
    const uuidv4 = require('uuid').v4;
    const uniqueString = uuidv4()
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL)
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "NETSUITE CONNECTION"
    );
    await io.flowBuilder.clickByTextByIndex("NETSUITE CONNECTION", 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, uniqueString);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.exportsPagePO.NETSUITE_EXPORT_TYPE);
    await io.exportsPage.clickByText('Once - export records only once');
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    const element = page.locator(selectors.exportsPagePO.NETSUITE_EXPORT_BATCH_SIZE);
    await element.scrollIntoViewIfNeeded();
    const batch = await page.getByText('100');
    io.assert.expectToBeTrue(await batch.isVisible(), 'Default value for MarkExported Batch Size field is not 100');
  });
});

