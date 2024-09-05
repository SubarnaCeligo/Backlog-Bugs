import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T31906 Verify Celigo AI is displayed in transformation2.0 tab", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-79512 @Zephyr-IO-T31906 @Zephyr-IO-T31907 @Zephyr-IO-T31908 @Zephyr-IO-T31909 @Zephyr-IO-T31910 @Author-SubarnaGhatak Verify Celigo AI is displayed in transformation2.0 tab", async ({ io, page }) => {
   
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('TC47946_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //TRANSFORMATION 2.0 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);
    //TRANSFORMATION 2.0 Celigo AI Not Displayed IO-T31907 
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RULES1);
    await io.flowBuilder.loadingTime();
    const isCeligoAINotVisibleInTransformation1 = !(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT));
    await io.assert.expectToBeTrue(isCeligoAINotVisibleInTransformation1, "Celigo AI Not Visible for Transformation 1.0");
    // //Verify Celigo AI are in collapsed state and disabled. IO-T31909
    await io.flowBuilder.clickByText('Rules 2.0');
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-expanded", "false", 1);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR, "aria-disabled", "true", 1);

  });
  
  
});