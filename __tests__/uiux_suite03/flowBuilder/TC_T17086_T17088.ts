import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/HTTP2DOT0/TC_T17086_T17088.json";

test.describe("Verify query parameters", () => {
  test("@Zephyr-IO-T17086 @Zephyr-IO-T17088 @Env-All @Epic-IO-86262 @Priority-P2 - verify query parameters", async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);

    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.EXPORT_BUBBLE, 0);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE, 'value', 'businessId', 0);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE, 'value', 'businessId2', 1);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_RIGHT_SIDE, 'value', 'id1', 0);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_RIGHT_SIDE, 'value', 'id2', 1);

    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.EXPORT_BUBBLE, 1);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE, 'value', 'businessId', 0);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE, 'value', 'startDate', 1);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_LEFT_SIDE, 'value', 'endDate', 2);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_RIGHT_SIDE, 'value', 'id1', 0);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_RIGHT_SIDE, 'value', '123', 1);
    await io.assert.verifyElementAttribute(selectors.exportsPagePO.QUERY_PARAMS_RIGHT_SIDE, 'value', '456', 2);
  });

});