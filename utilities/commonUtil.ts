const Decrypt = require("atob");
const Encrypt = require("btoa");
const path = require("path");
const extract = require("extract-zip");
import * as html_tablify from "html-tablify";
import * as fs from "fs-extra";
//import { fileValidations as FLV } from "../utilities/fileValidations";
import { randomString } from "./stringUtil";
import * as _ from "underscore";

export function decrypt(data: string) {
  return Decrypt(data);
}
export function encrypt(data: string) {
  return Encrypt(data);
}
export function getVal(theObject, targetProp) {
  let result = [];
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      const arrayElem = theObject[i];
      if (arrayElem instanceof Object || arrayElem instanceof Array) {
        result = result.concat(getVal(arrayElem, targetProp));
      }
    }
  } else {
    for (const prop in theObject) {
      const objProp = theObject[prop];
      if (prop == targetProp) {
        return theObject[prop];
      }
      if (objProp instanceof Object || objProp instanceof Array) {
        result = result.concat(getVal(objProp, targetProp));
      }
    }
  }

  const uniqueArray = result.filter(function (item, pos) {
    return result.indexOf(item) == pos;
  });
  return uniqueArray.join("");
}

export function getInputMap(jsonData: any, testDataKey: string, key: any) {
  let inputVal, dataTest;
  const inputMap = new Map();
  if (JSON.stringify(jsonData).indexOf(testDataKey) > -1) {
    inputVal = getVal(jsonData, testDataKey);
    dataTest = key;
    console.log("Inside TestData : " + inputVal.toString());
    if (dataTest === "application") {
      inputVal = inputVal.slice(0, inputVal.length - 6);
    }
    inputMap.set(dataTest, inputVal);
  } else if (testDataKey === "action") {
    inputMap.set(key, testDataKey);
  }
  return inputMap;
}

export function findVal(obj, keyToFind) {
  try {
    if (obj[keyToFind] === false) return false;
    if (obj[keyToFind]) return obj[keyToFind];
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const value = findVal(obj[key], keyToFind);
        if (value !== -1) return value;
      }
    }
    return -1;
  } catch (error) {
    //console.log("Connot find value >>", error);
  }
}

export function replaceByValue(json, field, newvalue) {
  let tempJson = json;
  if (tempJson.hasOwnProperty(field)) {
    tempJson[field] = newvalue;
  }
  return tempJson;
}

export function addToObj(obj, key, value, index?: any) {
  // Create a temp object and index variable
  const temp = {};
  let i = 0;

  // Loop through the original object
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // If the indexes match, add the new item
      if (i === index && key && value) {
        temp[key] = value;
      }

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop];

      // Increase the count
      i++;
    }
  }

  // If no index, add to the end
  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;
}

export function dataTable(dataArr: any) {
  let options = {
    data: dataArr,
    table_class: "tablify"
  };
  var html_data = html_tablify.tablify(options);
  var html_data_table =
    "   <html>  " +
    "   <head>  " +
    "       <style>  " +
    "          .tablify th,.tablify td,.tablify p,.tablify input,.tablify h3 {  " +
    '               font:15px "Segoe UI";  ' +
    "           }  " +
    "           .tablify table,.tablify th,.tablify td {  " +
    "               border: ridge 1px #ddd;  " +
    "               border-collapse: collapse;  " +
    "               padding: 2px 3px;  " +
    "               text-align: center;  " +
    "           }  " +
    "           .tablify th {  " +
    "               font-weight:bold;  " +
    "               background-color: skyblue;  " +
    "           }  " +
    "           table {  " +
    "               width: 100%;  " +
    "           }  " +
    "       </style>  " +
    "  </head>  " +
    html_data +
    "   </html>  ";
  if (dataArr.length > 0) {
    html_data_table =
      " <p style='font-weight: bold;'>**** Expected and Actual JSON Validations*****</p>" +
      html_data_table;
  }
  html_data_table = html_data_table
    .toString()
    .split("<td>FAIL</td>")
    .join("<td style='background-color: red;'>FAIL</td>");
  return html_data_table;
}

export function inlineDiff(diffHtml) {
  let injectHtml =
    "   <html>  " +
    "   <head>  " +
    '   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/github.min.css" />  ' +
    "   <!-- CSS -->  " +
    '   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />  ' +
    "   <!-- Javascripts -->  " +
    '   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html-ui.min.js"></script>  ' +
    "   <script>  " +
    '     document.addEventListener("DOMContentLoaded", () => {  ' +
    '       const targetElement = document.getElementById("diff");  ' +
    "       const diff2htmlUi = new Diff2HtmlUI(targetElement);  " +
    "        diff2htmlUi.draw();  " +
    "        diff2htmlUi.highlightCode();  " +
    "        diff2htmlUi.fileListToggle(true);  " +
    "        diff2htmlUi.synchronisedScroll(true);  " +
    "     });  " +
    "   </script>  " +
    "   <style>  " +
    "     div.scrollable {  " +
    "       width: auto;  " +
    "       height: 600px;  " +
    "       overflow-x: hidden;  " +
    "       overflow-y: auto;  " +
    "   }  " +
    "   .d2h-code-side-linenumber {  " +
    "          position: relative;  " +
    "    }  " +
    "   </style>  " +
    '   <meta charset="UTF-8">  ' +
    "   </head>  " +
    "   <body>  " +
    '   <div id="diff" class="scrollable">  ' +
    diffHtml +
    "   </div>" +
    "   </body>  " +
    "  </html>  ";

  return injectHtml;
}

export function addJsonDiff(diffType: any, diff: any) {
  for (let i = 0; i < diff.length; i++) {
    var html =
      '<p style="font-weight: bold;">Detailed Differences Between Expected and Actual ' +
      diffType +
      " JSON objects " +
      "</p>" +
      diff[i];
  }
  return html;
}

export function getJsonNodeVal(jsonfilepath: any, expectedjsonpath: any) {
  const json = jsonfilepath[expectedjsonpath]["qa__dataVerification"];
  //console.log("Returning the JSON" + JSON.stringify(json));
  return json;
}

/**
 *
 * @param  {String} startPath    Path relative to this file or other file which requires this files
 * @param  {String} filter       Extension name, e.g: '.xml'
 * @return {Array}               Result files with path string in an array
 */
export function findFilesInDir(startPath: string, filter: string): Array<any> {
  var results = [];

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter)); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      // console.log("Files found with given filter: ", filename);
      results.push(filename);
    }
  }
  return results;
}

export function cleanDir(startPath) {
  let pathFile = path.join(__dirname, "../../") + startPath;
  if (!fs.existsSync(pathFile)) {
    console.log("no dir ", pathFile);
    return;
  }
  var files = fs.readdirSync(pathFile);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(pathFile, files[i]);
    //console.log(filename);
    if (files[i] !== ".gitkeep") {
      fs.unlinkSync(filename);
    }
  }
}

export function deepJsonCleanup(obj, cleanupArray) {
  for (let key in obj) {
    // checking if it's nested
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      if (cleanupArray.includes(key)) {
        delete obj[key];
      } else {
        deepJsonCleanup(obj[key], cleanupArray);
      }
    } else {
      // printing the flat attributes
      // console.log(key + " -> " + obj[key]);
      if (cleanupArray.includes(key)) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export function sort(array, property, uniquefield) {
  array.forEach(function (v, i) {
    //console.log(v);
    if (property !== null && uniquefield !== null) {
      if (v.hasOwnProperty(property)) {
        let value = v[property];
        //console.log(value);
        if (value !== null) {
          value.sort((a, b) => {
            let name1 = a[uniquefield].toLowerCase(),
              name2 = b[uniquefield].toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            if (name1 > name2) {
              return 1;
            }
            return 0;
          });
        }
      }
    }
  });
  return array;
}

export function updateJSON(fileName, key, newvalue) {
  try {
    let filePath =
      path.join(__dirname, "../../") + "assets/FTP_uploads/" + fileName + ".json";
    // read JSON object from file
    let script = fs.readFileSync(filePath, "utf-8");
    script = JSON.parse(script);
    //Replace Key Values
    let newData = replaceByValue(script, key, newvalue);
    newData = JSON.stringify(newData);
    fs.writeFileSync(filePath, newData);
  } catch (e) {
    console.log("Some Error Updaating JSON File", e);
  }
}

// export function jsonComparision(expected, actual, type?: any) {
//   //console.log("Expected file", JSON.stringify(expected));
//   //console.log("Actual file", JSON.stringify(actual));
//   resultArr = [];
//   let header =
//     " | TAG NAME |" +
//     " EXPECTED TAG VALUE | " +
//     " ACTUAL TAG VALUE | " +
//     " STATUS |";
//   resultArr.push(header);

//   if (type == "XML") {
//     expected = JSON.parse(
//       JSON.stringify(expected).replace(/\[/g, "").replace(/]/g, "")
//     );
//     actual = JSON.parse(
//       JSON.stringify(actual).replace(/\[/g, "").replace(/]/g, "")
//     );
//   }
//   resultArr = validateJSON(expected, actual);
//   return resultArr;
// }

// /**
//  *
//  * JSON to JSON Comparision
//  * @memberof commonUtils
//  */
// export function validateJSON(expected: any, actual: any) {
//   let results;

//   //console.log("Expected JSON is" + JSON.stringify(expected));
//   //console.log("Actual JSON is" + JSON.stringify(actual));

//   //Check types at start for Expected and Actual
//   if (typeof expected !== typeof actual) return false;
//   if (Array.isArray(expected) !== Array.isArray(actual)) return false;

//   //Check in case no children
//   if (expected && Object.keys(expected).length === 0)
//     return Object.keys(actual).length === 0;

//   //Check in case if expected is nullish
//   if (expected == null) return expected === actual;

//   //Check in case Expected is an Array
//   if (Array.isArray(expected)) {
//     for (let i = 0; i < expected.length; i++) {
//       validateJSON(expected[i], actual[i]);
//     }
//   } else {
//     //general object case
//     //Loop through properties in Expected Object
//     for (var p in expected) {
//       //Check property exists on both Expected and Actual objects
//       if (expected.hasOwnProperty(p) !== actual.hasOwnProperty(p)) return false;
//       switch (typeof expected[p]) {
//         //Deep compare Expected and Actual objects
//         case "object":
//           validateJSON(expected[p], actual[p]);
//           break;
//         //Compare values
//         default:
//           //console.log(resultArr);
//           //console.log(p + " -> " + expected[p] + " -> " + actual[p]);
//           const status: string = expected[p] == actual[p] ? "PASS" : "FAIL";
//           results =
//             " | " +
//             p +
//             " | " +
//             expected[p] +
//             " | " +
//             actual[p] +
//             " | " +
//             status +
//             " |";
//           resultArr.push(results);
//       }
//     }
//   }

//   return resultArr;
// }
export function addToObjAfterSpecificKey(obj, key, value, keyToFind?: any) {
  //Find Index of specific key and add key,value after key
  var index = Object.keys(obj).indexOf(keyToFind);
  //console.log("index",index);
  var jsonObj = addToObj(obj, key, value, index + 1);
  return jsonObj;
}
export function checkFileExists(allure, flowId, src, dest) {
  const startpath = "../" + flowId + ".zip";
  let pathFile = path.join(__dirname, "../../") + startpath;
  try {
    if (fs.existsSync(pathFile)) {
      console.log("File Is Downloaded Successfully");
      fs.move(src, dest);
      console.log("success!");
      return true;
    } else {
      console.log("File Is Not Downloaded");
      return false;
    }
  } catch (e) {
    console.log("error");
  }
}
export function checkFileForDownloads(allure, src, dest) {
  var path = require("path");
  var file = "/../../Downloads";
  var fileName = fs.rename(file[0], "TC_033.csv");
  const startpath = "../" + fileName + ".csv";
  let pathFile = path.join(__dirname, "../../") + startpath;
  try {
    if (fs.existsSync(pathFile)) {
      console.log("Found");
      fs.move(src, dest);

      console.log("success!");
      return true;
    }
  } catch (err) {
    return false;
  }
}
//***
// zipFile = file/folder name of zip, fileName = file to get
// zipPath = folder in which zipFile downloaded
// destinationFolder = folder to where extracted file stored
//***
export async function unzipFile(
  data: { zipFile: string; fileName: string },
  zipPath = "downloads/Template_Downloads/",
  destinationFolder = "downloads/Template_Downloads/"
) {
  try {
    var { zipFile, fileName } = data;
    var extension = "." + fileName.split(".").pop();
    var source = path.join(__dirname, "../../") + zipPath + zipFile;
    var target = path.join(__dirname, "../../") + destinationFolder;
    console.log(source, target);
    await extract(source, { dir: target });
    console.log("Extraction complete");
  } catch (err) {
    console.log("Error happened while extraction", err);
  }
  const files = findFilesInDir("./" + destinationFolder, extension);
  let exists = false;
  for (let x in files) {
    let file = files[x];
    if (file.includes(fileName)) {
      exists = true;
      break;
    }
  }
  if (!exists)
    return {
      content: "File Doesn't Exist in Given Zip File"
    };
  let actualFileSize;
  let actualFile = target + "/" + fileName;
  if (fs.existsSync(actualFile)) {
    actualFileSize = fs.statSync(actualFile).size;
  } else {
    return {
      content: "File Not Found"
    };
  }
  if (actualFileSize > 0) {
    const actual = fs.readFileSync(actualFile, "utf8");
    let content = JSON.parse(actual);
    return {
      content: content
    };
  }
}

// export async function checkFieldInFile(key, data) {
//   const flv = new FLV();
//   let { fileType, fileName, columnDelimiter, folderName } = data;
//   fileName = fileName.split(".").join("_" + randomString(10) + ".");
//   const files = findFilesInDir("./" + folderName, fileType);
//   console.log(files);
//   if (!files) return false;

//   let fl = await getMostRecentFileName(files);
//   console.log(fl);
//   let file_name = fl.split("/")[2];
//   let oldPath = path.join(__dirname, "../../") + folderName + file_name;
//   let newPath = path.join(__dirname, "../../") + folderName + fileName;
//   console.log(oldPath, newPath);
//   await fs.renameSync(oldPath, newPath);
//   const res = await flv.validateCSVKeys(folderName + fileName, columnDelimiter);
//   if (res?.headings?.includes(key)) return true;
//   return false;
// }

// Return only base file name without dir
export async function getMostRecentFileName(selectedFiles): Promise<string> {
  return _.max(selectedFiles, function (f) {
    // ctime = creation time is used
    return fs.lstatSync(f).ctime;
  });
}
export function sortArray(arr, key) {
  var c = arr.sort(function (a, b) {
    if (b.hasOwnProperty(key)) {
      return -1;
    }
  });
  return c;
}
// var arr = [
//   { e: 1, f: 2 },
//   { liked: true, a: 1, b: 2 },
//   { g: 1, h: 2 },
//   { liked: true, c: 1, d: 2 },
// ];
// var a = sortArray(arr, "liked");
// console.log(a);

export function isNumber(el) {
  if (typeof el === "number") {
    return true;
  }
  if (typeof el === "string") {
    return !/\D/.test(el);
  }
  return false;
}
//Checks if given array is sorted in order provided
export async function isSorted(
  isIncreasing: boolean,
  arr,
  dataType: "string" | "number" | "object" | "dateAndTime"
) {
  switch (dataType) {
    case "string":
    case "number":
      if (isIncreasing) {
        for (let i = 0; i < arr.length - 1; i++)
          if (arr[i] > arr[i + 1]) return false;
      } else {
        for (let i = 0; i < arr.length - 1; i++)
          if (arr[i + 1] > arr[i]) return false;
      }
      break;
    case "dateAndTime":
      if (isIncreasing) {
        for (let i = 0; i < arr.length - 1; i++)
          if (new Date(arr[i]).getTime() - new Date(arr[i + 1]).getTime() > 0)
            return false;
      } else {
        for (let i = 0; i < arr.length - 1; i++)
          if (new Date(arr[i + 1]).getTime() - new Date(arr[i]).getTime() > 0)
            return false;
      }
      break;
    case "object":
    default:
      break;
  }
  return true;
}

//Sorts array of Ojbect with key as date and/or time And string with date and/or time.
export function sortByDateAndTime(
  recentFirst: boolean,
  arr: string[] | object[],
  dateKey: string
) {
  const sorter = (dateKey, recentFirst) => (a, b) => {
    const s1 = dateKey && typeof a === "object" ? a[dateKey] || "" : a;
    const s2 = dateKey && typeof a === "object" ? b[dateKey] || "" : b;
    let num = new Date(s1).getTime() - new Date(s2).getTime();
    return recentFirst ? -num : num;
  };
  arr.sort(sorter(dateKey, recentFirst));
}

//comparator function to pass to sort method
export const sortComparator = (sortProperty, isIncreasing) => (a, b) => {
  const firstEl =
    sortProperty && typeof a === "object" ? a[sortProperty] || "" : a;
  const secondEl =
    sortProperty && typeof a === "object" ? b[sortProperty] || "" : b;

  if (isNumber(firstEl) && isNumber(secondEl)) {
    const compareValue = +firstEl - +secondEl;
    return isIncreasing ? compareValue : -compareValue;
  }
  //numbers comes first when isIncreasing
  if (isNumber(firstEl)) {
    return isIncreasing ? -1 : 1;
  }
  if (isNumber(secondEl)) {
    return isIncreasing ? 1 : -1;
  }

  // when both are strings
  if (typeof firstEl !== "string" || typeof secondEl !== "string") {
    return 0;
  }
  return isIncreasing
    ? firstEl.trim().localeCompare(secondEl.trim())
    : -firstEl.trim().localeCompare(secondEl.trim());
};
export function bulkUpdateJSONValues(folder, key, newvalue) {
  try {
    let filePath =
      path.join(__dirname, "../../") + "config/testData/FLOWS/CREATE/" + folder;
    var files = fs.readdirSync(filePath);
    for (var i = 0; i < files.length; i++) {
      var filename = path.join(filePath, files[i]);
      let file = filePath + filename;
      // read JSON object from file
      let script = fs.readFileSync(file, "utf-8");
      script = JSON.parse(script);
      //Replace Key Values
      let newData = replaceByValue(script, key, newvalue);
      newData = JSON.stringify(newData);
      fs.writeFileSync(filePath, newData);
    }
  } catch (e) {
    console.log("Some Error Updaating JSON File", e);
  }
}
