
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22581_general_custom_fields_forms.json";
import FTP1 from "@testData/GENERAL/TC_C22581_general_custom_fields_forms_1.json";
import test1 from "@testData/GENERAL/TC_C22581.json";

test.describe("TC_C22581", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C22581", async ({ io, page }, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C22581_flow_grp1");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();
    var intId = await io.api.getIntegrationId("TC_C22581_flow_grp1");

    await io.ilm.navigateToIntegrationById(intId);
    await io.homePage.isPageLoaded();

    FTP.qa__api_tdata[0].createFlow._integrationId = intId;
    FTP1.qa__api_tdata[0].createFlow._integrationId = intId;

    var flow1 = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var flow2 = await io.api.createImpOrExpAndFlowsThruAPI(FTP1);

    FTP.qa__api_tdata[0].createFlow._integrationId = "";
    FTP1.qa__api_tdata[0].createFlow._integrationId = "";

    await io.flowgrouping.createFlowGroups("TC_C22581_gr", [flow1.get(FTP.name)["flowId"],
    flow2.get(FTP1.name)["flowId"],
    ]);

    await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);

    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);

    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, test1.script);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.fillWebPage("[data-test='test_custom_field']", "12");
    await io.homePage.fillWebPage("[data-test='test_custom_field1']", "134");
    await io.homePage.fillWebPage("[data-test='test_custom_field2']", "76");

    await io.homePage.click(selectors.basePagePO.MFA_SAVE);

    var resp = await io.api.getCall(`v1/integrations/${intId}`);
    await io.assert.expectToContainValue(resp, "settingsForm", "");

    await io.api.deleteIntegration(intId);


    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
