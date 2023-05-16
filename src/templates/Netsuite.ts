import type { Page } from "@playwright/test";

export class Netsuite {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  NETSUITE_JSON = {
    NETSUITE_EXPORT: {
      application: "adaptorType",
      NetSuite: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "netsuite.restlet.recordType": "recordType",
      "netsuite.restlet.searchId": "searchId",
      saveAndClose: "action"
    },
    NETSUITE_IMPORT: {
      application: "adaptorType",
      NetSuite: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "netsuite_da.recordType": "recordType",
      "netsuite_da.operation": "operation",
      "ignoreExisting": "ignoreExisting",
      saveAndClose: "action"
    }
  };
}
