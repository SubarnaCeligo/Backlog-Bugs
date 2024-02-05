
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C31697 from "@testData/GENERAL/TC_C31697.json";

test.describe("TC_C31697", () => {
  let createExport1,
    createExport2,
    createExport3,
    createExport4,
    createExport5,
    createExport6,
    createExport7;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C31697", async ({io,page}, testInfo) => {
    var createExport1,
      createExport2,
      createExport3,
      createExport4,
      createExport5,
      createExport6,
      createExport7;
    if(process.env["NODE_ENV"] == "qa" || process.env["NODE_ENV"] == "qaprod") {
      createExport1 = await io.createExportViaApi(TC_C31697[0].qaexportDoc1);
      createExport2 = await io.createExportViaApi(TC_C31697[0].qaexportDoc2);
      createExport3 = await io.createExportViaApi(TC_C31697[0].qaexportDoc3);
      createExport4 = await io.createExportViaApi(TC_C31697[0].qaexportDoc4);
      createExport5 = await io.createExportViaApi(TC_C31697[0].qaexportDoc5);
      createExport6 = await io.createExportViaApi(TC_C31697[0].qaexportDoc6);
      createExport7 = await io.createExportViaApi(TC_C31697[0].qaexportDoc7);
    } else {
      createExport1 = await io.createExportViaApi(TC_C31697[1].stageexportDoc1);
      createExport2 = await io.createExportViaApi(TC_C31697[1].stageexportDoc2);
      createExport3 = await io.createExportViaApi(TC_C31697[1].stageexportDoc3);
      createExport4 = await io.createExportViaApi(TC_C31697[1].stageexportDoc4);
      createExport5 = await io.createExportViaApi(TC_C31697[1].stageexportDoc5);
      createExport6 = await io.createExportViaApi(TC_C31697[1].stageexportDoc6);
      createExport7 = await io.createExportViaApi(TC_C31697[1].stageexportDoc7);
    }
    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.clickByText(createExport1.name);
    var hrefexist1 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist1, "");

    await io.homePage.clickByText(createExport2.name);
    var hrefexist2 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist2, "");

    await io.homePage.clickByText(createExport3.name);
    var hrefexist3 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist3, "");

    await io.homePage.clickByText(createExport4.name);
    var hrefexist4 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist4, "");

    await io.homePage.clickByText(createExport5.name);
    var hrefexist5 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist5, "");

    await io.homePage.clickByText(createExport6.name);
    var hrefexist6 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist6, "");

    await io.homePage.clickByText(createExport7.name);
    var hrefexist7 = await io.homePage.isVisible("//*[@rel='noreferrer noopener']");
    await await io.assert.expectToBeTrue(hrefexist7, "");

    await io.api.deleteExportViaAPI(createExport1._id);
    await io.api.deleteExportViaAPI(createExport2._id);
    await io.api.deleteExportViaAPI(createExport3._id);
    await io.api.deleteExportViaAPI(createExport4._id);
    await io.api.deleteExportViaAPI(createExport5._id);
    await io.api.deleteExportViaAPI(createExport6._id);
    await io.api.deleteExportViaAPI(createExport7._id);
  });
});
