import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C35067 from '@testData/Flows/C35067.json';

test.describe("C35067 Verify downdload button UI in audit log", () => {
    test("@Env-QA @Env-IAQA C35067 Verify downdload button UI in audit log", async ({io, page}) => {
        await io.createResourceFromAPI(C35067, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
        await io.assert.verifyElementIsDisplayed('button:has-text("Download")', 'Download button not displayed in audit logs')
    });
  });