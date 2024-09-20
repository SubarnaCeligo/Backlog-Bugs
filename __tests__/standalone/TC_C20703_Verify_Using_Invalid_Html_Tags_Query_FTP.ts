
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/ftp_connection.json";

test.describe("TC_C20703_Verify_Using_Invalid_Html_Tags_Query_FTP", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4063 TC_C20703_Verify_Using_Invalid_Html_Tags_Query_FTP", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as export ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];

    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
    test.step("*** Choosing the FTP connection ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "http://api.localhost.io:3000/v1/jobs?_flowId=12345<script>alert(1);</script>"
    );
    test.step("*** Naming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.DESCRIPTION, " http://api.localhost.io:3000/v1/jobs?_flowId<script>alert(1);</script>=12345"
    );
    test.step("*** Filling the Description ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");

    const map = new Map()
    const filepath = "/FTP_uploads/ftp_verification.json";
    map.set("uploadFile", filepath);
    await io.homePage.fileUpload(map);
    await io.homePage.loadingTime();
    test.step("*** Uploading the desired File ***", async ()=>{});

    await io.homePage.fill(selectors.flowBuilderPagePO.DIRECTORYPATH, "12/123");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    var exportName = await io.exportjson;
    console.log("exportName", exportName);
    var exportJson = await io.api.getExport(exportName);

    test.step("*** Validating the valid name and description ***", async ()=>{});
    var name = exportJson.name;
    await expect(name).not.toBe("http://api.localhost.io:3000/v1/jobs?_flowId=12345<script>alert(1);</script>"
    );
    var description = exportJson.description;
    await expect(description).not.toBe("http://api.localhost.io:3000/v1/jobs?_flowId<script>alert(1);</script>=12345"
    );
  });
});
