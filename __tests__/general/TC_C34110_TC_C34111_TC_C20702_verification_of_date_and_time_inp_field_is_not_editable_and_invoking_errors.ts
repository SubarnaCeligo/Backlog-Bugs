
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C34110_TC_C34111_TC_C20702_verification_of_date_and_time_inp_field_is_not_editable_and_invoking_errors.json";

test.describe("TC_C34110_TC_C34111_TC_C20702", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C34110_TC_C34111_TC_C20702", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var id = await io.api.getFlowId(FTP.name);
    await io.flowBuilder.navigateToTheFlow( id);
    await io.homePage.isPageLoaded();
    await io.api.checkJobStatusFromAPI(  FTP.name, id);
    var exp_id = await io.api.getExportId(FTP.qa__api_tdata[0].pageGenerators[0].qa__export.name);
    var resp = await io.api.postCall(`v1/exports/${exp_id}/invoke`, "{}");
    await io.assert.expectToBeValue(String(resp.errors[0].source), "application", "");
    await io.em2.getEm2ErrorTable(id);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.TIMESTAMP_ERROR_FILTER);
    await io.homePage.click(selectors.basePagePO.CUSTOM_IN_TIMESTAMP);
    var date1=await(await page.locator(selectors.basePagePO.CUSTOM_FIRST_DATE)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(date1, "true","");
    var date2 = await(await page.locator(selectors.basePagePO.CUSTOM_SEC_DATE)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(date2, "true","");
    await io.homePage.click(selectors.basePagePO.APPLY_BUTTON_CUSTOM);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.homePage.click(selectors.flowBuilderPagePO.DATE_RANGE);

    await io.homePage.click(selectors.basePagePO.CUSTOM_IN_TIMESTAMP);

    var date3 = await(await page.locator(selectors.basePagePO.CUSTOM_FIRST_DATE)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(date3,  "true","");
    var date4 = await(await page.locator(selectors.basePagePO.CUSTOM_SEC_DATE)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(date4,  "true","");
    await io.homePage.click(selectors.basePagePO.APPLY_BUTTON_CUSTOM);

    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 2);
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.homePage.click(selectors.myAccountPagePO.DEBUGTIMEINTERVAL);
    var debug_list = await page.$$(
      selectors.myAccountPagePO.DROPDOWNLIST_DEBUG_LOGS
    );
    expect(String(debug_list.length)).toEqual("5");

    await io.homePage.click(selectors.myAccountPagePO.DROPDOWNLIST_DEBUG_LOGS);

    await io.homePage.click(selectors.myAccountPagePO.DASHBOARD);

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_ALERT_MESSAGES);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SF_SOQL_QUERY, "Select id from Contact");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TYPE, "delta");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DELTA_DATE_FIELD, "Birthdate");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.basePagePO.RUNFLOW);

    var deltaDate = await(await page.locator(selectors.basePagePO.DELTA_DATE_FIELD)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(deltaDate,  "true","");
    var deltaTime = await page.locator(
      selectors.basePagePO.DELTA_TIME_FIELD
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(deltaTime, "true","");

    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_DELTA_FIELD);

    var deltaDate1 = await(await page.locator(selectors.basePagePO.DELTA_DATE_FIELD)
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(deltaDate1, "true","");
    var deltaTime1 = await page.locator(
      selectors.basePagePO.DELTA_TIME_FIELD
    ).getAttribute("readonly");
    await io.assert.expectToBeValue(deltaTime1,"true","");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
