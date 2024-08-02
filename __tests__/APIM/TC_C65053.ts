import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("APIM Help Text Validation", () => {
    test("@Zephyr-IO-T9350 @Env-QA @Env-STAGING APIM Help Text Validation", async ({ io, page, context }) => {
        const randomString = "Import" + Math.random().toString(36).substring(7);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.IMPORTS);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.SLACK_CONNECTION);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText("Slack Connection");
        await io.flowBuilder.fill(selectors.importPagePO.NAME, randomString);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLS);
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SLACKCALLADD);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APIMSEARCH, randomString);
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PUSHTOAPIM)
        await io.flowBuilder.loadingTime();
        // Gateway URL help text
        const gatewayvalue = await (await page.$(selectors.flowBuilderPagePO.APIMGATEWAY)).textContent();
        await io.assert.expectToBeTrue(gatewayvalue.toString().includes("Gateway URL"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMGATEWAYHELPTEXTBUTTON);
        const gatewayhelptext = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        await io.assert.expectToBeTrue(gatewayhelptext.toString().includes("Gateway URL = Base URI + Context path + Endpoint."), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMGATEWAYHELPTEXTBUTTON);
        // context path
        const contextpath = await (await page.$(selectors.flowBuilderPagePO.APIMCONTEXTPATHFIELD)).textContent();
        await io.assert.expectToBeTrue(contextpath.toString().includes("Context path *"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMCONTEXTPATHHELPTEXTBUTTON);
        const constextpathhelptext = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        await io.assert.expectToBeTrue(constextpathhelptext.toString().includes("For example, if you’re creating a connection to SpaceX, your gateway context path is /spacex."), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMCONTEXTPATHHELPTEXTBUTTON);
        //operation
        const operation = await  (await page.$(selectors.flowBuilderPagePO.APIMOPERATIONHELPTEXT)).textContent();
        await io.assert.expectToBeTrue(operation.toString().includes("Operation"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATIONHELPTEXTBUTTON);
        const operationhelptext = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        await io.assert.expectToBeTrue(operationhelptext.toString().includes("Choose an operation from the list of HTTP methods. For exports, the GET operation is automatically generated:\n • Use the GET method to retrieve data and invoke the API with an export. • Use the POST method to send data, create a new resource, or to invoke the API with an import.• Use the DELETE method to delete a specific resource or invoke the API with an import.Was this helpful?"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPERATIONHELPTEXTBUTTON);
        // endpoint
        const flow = await  (await page.$(selectors.flowBuilderPagePO.APIMENDPOINT)).textContent();
        await io.assert.expectToBeTrue(flow.toString().includes("Endpoint"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMENDPOINTHELPTEXTBUTTON);
        const flowhelptext = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        await io.assert.expectToBeTrue(flowhelptext.toString().includes('Describe your API endpoint... For example, if your Gateway context path is /spacex and your export calls a list of all rockets'), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMENDPOINTHELPTEXTBUTTON);
        // openspec
        const openspec = await  (await page.$(selectors.flowBuilderPagePO.APIMOPENSPECWARNINGTITLE)).textContent();
        await io.assert.expectToBeTrue(openspec.toString().includes("OpenAPI Specification (OAS)"), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPENSPECHELPTEXTBUTTON);
        const openspectext = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
        await io.assert.expectToBeTrue(openspectext.toString().includes('Review all OpenAPI Specifications generated by integrator.io in the API manager at API > Documentation. Manually update the paths, securitySchemes, or other details as needed.Was this helpful?'), "message doesn't match");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMOPENSPECHELPTEXTBUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.APIMCLOSEMANAGER);
    });
}
);
