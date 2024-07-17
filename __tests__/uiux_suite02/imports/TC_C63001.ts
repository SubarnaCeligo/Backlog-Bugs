import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63001 from '@testData/Flows/C63001.json';

test.describe("C63001 Verify feedType dropdown fields is getting displayed in HTTP import to support createFeedDocument and createFeed endpoints", () => {
    test("@Env-All @Zephyr-IO-T10036 C63001 Verify feedType dropdown fields is getting displayed in HTTP import to support createFeedDocument and createFeed endpoints", async ({io, page}) => {
        await io.createResourceFromAPI(C63001, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.FEEDTYPE, 'Feed type dropdown is not displayed');
    });
  });