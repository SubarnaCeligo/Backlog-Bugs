import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T2938", () => {
  test("@Env-All @Zephyr-IO-T2938", async ({ io, page }) => {
    await io.goToFlowsPage();
    await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    await io.homePage.loadingTime()
    const saveButton = await page.$(selectors.basePagePO.SAVE);
    const save = await saveButton.isDisabled();
    await io.assert.expectToBeTrue(save, "Save button is disabled");

  });
});
