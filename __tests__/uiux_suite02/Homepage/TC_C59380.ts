import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59380 To verify that the Celigo University is not available in QA,STAGING,QAPROD and IAQA.", () => {
    test("C59380 To verify that the Celigo University is not available in QA,STAGING,QAPROD and IAQA.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep('Hovering on Help to see sub options');
        await io.homePage.hover(selectors.basePagePO.HELP);
        const isCeligoUniversityVisible = await io.homePage.isVisible(':has-test("Celigo university")');
        await io.assert.expectToBeValue('false', isCeligoUniversityVisible.toString(), "Celigo university is displayed");
    });
  });