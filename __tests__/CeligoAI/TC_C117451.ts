import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117451 Verify the Persist resource descriptions Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Env-IAQA C117451 Verify the Persist resource descriptions Celigo AI", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    //Persist Flow Description not Occur on Integration page C117461
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON,
      "Flow description is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await page.mouse.wheel(0, 1000);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.loadingTime();
    let elements = await page.$(selectors.flowBuilderPagePO.OPENAI.CONTENT);
    let isVisible = await page.evaluate(el => {
      const { top, bottom } = el.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      return (top > 0 || bottom > 0) && top < vHeight;
    }, elements);
    expect(isVisible).toBeFalsy();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    //Flow Builder
    await io.flowBuilder.clickByText("TC47946_DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    //Scroll the Description Box to retain position C117451
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    const feedback = page.getByText("Was this helpful?");
    await page.mouse.wheel(0, 1100);
    await io.flowBuilder.loadingTime();
    await feedback.waitFor({ state: "visible", timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CONTENT,
      "Celigo AI ThumpsUpis not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    //C117456 Export Persist
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON,
      "CeligoAI Generated Button is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await page.mouse.wheel(0, 1100);
    await io.flowBuilder.loadingTime();
    await feedback.waitFor({ state: "visible", timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CONTENT,
      "Celigo AI ThumpsUpis not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    //C117457 Import Persist
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON,
      "CeligoAI Generated Button is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await page.mouse.wheel(0, 1500);
    await io.flowBuilder.loadingTime();
    await feedback.waitFor({ state: "visible", timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CONTENT,
      "Celigo AI ThumpsUpis not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    //Not Retain Description After page change C117469
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON,
      "CeligoAI Generated Button is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.CELIGOAI_GENERATEDBUTTON
    );
    await io.flowBuilder.loadingTime();
    let isThumoVisible = await page.evaluate(el => {
      const { top, bottom } = el.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

      return (top > 0 || bottom > 0) && top < vHeight;
    }, elements);
    expect(isThumoVisible).toBeFalsy();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    // Imports in Resources C117468
    await io.homePage.goToMenu("Resources", "Imports");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON,
      "Flow description is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await page.mouse.wheel(0, 1000);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.loadingTime();
    expect(isVisible).toBeFalsy();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    // Exports in Resources C117467
    await io.homePage.goToMenu("Resources", "Exports");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON,
      "Flow description is not displayed"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.COPY_BUTTON);
    await page.mouse.wheel(0, 1000);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON
    );
    await io.flowBuilder.loadingTime();
    expect(isVisible).toBeFalsy();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
  });
});
