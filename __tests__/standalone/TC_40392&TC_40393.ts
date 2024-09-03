
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_40392&TC_40393.json";
import HTTP1 from "@testData/STANDALONE/HTTP_connection.json";

test.describe("TC_40392&TC_40393", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T5918 TC_40392", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C40392&TC_C40393_Flow");
    const labelEl = await page.getByText("TC_C40392&TC_C40393_Flow").first();
    await labelEl.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicking on Import  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Choosing HTTP Adaptor  ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    const conn = HTTP1[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Choosing HTTP adaptor choosing the connection and clicking on NEXT ***", async ()=>{});

    await io.homePage.loadingTime();
    const preview = await page.locator(selectors.importPagePO.CLICKPREVIEW).isVisible();
    await io.assert.expectToBeTrue(preview, "");
    test.step("*** Verified Preview button should be displayed ***", async ()=>{});

    const mockInputBtn = await page.locator(selectors.flowBranchingPO.EDIT_MOCK_INPUT).isVisible();
    await io.assert.expectToBeTrue(mockInputBtn, "");
    test.step("*** Verified Mock Input button should be displayed ***", async ()=>{});

    const toggle = await io.homePage.isVisible(selectors.importPagePO.CLICKSENDTOGGLE);
    test.step("*** Verified toggle button should not be displayed ***", async ()=>{});

    expect(toggle).toBeFalsy();

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T5919 TC_40393", async ({io,page}, testInfo) => {

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C40392&TC_C40393_Flow");
    // await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.CLICKONFLOW, "TC_C40392&TC_C40393_Flow");
    const labelEl = await page.getByText("TC_C40392&TC_C40393_Flow").first();
    await labelEl.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    
    const conn = HTTP1[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Http method clicking  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");
    test.step("*** Selecting the desired Http method  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/Users");
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clocked on Preview  ***", async ()=>{});
    
    await io.homePage.loadingTime();
    
    var reqURL = await io.homePage.getText(selectors.importPagePO.REQURL);
    await io.assert.expectToBeValue(String(reqURL), "https://d3v-celigolabs.zendesk.com/api/v2/Users", "");
    test.step("*** Verified Request URL field should populate with the request URL that IO has constructed  ***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Clicking On Close  ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking On Discard changes  ***", async ()=>{});
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
