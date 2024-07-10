import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-46625", () => {
  test("@Env-All @Zephyr-IO-T46625", async ({ io, page }) => {
    // C107958 C107959 C107960	C107961	C107962
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Playground");
    await io.flowBuilder.waitForElementAttached(
      selectors.playgroundPO.HANDLEBARS_EDITOR
    );
    await io.flowBuilder.click(selectors.playgroundPO.HANDLEBARS_EDITOR);
    await io.flowBuilder.click(selectors.playgroundPO.NESTED_JSON);
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COLUMN_VIEW,
      "Default layout is not column view"
    );

    await io.flowBuilder.click(selectors.playgroundPO.SELECTED_COLUMN_VIEW);
    await io.flowBuilder.click(selectors.playgroundPO.SQL_QUERY_BUILDER);
    await io.flowBuilder.click(selectors.playgroundPO.SIMPLE_SQL_QUERY);
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COMPACT_VIEW,
      "Default layout is not column view"
    );
  });
});
