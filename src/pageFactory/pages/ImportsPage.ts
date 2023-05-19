import { IO } from "@controller/IO";
import BasePage from "./BasePage";
import { IImportsPage } from "@interface/IImportsPage";

export class ImportsPage extends BasePage implements IImportsPage {
  public async fillImportForm(jsonData: any) { }

  public async editImportForm(jsonData: any, importId: string) { }
}