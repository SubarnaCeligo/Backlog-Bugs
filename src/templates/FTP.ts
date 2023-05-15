import type { Page } from "@playwright/test";

export class FTP {
  private page: Page;

  public constructor(page: Page) {
    this.page = page;
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
