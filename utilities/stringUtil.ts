const Decrypt = require("atob");
export function decrypt(ms: string) {
  return Decrypt(ms);
}

export function randomString(len?: number, charSet?: string): string {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  len = len || 5;
  let randomString = "";
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

export function randomNumber(len?: number) {
  len = len || 10;
  let factor = 10;
  while (--len > 1) {
    factor *= 10;
  }
  const randomNumber = Math.floor((Math.random() + 1) * factor);
  return randomNumber;
}
/**
 * @returns current day - 1 as per the salesforce timezone
 */
export function todaysDate() {
  const d = new Date();
  function padZero(obj) {
    obj = obj + "";
    if (obj.length == 1) {
      obj = "0" + obj;
    }
    return obj;
  }
  let output = "";
  output += d.getFullYear() + "/";
  output += padZero(d.getMonth() + 1) + "/";
  output += padZero(d.getDate() - 1); //as per salesforce timezone
  return output;
}

/**
 * @returns current day + user specific date input
 * @param numberOfDaysToAdd
 */
export function customDate(numberOfDaysToAdd: number) {
  const d = new Date();
  d.setDate(d.getDate() + numberOfDaysToAdd);
  const output = d.toISOString().substring(0, 19) + "Z";
  return output;
}

/**
 * @returns offset date
 * @param Offset
 */
export function offsetDate(Offset: any) {
  const date = new Date();
  function localDay(time) {
    // var minutesOffset = time.getTimezoneOffset();
    // var millisecondsOffset = minutesOffset * 60 * 1000;
    const local = new Date(time); //time-millisecondsOffset
    return local.toISOString().substr(0, 10);
  }
  const utcDate = new Date(date.toUTCString());
  utcDate.setHours(utcDate.getHours() + Offset);
  const usDate = new Date(utcDate);
  return localDay(usDate);
}

/**
 * @returns fomatted date
 * @param input
 */
export function formatDate(input) {
  let datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1],
    day = datePart[2];

  if (month < 10) {
    month = month.replace(/^0+/, "");
  }

  if (day < 10) {
    day = day.replace(/^0+/, "");
  }

  return month + "/" + day + "/" + year;
}
export function timeDatavalidation(time) {
  var currTime = new Date().toLocaleString([], { hour12: true });
  var timeDiff =
    (Date.parse(currTime) - Date.parse(time.toUpperCase())) / (1000 * 60);
  return timeDiff;
}
export function standardizePhoneNumber(phoneNum: string): string {
  const temp =
    Number(
      phoneNum
        .replace(/\s/g, "")
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
    ) % 10000000000;
  return temp.toString();
}

export function standardizeFax(fax: string): string {
  let temp: string;
  if (fax.startsWith("+")) {
    temp = fax.replace("-", " ").replace("(", "").replace(")", "");
  } else {
    temp = "+" + fax.replace("-", " ").replace("(", "").replace(")", "");
  }
  return temp.toString();
}

export function formatFax(phoneNumberString) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, match[2], " ", match[3], " ", match[4]].join("");
  }
  return null;
}

export function addZeroes(num) {
  let numberAsString = num.toString();

  if (numberAsString.indexOf(".") === -1) {
    num = num.toFixed(2);
    numberAsString = num.toString();
  } else if (numberAsString.split(".")[1].length < 3) {
    num = num.toFixed(2);
    numberAsString = num.toString();
  }

  return numberAsString;
}

export function removeZeroes(num) {
  const numberAsString = Math.round(num).toString();
  return numberAsString;
}

export function splitDate(convertDate: any) {
  const dateString = convertDate.toString();
  return dateString.split("T")[0];
}

//convert dd/mm/yyyy to yyyy-mm-dd
export function convertDate(convertDate: any) {
  const date = convertDate.toString();
  return date.split("/").reverse().join("-");
}
