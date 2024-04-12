import {test, expect} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C96303 Verify checkbox field type criteria gets cleared when user toggles between the API versions while creating NS real time export", () => {
    test("C96303 Verify checkbox field type criteria gets cleared when user toggles between the API versions while creating NS real time export", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.REALTIME);
        await io.flowBuilder.clickByText("Create from scratch");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.homePage.selectConnectionDropDown(page, 'NS 737 Conection');
        await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE);
        await io.flowBuilder.fill(`${selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE} input`,'Accounting Per')
        await io.flowBuilder.clickByText('Accounting Period');
        await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
        await io.flowBuilder.click(`${selectors.basePagePO.RADIO_BUTTON}${selectors.basePagePO.VALUE_TRUE}`);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE,1);
        await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, "value", `["aplocked","=",true]`);
        await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
        await io.flowBuilder.click(selectors.importPagePO.SUITEAPP_1);
        await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, "value", "[]");
    });
  });