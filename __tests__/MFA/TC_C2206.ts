import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./TC_C2206.json";



test.describe(`C2206 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, () => {
  test(`@Env-All C2206 @Zephyr-IO-T6925 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, async ({
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
     await io.homePage.loadingTime()
     await io.homePage.hover(selectors.basePagePO.NOTIFICATION_ARIA_LABEL)
     const text = await io.homePage.isVisible('text="No notifications"')
     await io.assert.expectToBeTrue(text, "Notification is found")


  });
});


