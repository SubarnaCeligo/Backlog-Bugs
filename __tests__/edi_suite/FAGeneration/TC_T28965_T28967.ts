import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S TC_T28965-Verify that selecting File type’ = ‘EDI X12' in an export shows 'Send functional acknowledgement' checkbox", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-36129 @Env-All @Priority-P1 @Zephyr-IO-T28965 @Zephyr-IO-T28967 Verify that selecting File type’ = ‘EDI X12' in an export shows 'Send functional acknowledgement' checkbox", async ({ io, page }) => {
    await io.homePage.addStep("For FTP")
    //Go to Exports
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);

    //Click new
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);

    //Enter a search keyword
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "FTP");

    //Select FTP
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.exportsPage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    //Fill details
    await io.exportsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.exportsPage.clickByTextByIndex("FTP CONNECTION", 0);
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, 'FTP FA test');

    //Click next
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    //select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    //Select Parsing def
    await io.exportsPage.fill(selectors.exportsPagePO.PARSING_DEF_SEARCHBOX, 'Generic-005010-997-Functional Acknowledgment');
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
    await io.exportsPage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.exportsPage.loadingTime();

    //Verify checkbox is displayed
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT, 'FA Checkbox is not displayed');

    //  Get Label
    let labelVisible = await io.exportsPage.isVisible("text='Send functional acknowledgement'");
    await io.assert.expectToBeTrue(labelVisible, 'FA Label is not displayed');

    //Get helptext
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_ICON);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_CONTEXT);
    let toolTip = (await io.exportsPage.getText(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_CONTEXT)).toString();
    await io.assert.expectToContainValue('Helps generate a 997 acknowledgment for received EDI X12 transactions, indicating successful receipt and processing status—accepted or rejected. Essential for confirming transactions and addressing issues quickly between trading partners.', toolTip, 'FA tooltip is not displayed');

    await io.exportsPage.addStep("IO-T28967-Verify that checking 'Send functional acknowledgement' checkbox shows a dropdown to to select the listener")
    //Click the checkbox
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);

    //Check if listener dropdown is displayed.
    let label = (await io.exportsPage.getText(selectors.exportsPagePO.FA_LISTENER_LABEL)).toString();
    await io.assert.expectToBeValue('Select listener for functional acknowledgement *', label, 'Label for FA listener dropdown is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.FA_LISTENER_DROPDOWN, 'FA Listener dropdwon is not displayed');
    await io.homePage.addStep("End of FTP")

    await io.homePage.addStep("For AS2")
    //For AS2
    //Go to Exports
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);

    //Click new
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);

    //Enter a search keyword
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "AS2");

    //Select FTP
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.AS2_CONNECTOR);
    await io.exportsPage.click(selectors.connectionsPagePO.AS2_CONNECTOR);

    //Fill details
    await io.exportsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.exportsPage.clickByTextByIndex("AS2 CONNECTION", 0);
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, 'AS2 FA test');

    //Click next
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    //select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    //Select Parsing def
    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 0);

    //Verify checkbox is displayed
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT, 'FA Checkbox is not displayed');

    //  Get Label
    label = (await io.exportsPage.getText(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_LABEL)).toString()
    await io.assert.expectToBeValue('Send functional acknowledgement', label, 'FA Label is not displayed');

    //Get helptext
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_ICON);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_CONTEXT);
    toolTip = (await io.exportsPage.getText(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT_HELPTEXT_CONTEXT)).toString();
    await io.assert.expectToContainValue('Helps generate a 997 acknowledgment for received EDI X12 transactions, indicating successful receipt and processing status—accepted or rejected. Essential for confirming transactions and addressing issues quickly between trading partners.', toolTip, 'FA tooltip is not displayed');

    await io.exportsPage.addStep("IO-T28967-Verify that checking 'Send functional acknowledgement' checkbox shows a dropdown to to select the listener")
    //Click the checkbox
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);

    //Check if listener dropdown is displayed.
    label = (await io.exportsPage.getText(selectors.exportsPagePO.FA_LISTENER_LABEL)).toString();
    await io.assert.expectToBeValue('Select listener for functional acknowledgement *', label, 'Label for FA listener dropdown is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.FA_LISTENER_DROPDOWN, 'FA Listener dropdwon is not displayed');

    await io.homePage.addStep("End of AS2")
  });
});