import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C113528.json";

test.describe(`C113528_C113529`, () => {
  test(`@Zephyr-IO-T7783 C113528_C113529`, async ({ io, page }) => {
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 200000});
    await io.connectionPage.addStep("Creating and running the flow");

    await io.assert.verifyElementContainsText('tbody tr:nth-child(1) td:nth-child(5)', "Success");
    await io.assert.verifyElementContainsText('tbody tr:nth-child(2) td:nth-child(5)', "Success");
    await io.connectionPage.addStep("Verifying that the flow ran successfully");

    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.clickByText('Clone flow');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("Automation Flows", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("FTP CONNECTION", 1);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("FULFILLMENT CONNECTION", 1);
    await io.flowBuilder.clickByText("Done");
    await io.connectionPage.addStep("Cloning the flow");

    await io.flowBuilder.clickByText("Last updated");
    await io.flowBuilder.clickByTextByIndex('Clone - C113528', 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.connectionPage.addStep("Opening the Cloned flow");
    await io.flowBuilder.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.connectionPage.addStep("Opening Export of the cloned flow");

    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.EDIT_RESOURCE, 1);
    await io.connectionPage.addStep("Opening Iclient");

    await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await expect(page.locator(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD)).toBeVisible();
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.GRANT_TYPE_PASSWORD, "Password credentials");
    await io.connectionPage.addStep("Verified 'Password credentials' grant type is present after cloning the flow");

    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_USERNAME)).toBeVisible();
    await expect(page.locator(selectors.connectionsPagePO.OAUTH2_PASSWORD)).toBeVisible();
    await io.connectionPage.addStep("Verified 'Username' and 'Password' fields are present after cloning the flow")
  });
});
