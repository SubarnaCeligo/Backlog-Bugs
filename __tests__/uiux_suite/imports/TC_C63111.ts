import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63111 from '../../../testData/Flows/C63111.json';

test.describe("C63111 To verify that the a text box in the UI to accept the feedOptions. This will be only visible when the “Feed Type“ dropdown is visible in UI.", () => {
    test("C63111 To verify that the a text box in the UI to accept the feedOptions. This will be only visible when the “Feed Type“ dropdown is visible in UI.", async ({io, page}) => {
        await io.fillFormUI(C63111, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.FEEDTYPE, 'Feed type dropdown is not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.FEEDOPTIONS, 'Feed Options textbox is not displayed');
    });
  });