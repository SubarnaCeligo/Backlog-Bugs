import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C65961 from "@testData/Flows/C65961.json";

test.describe("C65961 Verify UI throws an error message if the Path is wrong for DisplayAfter, and Verify that the UI throws error only in simple view if the Path is wrong in custom settings", () => {
  test("@Env-All @Env-IAQA @Zephyr-IO-T25949 C65961 Verify UI throws an error message if the Path is wrong for DisplayAfter, and Verify that the UI throws error only in simple view if the Path is wrong in custom settings", async ({
    io,
    page
  }) => {
    const id = await io.createResourceFromAPI(C65961, "FLOWS");
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT)
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.waitForElementAttached(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.waitForElementAttached(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ERROR_ID);
    const text = await io.exportsPage.getText(selectors.basePagePO.ERROR_ID);
    const func = text.includes(
      "The·field·path·set·in·displayAfter·does·not·exist:·export.assistantMetadata.pathParams.whitelist_id¶"
    );
    await io.assert.expectToBeTrue(func, "text doesn't match");
    await io.exportsPage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.exportsPage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    const errorEl = await io.exportsPage.isVisible(selectors.basePagePO.ERROR_ID);
    await io.assert.expectToBeValue(
      errorEl.toString(),
      "false",
      "Error window is present "
    );
  });
});
