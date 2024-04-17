import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import _ from 'lodash';

test.describe("Verify that EDI dashboard shows all the EDI activities in the account", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("Verify that EDI dashboard shows all the EDI activities in the account", async ({ io, page }) => {
    //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");

    //Open EDI activity
    await io.homePage.click("[data-test= 'edi-activity']");

    //Default view
    await io.homePage.addStep("Verify that Documents view is the default view when EDI activity dashboard is opened");
    //Add validations

    //Frozen top row
    await io.homePage.addStep("Veriify the top row is frozen in the EDI dashboard");
    //Add validations

    //Verify columns
    await io.homePage.addStep("Verify that the EDI dashboard displayes all the applicable EDI columns");
    let expectedColumsArray = ["Doc no", "Doc type", "FA status", "File type", "Direction", "Processed", "Int ctrl no", "Group ctrl no", "Trans set ctrl no", "Int sender", "Int receiver", "Group sender", "Group receiver"];
    let actualColumns = (await io.homePage.getText('.MuiTableRow-head')).toString();
    const actualColumnsArray: string[] = actualColumns.split(',');

    await io.assert.expectToBeTrue(_.isEqual(expectedColumsArray, actualColumnsArray), 'EDI colums are not added');
    
    //Verify data - TBD
    
  });
});