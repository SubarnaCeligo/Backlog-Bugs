import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63001 from '@testData/Flows/C63001.json';

test.describe("T10034", () => {
    test("@Zephyr-IO-T10034", async ({io, page}) => {
        await io.createResourceFromAPI(C63001, "FLOWS");
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.FEEDOPTIONSHELP);
        await io.flowBuilder.click(selectors.importPagePO.FEEDOPTIONSHELP);
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HELP_BUBBLE);
        const helpText = (await io.flowBuilder.getText(
        selectors.connectionsPagePO.HELP_BUBBLE
          )) as string;
    
            await io.assert.expectToContainValue(
            `Additional options to control the feed. These vary by feed type`,
            helpText,
            "Help text missing in import"
          );
    });
  });
