import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119151 Verify the Error Panel in AFE windows for Monitor User", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All C119151 Verify the Error Panel in AFE windows for Monitor User", async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('C32362_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW)
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN, "arrowDownIcon is not displayed")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL, "codePanel is not displayed")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON, "closeIcon is not displayed")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ARROW_DOWN);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.ARROW_RIGHT, "arrowRightIcon is not displayed")
  });
});