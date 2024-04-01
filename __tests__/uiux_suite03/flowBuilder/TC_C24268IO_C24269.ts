import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24268_C24269", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24268 @Zephyr-IO-T24269 @Env-STAGING C24268_C24269", async ({ io, page }) => {
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
      `Accelerate the flow building experience by cloning an existing flow step from your account, and then modify it as needed.`,
      secretText,
      "New help text missing in export"
    );
    await io.exportsPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.assert.verifyElementDisplayedByText(
      "Or choose from below",
      "Line is present"
    );
    
    await io.connectionPage.click(selectors.flowBuilderPagePO.EXISTING_RESOURCE_HELPTEXT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Microsoft SQL');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    let importtxt = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      `Accelerate the flow building experience by cloning an existing flow step from your account, and then modify it as needed.`,
      importtxt,
      "New help text missing in import"
    );
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.myAccountPage.clickByText("Look up additional records (per record)");
    let lookuptxt = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;

    await io.assert.expectToContainValue(
      `Accelerate the flow building experience by cloning an existing flow step from your account, and then modify it as needed.`,
      lookuptxt,
      "New help text missing in lookup"
    );
  });
});
