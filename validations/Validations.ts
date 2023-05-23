import {
  sort,
  dataTable,
} from "../utilities/commonUtil";

export class Validations {
  dataTableJsonarr: any;
  validationMap: Map<any, any>;
  dataValidation: boolean;

  constructor() {
    this.validationMap = new Map();
    this.dataTableJsonarr = [];
    this.dataValidation = true;
  }
  /**
   *
   *
   * @param {*} key
   * @param {*} expectedField
   * @param {*} actualField
   * @returns
   * @memberof _ValidateAndUpdateReport
   */
  public async simpleCompareValues(key, expectedField, actualField) {
    const status: string = expectedField == actualField ? "PASS" : "FAIL";
    let obj = {
      Field: key,
      "Expected Value": expectedField,
      "Actual Value": actualField,
      Result: status
    };
    this.dataTableJsonarr.push(obj);
  }

  /**
   *
   * JSON to JSON Comparision
   * @param {*} expected
   * @param {*} actual
   * @memberof Validations
   */
  public async validateJSONData(
    expected: any,
    actual: any,
    property: any = null,
    uniquefield: any = null,
    isExport?: any
  ) {
    // console.log("Expected JSON is" + JSON.stringify(expected));
    // console.log("Actual JSON is" + JSON.stringify(actual));

    //Check types at start for Expected and Actual
    if (typeof expected !== typeof actual) return false;
    if (Array.isArray(expected) !== Array.isArray(actual)) return false;

    //Check in case no children
    if (expected && Object.keys(expected).length === 0)
      return Object.keys(actual).length === 0;

    //Check in case if expected is nullish
    if (expected == null) return expected === actual;

    //Check in case Expected is an Array
    if (Array.isArray(expected)) {
      expected = sort(expected, property, uniquefield);
      //console.log(JSON.stringify(expected));
      actual = sort(actual, property, uniquefield);
      //console.log(JSON.stringify(actual));
      for (let i = 0; i < expected.length; i++) {
        await this.validateJSONData(expected[i], actual[i]);
      }
    } else {
      //general object case
      if (typeof expected !== "object") {
        await this.simpleCompareValues(p, expected, actual);
      } else {
        //Loop through properties in Expected Object
        for (var p in expected) {
          //Check property exists on both Expected and Actual objects
          if (expected.hasOwnProperty(p) !== actual.hasOwnProperty(p))
            return false;
          switch (typeof expected[p]) {
            //Deep compare Expected and Actual objects
            case "object":
              // if (Array.isArray(expected[p])) {
              //   this.simpleCompareValues(p, expected[p][0], actual[p][0]);
              //   break;
              // }
              await this.validateJSONData(expected[p], actual[p]);
              break;
            //Compare values
            default:
              //(p, expected[p], actual[p]);
              await this.simpleCompareValues(p, expected[p], actual[p]);
          }
        }
      }
    }
    var result = JSON.stringify(this.dataTableJsonarr);
    if (result.indexOf("FAIL") !== -1 || this.dataTableJsonarr.length == 0) {
      var execution_status = "failed";
    } else {
      execution_status = "passed";
    }
    if (isExport !== undefined) {
      var header = {
        Field: "Field",
        "Expected Value": "Expected Value",
        "Actual Value": "Actual Value",
        Result: "Result"
      };
      this.dataTableJsonarr.push(header);
    }
    //pushing the entire table result to objFinal
    let objFinal = {
      overallStatus: execution_status,
      dataTable: this.dataTableJsonarr
    };
    return objFinal;
  }
  public async jsonComparision(expected, actual, type?: any) {
    // console.log("Expected file", JSON.stringify(expected));
    // console.log("Actual file", JSON.stringify(actual));
    // let resultArr = [];
    let resultArr;
    // let header =
    //   " | TAG NAME |" +
    //   " EXPECTED TAG VALUE | " +
    //   " ACTUAL TAG VALUE | " +
    //   " STATUS |";
    // resultArr.push(header);
    if (type == "XML") {
      let expectedBool = Object.values(expected).some(expectedval =>
        Array.isArray(expectedval)
      );
      let actualBool = Object.values(actual).some(actualval =>
        Array.isArray(actualval)
      );
      if (expectedBool && actualBool) {
        for (const key in expected) {
          if (key === "root_817" || key === "root_813") {
            const expelement = expected[key];
            const actelement = actual[key];
            expected[key] = JSON.parse("[" + JSON.stringify(expelement) + "]");
            actual[key] = JSON.parse("[" + JSON.stringify(actelement) + "]");
          } else if (Object.prototype.hasOwnProperty.call(expected, key)) {
            const expelement = expected[key];
            const actelement = actual[key];
            //console.log("...", expelement);
            expected[key] = JSON.parse(
              "[" +
              JSON.stringify(expelement).replace(/\[/g, "").replace(/]/g, "") +
              "]"
            );
            actual[key] = JSON.parse(
              "[" +
              JSON.stringify(actelement).replace(/\[/g, "").replace(/]/g, "") +
              "]"
            );
          }
        }
      } else {
        expected = JSON.stringify(expected).replace(/\[/g, "").replace(/]/g, "");
        actual = JSON.stringify(actual).replace(/\[/g, "").replace(/]/g, "");
        expected = JSON.parse(expected);
        actual = JSON.parse(actual);
      }
    }
    resultArr = this.validateJSONData(expected, actual);
    return resultArr;
  }
}
