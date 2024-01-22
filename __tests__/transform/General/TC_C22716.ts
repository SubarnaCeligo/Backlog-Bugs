
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22716", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });

  test("TC_C22716", async ({io,page}, testInfo) => {
    await io.homePage.click(
      selectors.homePagePO.CLONE_INTEGRATION
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    const expanded_flowsTab = await io.homePage.isVisible(
      "[aria-expanded='true'][data-test='Flows']"
    );
    expect(expanded_flowsTab).toBeTruthy();

    const nonExpanded_integrationsTab = await io.homePage.isVisible(
      "[aria-expanded='false'][data-test='Integrations']"
    );
    expect(nonExpanded_integrationsTab).toBeTruthy();

    const nonExpanded_ExportsTab = await io.homePage.isVisible(
      "[aria-expanded='false'][data-test='Exports']"
    );
    expect(nonExpanded_ExportsTab).toBeTruthy();

    const nonExpanded_ImportsTab = await io.homePage.isVisible(
      "[aria-expanded='false'][data-test='Imports']"
    );
    expect(nonExpanded_ImportsTab).toBeTruthy();

    const nonExpanded_ConnectionsTab = await io.homePage.isVisible(
      "[aria-expanded='false'][data-test='Connections']"
    );
    expect(nonExpanded_ConnectionsTab).toBeTruthy();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
