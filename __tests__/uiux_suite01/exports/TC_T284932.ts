import { expect, test } from "@celigo/ui-core-automation";
import connectionPayload from "../../../testData/inputData/Connections/T284932.json";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ShritiS T284932 - Verify that encrypted data containing escape characters is masked in the preview panel.", () => {
    test("@Bug-IO-68728 @Priority-P1 @Zephyr-IO-T284932 @Env-all Verify that encrypted data containing escape characters is masked in the preview panel.", async ({ io, page }) => {

        //Create a connection with encrypted data that contains all escape characters
        let response = await io.api.postCall('/v1/connections', connectionPayload);

        //Add new export
        await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.exportsPage.reloadPage()
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);

        //Search and select an application
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.exportsPage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "HTTP");
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.exportsPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        //select connection
        await io.exportsPage.click(selectors.basePagePO.CONNECTION);
        await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'TestMOC');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex('TestMOC', 0);

        //FIll manadatory details
        await io.exportsPage.fill(selectors.exportsPagePO.BQNAME,"TestExport")
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.exportsPagePO.HTTP_METHOD_DROPDOWN);
        await io.exportsPage.waitForElementAttached(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.exportsPage.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.exportsPage.waitForElementAttached(selectors.importPagePO.BODY);

        //Enter payload
        await io.exportsPage.fill(selectors.flowBuilderPagePO.HTTP_BODY_INPUT, '{"key" : "{{connection.http.encrypted.key}}"}');
        await io.exportsPage.click(selectors.exportsPagePO.MUI_COMPONENT_SELECT_TYPE);
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.LIMITTYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.LIMITTYPE);

        //Preview
        await io.exportsPage.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.exportsPage.loadingTime()
        //Verify if preview data is masked.
        await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.HTTPREQUEST);
        await io.exportsPage.click(selectors.exportsPagePO.HTTPREQUEST);
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        let request = await (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "key": "********"}', request, 'Encrypted data is not masked.');

        //Delete the connection after test
        await io.api.deleteCall('/v1/connections/' + response._id);

    });
});