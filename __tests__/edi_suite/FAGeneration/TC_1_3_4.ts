import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that selecting File type’ = ‘EDI X12' in an export shows 'Send functional acknowledgement' checkbox", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that selecting File type’ = ‘EDI X12' in an export shows 'Send functional acknowledgement' checkbox", async ({ io, page }) => {
    //Go to Exports
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);

    //Click new
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);

    //Enter a search keyword that doesn't match with any existing apps
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "FTP");

    //Select FTP
    await io.exportsPage.waitForElementAttached('[data-test="FTP"]');
    await io.exportsPage.click('[data-test="FTP"]');

    //Fill details
    await io.exportsPage.click('[data-test="connection"]');
    await io.exportsPage.waitForElementAttached("#connections-dropdown-listbox");
    await io.exportsPage.clickByText("FTP CONNECTION");

    //CLick next
    await io.exportsPage.click('[data-test="save"]');
    await io.exportsPage.click('[data-test="file.type"]');
    await io.exportsPage.waitForElementAttached('[role="listbox"]');

    //[data-value="filedefinition"]
    await io.exportsPage.click('[data-value="filedefinition"]');
    await io.exportsPage.waitForElementAttached('[id="mui-component-select-/edix12/format"]');
    await io.exportsPage.click('[id="mui-component-select-/edix12/format"]');

    await io.exportsPage.waitForElementAttached('[data-value="84lumberedi850"]');
    await io.exportsPage.click('[data-value="84lumberedi850"]');

    //Verify if chjeckbox is added

    await io.exportsPage.addStep("Verify that checking 'Send functional acknowledgement'  checkbox shows a dropdown to to select the listener");

    await io.exportsPage.checkAndUncheck('','');

    await io.exportsPage.addStep("Verify that default FA Listerer is auto selected in the FA dropdown.");

    await io.exportsPage.addStep("Verify that user is able to save an export after configuring FA");
    
  });
});