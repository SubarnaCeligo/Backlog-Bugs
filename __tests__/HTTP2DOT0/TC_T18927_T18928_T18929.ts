import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the help text for Name your exports/imports/lookups", () => {
  test("@Zephyr-IO-T18927 @Zephyr-IO-T18928 @Zephyr-IO-T18929 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the help text for Name your exports/imports/lookups", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME_HELP_TEXT);
    await io.flowBuilder.click(selectors.exportsPagePO.NAME_HELP_TEXT); 
    let value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    let expectedvalue = "Name your resource so that you can easily reference it from other parts of the application."
    let func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the helptext for Name your import field");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_TYPE);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TYPE);

    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME_HELP_TEXT);
    await io.flowBuilder.click(selectors.exportsPagePO.NAME_HELP_TEXT); 
    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "Name your resource so that you can easily reference it from other parts of the application."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the helptext for Name your lookup field");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME_HELP_TEXT);
    await io.flowBuilder.click(selectors.exportsPagePO.NAME_HELP_TEXT);
    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "Name your resource so that you can easily reference it from other parts of the application."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the helptext for Name your export field");
  });

});