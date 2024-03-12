import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/monitorSuite/C25999.json";

test.describe("C25999_Verify stop is shown, but should be disabled for the monitor users", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C25999_Verify stop is shown, but should be disabled for the monitor users", async ({ io }) => {
        let flowId; let expId;
        var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
        expId = TC.qa__api_tdata[0].createFlow.pageGenerators[0]._exportId
        flowId = flows.get(TC.name)["flowId"];
        // Get the current date
        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 15);
        const formattedDateTime = currentDate.toISOString().slice(0, -5) + '.000Z';
        TC.patchCall[0].value = formattedDateTime
        var js = JSON.stringify(TC.patchCall);
        const res = await io.api.patchCall(
            `v1/exports/` + expId,
            TC.patchCall
        );
        await io.signInPage.reloadPage();
        await io.flowBuilder.navigateTo(
            process.env.IO_Integration_URL + "flowBuilder/" + flowId
        );

        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        // Validating Stop button should be shown but disabled for monitor users
        await io.assert.verifyElementNotToBeClickable("text='Stop debug'")
    });
});
