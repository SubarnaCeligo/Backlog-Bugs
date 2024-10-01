import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar '", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-86043 @Priority-P2 @Env-QA @Zephyr-IO-T38515'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();

        //IO-T38515 Verify user should be able to select only dates within the last 3 years
        // Get the current date and subtract 1 year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 3);
        const formattedDate = oneYearAgo.toISOString();
        console.log("formattedDate", formattedDate);
        const test = await io.api.getCall(`v1/audit?from=${formattedDate}`);
        const user = test.find(item => item.resourceType === "user").source;
        expect(user).toEqual("ui");
    });
});