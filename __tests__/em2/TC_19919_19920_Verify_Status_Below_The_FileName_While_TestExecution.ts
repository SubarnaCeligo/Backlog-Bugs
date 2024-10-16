
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_19919_19920_Verify_Status_Below_The_FileName_While_TestExecution.json";
import { allure } from "allure-playwright";

test.describe("TC_19919_19920_Verify_Status_Below_The_FileName_While_TestExecution", () => {
  test("@Env-All @Zephyr-IO-T6234 @Zephyr-IO-T6235 TC_19919_19920|Verify the status below the flow name is updated as soon as the first parent job is started executing|Verify the status remains in progress below the flowname until the flow is completed", async ({io,page}, testInfo) => {
    // *Create Page Generators
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await io.flowBuilder.navigateToTheFlow(
      flows.get(FTP.name)["flowId"]
    );
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    var waitQueue = await page.locator(
      "span > div > span >div > span"
    ).nth(0).textContent();
    await io.assert.expectToContainValue("Waiting in queue",waitQueue, "");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    var completeRun = await page.locator(
      "span > div > span >div > span"
    ).nth(0).textContent();
    await io.assert.expectToContainValue("Last run:",completeRun, "");
  });
});
