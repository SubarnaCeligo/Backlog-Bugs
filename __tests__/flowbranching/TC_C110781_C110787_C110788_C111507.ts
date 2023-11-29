import { test, expect } from "@celigo/ui-core-automation";
import fb from "@testData/flowbranching/TC_C110781_C110787_C110788_C111507.json"
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C110781_C110787_C110788_C111507", () => {

    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C110781_C110787_C110788_C111507", async ({
        io,page
    }, testInfo) => {
        let flowid
        await test.step("*** Creating FlowBranching from API ***", async () => {
         flowid=  await io.flowbranching.createFlowBranchFromAPI(fb);
        });

        await io.homePage.navigateTo(process.env["IO_Integration_URL"]+"flowBuilder/"+flowid);


        let unmerge=selectors.flowBranchingPO.UNMERGE_BRANCHING
       await io.signInPage.reloadPage();
       await io.flowBuilder.waitForElementAttached(unmerge)
       await io.assert.checkSnapshot(unmerge,"C110781.png")
       await io.myAccountPage.clickByIndex(unmerge, 0);
       await io.assert.verifyElementDisplayedByText('Unmerge branch', 'Unable to open unmerge menu');
       await io.homePage.clickByText('Unmerge branch');



    });
});
