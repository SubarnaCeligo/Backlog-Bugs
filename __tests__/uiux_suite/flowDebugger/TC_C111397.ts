import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111321 from '../../../testData/inputData/FlowDebugger/C111321.json';


test.describe("C111397, C111313, C111314, C111318, C111396, C111316, C111399, C110855 verify items populate under 'path to many' if there are array fields in the resource", () => {
    test("111397, C111313, C111314, C111318, C111396, C111316, C111399, C110855 verify items populate under 'path to many' if there are  array fields in the resource", async ({io, page},testInfo) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111321, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
        await page.getByRole('menuitem', { name: 'Add destination / lookup' }).click();
        await io.flowBuilder.click("[data-test=HTTP]");
        //await page.pause();
        await io.flowBuilder.clickByText(
            "Look up additional records (per record)"
          );
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.importsPage.getByRoleClick("option","3PL CONNECTION");
        await io.importsPage.clickByText("Next")

        await io.importsPage.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "Test IO-34461");
        await io.importsPage.clickByText("Yes (advanced)");
        await io.importsPage.click(selectors.flowBuilderPagePO.ONE_TO_MANY);

        let pathToManyOptions;
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
        pathToManyOptions = (await page.$$(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS));
        //no. of array fields in export json resource matching in import
        await test.step("C110855 ", async () => {
            expect(pathToManyOptions.length).toEqual(2);
        });

        await test.step("C111396, C111399, C111397", async () => {
            const option = await page.waitForSelector(`${selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS}:has-text("user.items")`);
            await option.click(); 
            expect(await page.locator(selectors.flowBuilderPagePO.ONE_TO_MANY).getAttribute('value')).toEqual('user.items');
        });

        await test.step("C111316, C111314, C111318, C111313 ", async () => {
            await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.fill(selectors.flowBuilderPagePO.ONE_TO_MANY, 'random');
            expect(await page.locator(selectors.flowBuilderPagePO.ONE_TO_MANY).getAttribute('value')).toEqual('random');
        });

    });
    
});