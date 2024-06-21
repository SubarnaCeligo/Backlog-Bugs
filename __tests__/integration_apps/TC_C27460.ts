import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27460 To verify below schema is displayed for exports present in child IA", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Env-IAQA @Zephyr-IO-T5459 C27460 To verify below schema is displayed for exports present in child IA", async ({ io, page }) => {
        await io.homePage.addStep("Navigate to Salesforce - NetSuite > Salesforce File to NetSuite File Add/Update")

        await io.homePage.clickByText("Salesforce - NetSuite");
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.clickByText('Product');
        await io.homePage.clickByText("NetSuite Item Group to Salesforce Product Add/Update");

        await io.flowBuilder.addStep("Opening Export");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.basePagePO.CUSTOM_SETTING);
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_EDITOR);
        await io.flowBuilder.click(selectors.flowGroupingPagePO.SCRIPTTOGGLEBUTTON);

        const editorContent = JSON.parse(await page.locator(selectors.flowBuilderPagePO.SCRIPT_DATA).evaluate(e => {
            // @ts-ignore
            const editor = ace.edit(e);
            return editor.getValue();
        }));

        const license = editorContent.license;
        const resource = editorContent.resource;

        await io.assert.expectToBeValue('6602c7faf987024931335393', resource._id, "Resource ID is not as expected");
        await io.assert.expectToBeValue('660293ee84f0ae58072dc824', resource._connectionId, "Connection ID is not as expected");
        await io.assert.expectToBeValue('660293ee84f0ae58072dc80a', resource._integrationId, "Integration ID is not as expected");
        await io.assert.expectToBeValue('5b61ae4aeb538642c26bdbe6', resource._connectorId, "Connector ID is not as expected");
        await io.assert.expectToBeValue('netsuite_item_group_to_salesforce_product_export', resource.externalId, "External ID is not as expected");
        await io.assert.expectToBeValue('NetSuiteExport', resource.adaptorType, "Adaptor Type is not as expected");
        await io.assert.expectToBeValue('66028d83f98702493132d60d', license._id, "License ID is not as expected");
        await io.assert.expectToBeValue('660293ee84f0ae58072dc80a', license._integrationId, "License Integration ID is not as expected");
        await io.assert.expectToBeValue('connector', license.type, "License Type is not as expected");
        await io.assert.expectToBeValue('premium', license.opts.connectorEdition, "Connector Edition is not as expected");
        expect(editorContent.parentResource).toStrictEqual({});
        expect(editorContent.parentLicense).toStrictEqual({});
        expect(license.sandbox).toBe(false);
        expect(license.resumable).toBe(false);
        expect(editorContent.sandbox).toBe(false);
    });
});
