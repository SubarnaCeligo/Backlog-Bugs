import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify all tooltips on EDI dashboard", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-31713 @Priority-P3 @Zephyr-IO-T29030 Verify all tooltips on EDI dashboard", async ({ io, page }) => {

    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);

    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.HELP_TEXT_ICON);
    
   
    await io.homePage.addStep('Tooltip for FA status');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 0);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    let tooltipHeader = (await io.homePage.getText(selectors.exportsPagePO.TITLE)).toString();
    await io.assert.expectToContainValue('FA status', tooltipHeader, 'Incorrect tooltip header');
    let tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'The Functional Acknowledgment (FA) status (a specific type of EDI transaction). The FA status signifies whether the received EDI document was processed successfully or partially, with or without any errors.',
      tooltip,
      'Tooltip for FA status is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.addStep('Tooltip for Data processed on');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 1);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltipHeader = (await io.homePage.getText(selectors.exportsPagePO.TITLE)).toString();
    await io.assert.expectToContainValue('Date processed', tooltipHeader, 'Incorrect tooltip header');
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'The date and time an EDI transaction was processed. This timestamp helps to track document or transaction lifecycles and efficiently manage timelines within business processes.',
      tooltip,
      'Tooltip for Data processed on is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.addStep('Tooltip for Intr ctrl no.');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 2);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltipHeader = (await io.homePage.getText(selectors.exportsPagePO.TITLE)).toString();
    await io.assert.expectToContainValue('Interchange control number',tooltipHeader, 'Incorrect tooltip header');
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'A unique identifier assigned to an EDI Interchange. An interchange refers to one or more EDI documents or transactions sent to a receiver via a single transmission. It helps to track, manage, and ensure the integrity of data exchanged between trading partners.',
      tooltip,
      'Tooltip for Intr ctrl no. is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.addStep('Tooltip for Group ctrl no.');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 3);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltipHeader = (await io.homePage.getText(selectors.exportsPagePO.TITLE)).toString();
    await io.assert.expectToContainValue('Group control number', tooltipHeader, 'Incorrect tooltip header');
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'A unique identifier used within a specific group of related transaction sets or documents within an EDI transmission. It helps to manage and organize batches of similar transactions sent between trading partners.',
      tooltip,
      'Tooltip for Group ctrl no. is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);


    await io.homePage.addStep('Tooltip for Trans set ctrl no.');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON,4);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltipHeader = (await io.homePage.getText(selectors.exportsPagePO.TITLE)).toString();
    await io.assert.expectToContainValue('Transaction set control number', tooltipHeader, 'Incorrect tooltip header');
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'A unique identifier assigned to each individual transaction set within a group in an EDI transmission. It ensures that each transaction set, such as an invoice or purchase order, can be uniquely identified and managed throughout the data exchange process.',
      tooltip,
      'Tooltip for Trans set ctrl no. is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FILTER_BUTTON);

    await io.homePage.addStep('Tooltip for Total flow runs');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 0);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'The number of times the flow has been completed for the selected date range.',
      tooltip,
      'Tooltip for Total flow runs is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.addStep('Tooltip for Avg run time');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 1);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'The average amount of time it takes for a flow to run from execution to completion. This calculation also includes the average amount of time a flow must wait in a queue before the actual run.',
      tooltip,
      'Tooltip for Avg run time is not visible'
    );
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.addStep('Tooltip for Auto-resolved');
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.HELP_TEXT_ICON, 2);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
    tooltip = (await io.homePage.getText(selectors.dashboardPagePO.TOOLTIP_CONTENT)).toString();
    await io.assert.expectToContainValue(
      'The number of errors automatically resolved because they matched another error’s trace key (unique field identifier).',
      tooltip,
      'Tooltip for Auto-resolved is not visible'
    );

    //Verify hyperlink in tooltip
    await io.assert.verifyElementAttribute(selectors.dashboardPagePO.TOOLTIP_HYPERLINK, 'href', 'https://docs.celigo.com/hc/en-us/articles/360060740672-Set-a-custom-trace-key-to-uniquely-identify-a-record')


  });
});