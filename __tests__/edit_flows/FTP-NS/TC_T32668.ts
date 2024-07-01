import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T32668  Verify help text changes for create source", () => {
  test("@Zephyr-IO-T32668 @Env-All  @Priority-P2", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATOR);
    await io.homePage.addStep("*** Clicked on create export ***");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Salesforce");
    await io.flowBuilder.clickByText('Salesforce');
    await io.flowBuilder.clickByText("Export records from source application");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      3
    );
    await io.homePage.loadingTime();
    const value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue =
      "Enter keywords, examples, or use cases to search for similar flow steps that already exist in your account integrations and the Marketplace templates. Select a matching flow step to use as the basis for your new flow step. This field is limited to 300 characters.";
    const func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      4
    );
    await io.homePage.loadingTime();
    const value1 = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue1 =
      "Select an existing flow step to clone or reuse in this flow. If you clone the flow step, you can modify the copy without changing the original. If you reuse the flow step, any changes you make will also affect any other flow that uses it.";
    const func1 = value1.toString().includes(expectedvalue1);
    await io.assert.expectToBeTrue(func1, "help text doesn't match");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      5
    );
    await io.homePage.loadingTime();
    const value2 = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue2 =
      "Select a marketplace flow step to clone this flow. If you clone the flow step, you can modify the copy without changing the original.";
    const func2 = value2.toString().includes(expectedvalue2);
    await io.assert.expectToBeTrue(func2, "help text doesn't match");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );

    //Click on any existing resource
    await io.flowBuilder.delay(1000 * 10 * 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.SAVE
    );
    //Verify if Next button is clickable
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    //select connection
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "SALESFORCE CONNECTION");
    await io.flowBuilder.clickByTextByIndex("SALESFORCE CONNECTION", 0);
    //Get Form label
    let formLabel = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.CLONE_RESOURCE_LABEL)).toString();
    await io.assert.expectToContainValue("How would you like to use the existing flow step? *", formLabel, "Form label is not displayed");
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.HELP_TEXT_ICON,
      4
    );
    const value3 = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue3 =
      "Clone flow step: This option creates a copy of the original flow step that can be modified to suit the purposes of this flow without affecting the original.Use same flow step: This option reuses the existing flow step. Modifications to the flow step will apply to other instances of the flow step if used in other flows.";
    const func3 = value3.toString().includes(expectedvalue3);
    await io.flowBuilder.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
  });
}
);


