import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import iaqa_script from "@testData/integration_apps/T5462_iaqa.json";
import qa_script from "@testData/integration_apps/T5462_qa.json";
import staging_script from "@testData/integration_apps/T5462_staging.json";

test.describe("T5462 To verify below schema is displayed for exports present1 in child IA", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T5462 T5462 To verify below schema is displayed for exports present in child IA", async ({
    io,
    page
  }) => {
    await io.homePage.addStep(
      "Navigate to Salesforce - NetSuite > Salesforce File to NetSuite File Add/Update"
    );

    await io.homePage.clickByText("Salesforce - NetSuite");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByText("Product");
    await io.homePage.clickByText(
      "NetSuite Item Group to Salesforce Product Add/Update"
    );
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("Opening Import");
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
    await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.flowBuilder.click(selectors.flowGroupingPagePO.SCRIPTTOGGLEBUTTON);

    const editorContent = JSON.parse(
      await page.locator(selectors.flowBuilderPagePO.SCRIPT_DATA).evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      })
    );

    const license = editorContent.license;
    const resource = editorContent.resource;
    if (await page.url().includes("https://qa.staging.")) {
      await io.assert.expectToBeValue(
        qa_script.resource._id,
        resource._id,
        "Resource ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.resource._connectionId,
        resource._connectionId,
        "Connection ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.resource._integrationId,
        resource._integrationId,
        "Integration ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.resource._connectorId,
        resource._connectorId,
        "Connector ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.resource.externalId,
        resource.externalId,
        "External ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.resource.adaptorType,
        resource.adaptorType,
        "Adaptor Type is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.license._id,
        license._id,
        "License ID is not as expected"
      );
      await io.assert.expectToBeValue(
        qa_script.license._integrationId,
        license._integrationId,
        "License Integration ID is not as expected"
      );
    } else if (page.url().includes("https://iaqa.staging.")) {
      await io.assert.expectToBeValue(
        iaqa_script.resource._id,
        resource._id,
        "Resource ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.resource._connectionId,
        resource._connectionId,
        "Connection ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.resource._integrationId,
        resource._integrationId,
        "Integration ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.resource._connectorId,
        resource._connectorId,
        "Connector ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.resource.externalId,
        resource.externalId,
        "External ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.resource.adaptorType,
        resource.adaptorType,
        "Adaptor Type is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.license._id,
        license._id,
        "License ID is not as expected"
      );
      await io.assert.expectToBeValue(
        iaqa_script.license._integrationId,
        license._integrationId,
        "License Integration ID is not as expected"
      );
    }
    else if(page.url().includes("https://staging.")){
        await io.assert.expectToBeValue(
            staging_script.resource._id,
            resource._id,
            "Resource ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.resource._connectionId,
            resource._connectionId,
            "Connection ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.resource._integrationId,
            resource._integrationId,
            "Integration ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.resource._connectorId,
            resource._connectorId,
            "Connector ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.resource.externalId,
            resource.externalId,
            "External ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.resource.adaptorType,
            resource.adaptorType,
            "Adaptor Type is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.license._id,
            license._id,
            "License ID is not as expected"
          );
          await io.assert.expectToBeValue(
            staging_script.license._integrationId,
            license._integrationId,
            "License Integration ID is not as expected"
          );
    }
    await io.assert.expectToBeValue(
        "connector",
        license.type,
        "License Type is not as expected"
      );
      await io.assert.expectToBeValue(
        "premium",
        license.opts.connectorEdition,
        "Connector Edition is not as expected"
      );
    expect(editorContent.parentResource).toStrictEqual({});
    expect(editorContent.parentLicense).toStrictEqual({});
    expect(license.sandbox).toBe(false);
    expect(license.resumable).toBe(false);
    expect(editorContent.sandbox).toBe(false);
  });
});
