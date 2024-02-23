import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117763", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117763", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.click(
          selectors.flowBuilderPagePO.ADD_SOURCE
        );
      
        await io.flowBuilder.clickByText("MariaDB");
        await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.clickByText("MariaDBCred");
        await io.flowBuilder.clickByText("Use existing export");
        await io.flowBuilder.loadingTime();
      
        await io.flowBuilder.selectDropDownWithSplChar("MariaDB");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
     
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);

   
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "Pre save page  script");
        await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
        await io.flowBuilder.selectTextfromDropDown(page,"preSavePage");
        let divTextContent = (await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT)).toString();
        let res=false;
        if(divTextContent.includes("'_parentJobId': the _parentJobId of the current running flow."))
       {
        res = true;
        await io.assert.expectToBeTrue(res,"text is not displayed");
       }
      
        await io.flowBuilder.clickByText("Save & close");
   
    

    });
});

