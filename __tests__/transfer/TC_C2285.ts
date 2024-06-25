import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./C1582.json";

test.describe(`C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, () => {
  test(`@Env-All @Zephyr-IO-T6928 C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, async ({ io }) => {
    const res = await io.api.postCall(`v1/transfers/invite`, testData);
    await io.assert.expectToBeValue(res.errors[0].message, 'We were not able to find any user with the provided email address.  Please ask the user to first create an undefined account.', "message doesn't match")
  });
});
