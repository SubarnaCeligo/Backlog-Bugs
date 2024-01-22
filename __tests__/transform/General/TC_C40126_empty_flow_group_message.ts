
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C40126", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C40126", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Don't use"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();
    var intId = await io.api.getIntegrationId("Don't use");


    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP
    );
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Don't use"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();

    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.OPENAI.CREATE_FLOWGROUP
    );
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Don't use1"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.click(
      selectors.homePagePO.CLONE_INTEGRATION
    );
    await io.homePage.isPageLoaded();


    expect(
      selectors.integrationPagePO.TABLEBODY
    ).toContain("Don't use");
    expect(
      selectors.integrationPagePO.TABLEBODY
    ).toContain("No flows have been added to this group.");
    expect(
      selectors.integrationPagePO.TABLEBODY
    ).toContain("Don't use1");
    expect(
      selectors.integrationPagePO.TABLEBODY
    ).toContain("No flows have been added to this group.");

    await io.api.deleteIntegration(intId);
    

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
