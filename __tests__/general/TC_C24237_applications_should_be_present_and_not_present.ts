import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C24237", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2178 @Env-All TC_C24237", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Templates");
    test.step("Clicked templates button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.CREATETEMPLATE);

    var notToBePresentApps = [
      "amazonaws",
      "microsoftoffice365",
      "nextag",
      "osn",
      "skuvault",
      "strata",
      "svb",
      "wiser",
      "other",
      "travis-org",
      "helpscout",
      "errorception",
      "aha",
      "mailparser-io",
      "travis",
      "sapariba",
      "yammer",
      "hybris",
      "concurall",
      "concurv4",
      "constantcontact",
    ];
    var toBePresentApps = ["Ariba", "banking", "dcl"];


    for(var i in notToBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      ).nth(0).fill(notToBePresentApps[i]);
      
      await io.homePage.clearTextValue(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      await io.homePage.keyboard("Enter");
    }
    var svg = await page.$$(
      selectors.basePagePO.BUTTONSINTEMPLATESPAGE
    )
    let svgCount = svg.length
    await io.assert.expectToBeValue(String(svgCount), "3", "");

    for(var j in toBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      ).nth(0).fill(toBePresentApps[j]);
      
      await io.homePage.clearTextValue(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      await io.homePage.keyboard("Enter");
    }
    await io.homePage.click(selectors.flowBuilderPagePO.RENAME);
    var svg1 = await page.$$(
      selectors.basePagePO.BUTTONSINTEMPLATESPAGE
    )
    let svgCount1 = svg1.length
    await io.assert.expectToBeValue(String(svgCount1), "6", "");

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);


  
    await io.homePage.goToMenu("Resources","Integration apps");
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);

    for(var p in notToBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      ).nth(0).fill(notToBePresentApps[p]);
      
      await io.homePage.clearTextValue(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      await io.homePage.keyboard("Enter");
    }
    var svg2 = await page.$$(
      selectors.basePagePO.BUTTONSINTEMPLATESPAGE
    );
let svgCount2 = svg2.length
    await io.assert.expectToBeValue(String(svgCount2), "6", "");

    for(var q in toBePresentApps) {
      await(await page.locator(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      ).nth(0).fill(toBePresentApps[q]);
      
      await io.homePage.clearTextValue(selectors.integrationPagePO.CREATEIA_APPLICATIONS + " input")
      await io.homePage.keyboard("Enter");
    }
    await io.homePage.click(selectors.flowBuilderPagePO.RENAME);
    var svg3 = await page.$$(
      selectors.basePagePO.BUTTONSINTEMPLATESPAGE
    )
    let svgCount3 = svg3.length
    await io.assert.expectToBeValue(String(svgCount3), "9", "");

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    var loc_marketPlace = await page.$$(
      selectors.basePagePO.CONNECTORS_LIST
    );
    var flag = [],
      count = 0,
      txt;
    for(var ele in toBePresentApps) {
      for(var l = 0; l < loc_marketPlace.length; l++) {
        txt = loc_marketPlace[l]
        if(await txt.toLowerCase().includes(toBePresentApps[ele].toLowerCase())
        ) {
          flag[count] = true;
          count++;
        }
      }
    }
    var marker = false;
    looping: for(var flagIndex = 0; flagIndex < flag.length; flagIndex++) {
      if(flag[flagIndex] === "false") {
        marker = true;
        break looping;
      }
    }
    await io.assert.expectToBeFalse(marker, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
