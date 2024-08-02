import { links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C25997 from '../../../testData/inputData/Webhook_Listeners/C25997.json';

test.describe("C25997 - Verify that admin/manage user is able to stop debug on listeners", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4853 C25997 - Verify that admin/manage user is able to stop debug on listeners", async ({ io, page }) => {

    //Create a flow with webhook
    await io.createResourceFromAPI(C25997, "FLOWS");

    //Open the listener and start debug logs for 15 mins
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.getByRoleClick('button', 'Apply');

    //Wait for debugging to start and then verify if the user is able to stop the debugging
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.flowBuilder.clickByText('Stop debug');

    //Verify if debugging is stopped.
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REFRESH_RESOURCE, 'Admin user is able to stop debug');


  });

}
)