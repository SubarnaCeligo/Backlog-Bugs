
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C29030_last_open_error.json";

test.describe("TC_C29030", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T6411 TC_C29030", async ({io, page}) => {
    // *Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
await test.step(
      "Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"], async () => {
          
        }
    );
    var id = await io.api.getFlowId(TC.name);

    await io.api.checkJobStatusFromAPI( TC.name, id);
    await io.homePage.goToMenu("Dashboard");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    await io.homePage.delay(15000);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.dashboardPagePO.REFRESH);
    await io.homePage.loadingTime();

    var loc = await page.locator(
      "tbody>tr"
    ).nth(0);
    var flow = await page.getByText("TC_C29030").isVisible();
    await io.assert.expectToBeTrue(flow, "");

    var loc1 = await loc.locator("td");
    var txt = await loc1.nth(2).textContent();
    expect(txt).toMatch(new RegExp(/^(.)*(am|pm)/i));

    var col = await page.locator(
      "thead>tr"
    );
    var col1 = await col.locator("th");
    var txt1 = await col1.nth(2).textContent();

    await io.assert.expectToContainValue("Last open error",txt1, "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
