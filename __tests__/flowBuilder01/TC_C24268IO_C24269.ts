import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24268_C24269", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24268 @Zephyr-IO-T24269 @Env-All C24268_C24269", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON)
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');

    await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);

    await io.assert.verifyElementDisplayedByText(
      "Or choose from below",
      "Line is present"
    );

    await io.connectionPage.click(selectors.flowBuilderPagePO.EXISTING_RESOURCE_HELPTEXT);
    const secretText = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      "Your existing flow stepsSelect an existing flow step to clone or reuse in this flow. If you clone the flow step, you can modify the copy without changing the original. If you reuse the flow step, any changes you make will also affect any other flow that uses it.Was this helpful?",
      secretText,
      "New help text missing in export"
    );
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    await io.myAccountPage.clickByText("Import records into destination application"); 
    await io.connectionPage.click(selectors.flowBuilderPagePO.EXISTING_RESOURCE_HELPTEXT);
    
    let importtxt = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      "Your existing flow stepsSelect an existing flow step to clone or reuse in this flow. If you clone the flow step, you can modify the copy without changing the original. If you reuse the flow step, any changes you make will also affect any other flow that uses it.Was this helpful?",
      importtxt,
      "New help text missing in import"
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.EXPORT_TYPE);
    await io.myAccountPage.clickByText("Look up additional records (per record)");
    await io.connectionPage.click(selectors.flowBuilderPagePO.EXISTING_RESOURCE_HELPTEXT);
    let lookuptxt = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      "Your existing flow stepsSelect an existing flow step to clone or reuse in this flow. If you clone the flow step, you can modify the copy without changing the original. If you reuse the flow step, any changes you make will also affect any other flow that uses it.Was this helpful?",
      lookuptxt,
      "New help text missing in lookup"
    );
  });
});
