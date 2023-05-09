import { WebActions } from "@lib/WebActions";
import type { Page } from "@playwright/test";

let webActions: WebActions;
export class FTP {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
    webActions = new WebActions(this.page);
  }

  FTP_JSON = {
    FTP_EXPORT: {
      application: "adaptorType",
      FTP: "action",
      connection: "_connectionId",
      save: "action",
      name: "name",
      "file.type": "type",
      "ftp.directoryPath": "directoryPath",
      "ftp.fileNameStartsWith": "fileNameStartsWith",
      Advanced: "action",
      "file.encoding": "encoding",
      "file.skipDelete": "skipDelete",
      saveAndClose: "action"
    }
  };
}
