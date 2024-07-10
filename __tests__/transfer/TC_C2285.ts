import { expect, test } from "@celigo/ui-core-automation";
import testData from "./C1582.json";

test.describe(`C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, () => {
  test(`@Env-All @Zephyr-IO-T6928 C2285  Verify : If the account sharing is disabled for the user to whom account transfer is being done then Account transfer should not be allowed and should get proper error message.`, async ({ io }) => {
    const res = await io.api.postCall(`v1/transfers/invite`, testData);
    await io.assert.expectNotToBeNull(res.errors[0].message, "message doesn't match")
  });
});
