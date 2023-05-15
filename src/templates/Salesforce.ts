import type { Page } from "@playwright/test";

export class Salesforce {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  SALESFORCE_JSON = {
    SALESFORCE_EXPORT: {
      application: "adaptorType",
      Salesforce: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "salesforce.soql": "query",
      saveAndClose: "action"
    },
    SALESFORCE_IMPORT: {
      application: "adaptorType",
      Salesforce: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "salesforce.api": "api",
      "salesforce.sObjectType": "sObjectType",
      "salesforce.operation": "operation",
      saveAndClose: "action"
    }
  };
}
