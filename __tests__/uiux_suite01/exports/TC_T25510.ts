import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T25510 Verify the relative URL for mutiple endpoints and resources", () => {
  test("@Env-All @Zephyr-IO-T25510 @Priority-P2 T25510 Verify the relative URL for mutiple endpoints and resources UI_Backlog", async ({ io, page }) => {
    await io.flowBuilder.navigateTo(io.data.links.EXPORTS_PAGE_URL);

    await io.flowBuilder.addStep("*** Creating a new JazzHR Export ***"); 
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'JazzHR');
    await io.flowBuilder.clickByText('JazzHR');
    await io.flowBuilder.loadingTime();
    
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T25510_Export');
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.clickByText("JAZZHR CONNECTION", { exact: false});
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep("*** Selecting a resource and endpoint ***");
    await io.flowBuilder.clickByTextByIndex('Please select', 0);
    await io.flowBuilder.clickByText('Activities');

    await io.flowBuilder.clickByTextByIndex('Please select', 0);
    await io.flowBuilder.clickByText('Get all activities');

    await io.flowBuilder.addStep("*** Navigating to HTTP view and verifying the relative url ***");
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
        selectors.exportsPagePO.HTTP_RELATIVE_URI_INPUT,
        'value',
        '/activities/page/{{{export.http.paging.page}}}',
    );

    await io.flowBuilder.addStep("*** Navigating to Simple view and changing the resource and endpoint ***");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.clickByText('Activities');
    await io.flowBuilder.clickByText('Applicants');
    await io.flowBuilder.clickByText('Please select');
    await io.flowBuilder.clickByText('Get all applicants');

    await io.flowBuilder.addStep("*** Navigating to HTTP view and verifying the relative url ***");
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
        selectors.exportsPagePO.HTTP_RELATIVE_URI_INPUT,
        'value',
        '/applicants/page/{{{export.http.paging.page}}}',
    );
  });
});