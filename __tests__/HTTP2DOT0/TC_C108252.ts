import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_CT26354T26351T28950T19565", () => {
  test("@Env-All CT26351 Verify help text for concurrency ID lock template", async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "HTTP");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP connection');
    await io.flowBuilder.clickByTextByIndex('HTTP connection', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'HTTP_Import');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.click(selectors.importPagePO.CONCURRENCY_HELPTEXT);
    await io.connectionPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    const concurrencyHelptext = (await io.flowBuilder.getText(selectors.myAccountPagePO.HELP_BUBBLE)) as string;
    await io.assert.expectToContainValue(`Concurrency ID lock templateEnter a handlebars expression to reference a unique ID for each record to ensure that it isn't processed by two concurrent import requests. A Concurrency ID lock template prevents integrator.io from simultaneously submitting duplicate records when the import connection has a concurrency level greater than 1. For example, if you are importing Zendesk records into NetSuite, then you could enter the {{{record.id}}} field to identify unique Zendesk records. No two records with the same Zendesk ID value would import into NetSuite at the same time.Was this helpful?Field path: import.idLockTemplate`,concurrencyHelptext,"helptext not found"
    );
  });
});
