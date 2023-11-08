import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C50858 from '@testData/EM2.0/C50858.json';
import testData from "./TC_C2206.json";
import C50859 from '@testData/Flows/C50859.json';



test.describe(`C2206 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, () => {
  test(`C2206 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, async ({
    page,
    io
  }) => {
    
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData
    );
    await io.api.putCall(
        `v1/transfers/${res._id}/cancel`,
        res._id
      );
     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
     await io.homePage.hover('[aria-label="notifications"]')
     const text = await io.homePage.isVisible('text="No notifications"')
     await io.assert.expectToBeTrue(text, "Notification is found")
 

  });
});

 
