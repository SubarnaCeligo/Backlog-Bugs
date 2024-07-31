import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53129 Verify for existing exports `How many records would you like to export?` Field is set to 1", () => {
  test("@Env-All @Zephyr-IO-T14422  C53129 Verify for existing exports `How many records would you like to export?` Field is set to 1", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
      await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.connectionPage.clickByText("GET");
    await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, "/users");
    await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
    await io.exportsPage.clickByText('Limit - export a set number of records');
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.LIMIT_RECORD_VALUE)    
    const value = await page.$eval(selectors.flowBuilderPagePO.LIMIT_RECORD_VALUE, (el) => el.getAttribute('value'));
    expect(value).toBe('1');

  });
});