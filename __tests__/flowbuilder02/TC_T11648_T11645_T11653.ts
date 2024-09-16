import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T11648 T11645 T11653 UX Sort and group", () => {
    test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T11648 @Zephyr-IO-T11645 @Zephyr-IO-T11653 @Env-All FTP Verify by group and sort records field", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.loadingTime();
         await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SORTANDGROUP);
        await io.flowBuilder.loadingTime();
        let sortField = await page.getByText("Sort records by fields");
        expect(await sortField.isVisible()).toBeTruthy();
        let groupField = await page.getByText("Group records by fields");
        expect(await groupField.isVisible()).toBeTruthy();
        // test if Sort record field is above Advanced and below Transfer section 
        await page.waitForSelector(selectors.flowBuilderPagePO.SORTANDGROUP); 
        let sortElement = await page.$(selectors.flowBuilderPagePO.SORTANDGROUP);
        let sortPosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, sortElement);
      
        let advanceElement = await page.$(selectors.importPagePO.ADVANCED);
        await advanceElement.scrollIntoViewIfNeeded();
        let advancePosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, advanceElement);

        let transferElement = await page.$(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
        await transferElement.scrollIntoViewIfNeeded();
        let transferPosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, transferElement);
        
        expect(sortPosition).toBeLessThan(advancePosition);
        expect(sortPosition).toBeGreaterThan(transferPosition);
    });
    test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T11648 @Zephyr-IO-T11645 @Zephyr-IO-T11653 @Env-All S3 Verify  group and sort records field", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon S3');
        await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);
        await io.flowBuilder.loadingTime();
         await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SORTANDGROUP);
        await io.flowBuilder.loadingTime();
        let sortField = await page.getByText("Sort records by fields")
        expect(await sortField.isVisible()).toBeTruthy();
        let groupField = await page.getByText("Group records by fields");
        expect(await groupField.isVisible()).toBeTruthy();
         // test if Sort record field is above Advanced and below Transfer section 
         await page.waitForSelector(selectors.flowBuilderPagePO.SORTANDGROUP); 
         let sortElement = await page.$(selectors.flowBuilderPagePO.SORTANDGROUP);
         let sortPosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, sortElement);
       
         let advanceElement = await page.$(selectors.importPagePO.ADVANCED);
         await advanceElement.scrollIntoViewIfNeeded();
         let advancePosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, advanceElement);
 
         let transferElement = await page.$(selectors.flowBuilderPagePO.WHERE_WOULD_TRANSFER);
         await transferElement.scrollIntoViewIfNeeded();
         let transferPosition = await page.evaluate((element) => (element as HTMLElement).getBoundingClientRect().top, transferElement);
         
         expect(sortPosition).toBeLessThan(advancePosition);
         expect(sortPosition).toBeGreaterThan(transferPosition);
    });
});