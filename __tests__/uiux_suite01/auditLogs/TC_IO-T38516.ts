import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify that the user should be able to select dates within one year with the default license'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @Zephyr-IO-T38516'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        //IO-T38516 Verify that the user should be able to select dates within one year with the default license
        // Get the current date and subtract 1 year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const formattedDate = oneYearAgo.toISOString();
        console.log("formattedDate",formattedDate);
        const test = await io.api.getCall(`v1/audit?from=${formattedDate}`);
        const user = test.find(item => item.resourceType === "user").source;
        expect(user).toEqual("ui");



        // User is not able to select date more than 1 year
        const oneYearAgo1 = new Date();
        oneYearAgo1.setDate(oneYearAgo1.getDate() - 1);
        oneYearAgo1.setFullYear(oneYearAgo1.getFullYear() - 1);
        const formattedDate1 = oneYearAgo1.toISOString();
        console.log("formattedDate1",formattedDate1);
        const test1 = await io.api.getCall(`v1/audit?from=${formattedDate1}`);
        const errorText = test1.errors[0].message;
        await io.assert.expectToBeValue(errorText, "Please make sure that the time provided for field: “from” is not older than 1 year(s) to current date and is not a future date.", 'Error is not disabled.')
    });
});