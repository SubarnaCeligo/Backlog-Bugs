
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C28177_HttpExport_Nextpagetoken.json";

test.describe("TC_C20704_Verify_Using_Invalid_Html_Tags_Query", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4064 TC_C20704_Verify_Using_Invalid_Html_Tags_Query", async ({io,page}, testInfo) => {
    test.step("*** TC_C20704_Verify_Using_Invalid_Html_Tags_Query  ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as export ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];

    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
    test.step("*** Choosing the HTTP ZD connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "http://api.localhost.io:3000/v1/jobs?_flowId=12345<script>alert(1);</script>");
    test.step("*** Naming the PageGenerator ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.DESCRIPTION, " http://api.localhost.io:3000/v1/jobs?_flowId<script>alert(1);</script>=12345");
    test.step("*** Filling the Description ***", async ()=>{});

    test.step("*** Clicking on Http Post method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_METHOD, "GET");

    test.step("*** Entering the data in relativeUri ***", async ()=>{});
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "users");

    test.step("*** Selecting the type of export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.REDSHIFT_EXPORT_TYPE);
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);

    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    var exportName = await io.exportjson;
    console.log("Export Name ", JSON.stringify(exportName));

    var exportJson = await io.api.getExport( exportName);
    console.log("Export Json details", JSON.stringify(exportJson));

    test.step("*** Validating the valid name and description ***", async ()=>{});
    var name = exportJson.name;
    await expect(name).not.toBe("http://api.localhost.io:3000/v1/jobs?_flowId=12345<script>alert(1);</script>"
    );
    var description = exportJson.description;
    await expect(description).not.toBe("http://api.localhost.io:3000/v1/jobs?_flowId<script>alert(1);</script>=12345"
    );
  });
});
