import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("CIO46374", () => {
  test("@Env-All @Zephyr-IO-T26354 Verify configure refresh token is enabled", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.CREATE_CONNECTION
    );
    await io.flowBuilderDashboard.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(
      selectors.settingsPagePO.APP_NAME_INPUT
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "Tableau");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.TABLEAU
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TABLEAU);
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.HTTP_CNNECTOR
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
    );
    await io.flowBuilder.loadingTime();
    await io.assert.expectToBeTrue(
      await (
        await page.$(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM)
      ).isChecked(),
      "Configure refreshtoken is not checked"
    );
  });


  test("@Env-All @Zephyr-IO-T26351 Verify help text for concurrency ID lock template", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Create");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.settingsPagePO.APP_NAME_INPUT
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.HTTP_CNNECTOR
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.click(selectors.importPagePO.CONCURRENCY_HELPTEXT);
    await io.connectionPage.waitForElementAttached(
      selectors.myAccountPagePO.HELP_BUBBLE
    );
    const concurrencyHelptext = (await io.flowBuilder.getText(
      selectors.myAccountPagePO.HELP_BUBBLE
    )) as string;
    await io.assert.expectToContainValue(
      `Concurrency ID lock templateEnter a handlebars expression to reference a unique ID for each record to ensure that it isn't processed by two concurrent import requests. A Concurrency ID lock template prevents integrator.io from simultaneously submitting duplicate records when the import connection has a concurrency level greater than 1. For example, if you are importing Zendesk records into NetSuite, then you could enter the {{{record.id}}} field to identify unique Zendesk records. No two records with the same Zendesk ID value would import into NetSuite at the same time.Was this helpful?Field path: import.idLockTemplate`,
      concurrencyHelptext,
      "helptext not found"
    );
  });


  test("@Env-All @Zephyr-IO-T28950 Verify success and error values are saved when media type is plain text", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Create", 0);
    await io.homePage.click(selectors.homePagePO.CREATE_CONNECTION);

    await io.flowBuilder.waitForElementAttached(
      selectors.settingsPagePO.APP_NAME_INPUT
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");

    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

    await io.flowBuilder.click(selectors.connectionsPagePO.MEDIA_TYPE);
    await io.flowBuilder.click(selectors.connectionsPagePO.PLAINTEXT);
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.AUTH_TYPE
    );
    await io.flowBuilder.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.connectionsPagePO.CUSTOM
    );
    await io.connectionPage.click(selectors.connectionsPagePO.CUSTOM);

    await io.flowBuilder.click(
      "[data-test='Non-standard API response patterns']"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill("[name='/http/auth/failValues']", "500");
    await io.flowBuilder.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    await io.flowBuilder.fill("[name='/http/ping/relativeURI']", "/users");
    await io.flowBuilder.fill("[name='/http/ping/failValues']", "500");
    await io.flowBuilder.fill("[name='/http/ping/successValues']", "200");
    await io.flowBuilder.fill("[name='/http/baseURI']", "https://google.com");
    await io.flowBuilder.fill("[name='/name']", "CT28950");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();

    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);

    await io.flowBuilder.clickByTextByIndex("CT28950", 0);

    await io.flowBuilder.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);

    const ele = await (
      await page.$("[name='/http/auth/failValues']")
    ).getAttribute("value");

    // const autherror = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.FAILVALUE)).toString();
    await io.assert.expectToContainValue(
      "500",
      ele,
      "autherror value is not displayed"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    const errorvalue = await (
      await page.$("[name='/http/ping/failValues']")
    ).getAttribute("value");
    await io.assert.expectToContainValue(
      "500",
      errorvalue,
      "error value is not displayed"
    );
    const successvalue = await (
      await page.$("[name='/http/ping/successValues']")
    ).getAttribute("value");
    await io.assert.expectToContainValue(
      "200",
      successvalue,
      "successs value is not displayed"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "CT28950"
    );
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });


  test("@Env-All @Zephyr-IO-T19565 Verify xml file in AFE", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.clickByText("Create flow step");
    await io.flowBuilder.fill(selectors.exportsPagePO.BQNAME, "HTTP XML Parser");
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    const ConnName = await page.$$(selectors.exportsPagePO.BQNAME);
    ConnName[1].fill("CT19565");
    await io.flowBuilder.fill(
      selectors.importPagePO.HTTP_BASEURI,
      "https://5634b9e3-4bde-425a-adba-c5a031019b7a.mock.pstmn.io"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.flowBuilder.clickByText("XML");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE);
    await io.flowBuilder.clickByText("Custom");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.clickByText("GET");
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.URI, "/xmlparser");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TYPE);
    await io.flowBuilder.clickByText("All - always export all data");
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.RESOUCEPATH
    );

    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.RESOUCEPATH,
      "/soap:Envelope/soap:Body/AuthenticationTokenGetResponse"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Create flow step");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "CT19565");
    await io.flowBuilder.clickByTextByIndex("CT19565", 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_BODY);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "abc1234");
    const Cancel1 = await page.$$(selectors.basePagePO.CLOSE);
    await Cancel1[1].click();
    await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Exports");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "HTTP XML parser"
    );
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,
      "CT19565"
    );
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });
});
