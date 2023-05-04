export async function determineControlType(locator) {
    var tempWebControl, typeOfControl, type, input, element;
    console.log(locator);
    tempWebControl = await this.page.locator(locator);
    try {
      type = await tempWebControl.getAttribute("type");
      //console.log(type);
      if (type === "button") {
        typeOfControl = "Button";
        return { typeOfControl, tempWebControl };
      } else if (type === "text") {
        typeOfControl = "TextField";
        return { typeOfControl, tempWebControl };
      }
    } catch (e) {
      //console.log("Error :" + e);
    }

    try {
      var role = await tempWebControl.getAttribute("role");
      //console.log(type,role);
      if (type === "button" || role === "button" || role == "menuitem") {
        typeOfControl = "Button";
        return { typeOfControl, tempWebControl };
      }
    } catch (e) {
      //console.log("Error :" + e);
    }

    try {
      input = await tempWebControl.$("input");
      var hidden = await input.getAttribute("aria-hidden");
      if (hidden == "true") {
        element = await this.page.locator(locator + " .MuiSelect-selectMenu");
        typeOfControl = "DropDown";
        tempWebControl = element;
        return { typeOfControl, tempWebControl };
      }
      type = await input.getAttribute("type");
      //console.log("Type", type);
      switch (type) {
        case "text":
          typeOfControl = "TextField";
          return { typeOfControl, tempWebControl };
        case "number":
          typeOfControl = "TextField";
          return { typeOfControl, tempWebControl };
        case "checkbox":
          typeOfControl = "CheckBox";
          return { typeOfControl, tempWebControl };
        case "password":
          typeOfControl = "TextField";
          return { typeOfControl, tempWebControl };
        default:
        //console.log("Type not avaliable :" + type);
      }
    } catch (e) {
      //console.log("Error :" + e);
    }

    try {
      var textarea = await tempWebControl.$("textarea");
      if (await textarea.isExisting()) {
        typeOfControl = "TextArea";
        return { typeOfControl, tempWebControl };
      }
    } catch (e) {
      //console.log("Error :" + e);
    }

    // try {
    //   element = await $(locator + " .MuiSelect-selectMenu");
    //   type = await element.getAttribute("aria-haspopup");
    //   //console.log(type);
    //   tempWebControl = element;
    //   if (type === "listbox") {
    //     typeOfControl = "DropDown";
    //     return { typeOfControl, tempWebControl };
    //   }
    // } catch (e) {
    //   //console.log("Error :" + e);
    // }

    try {
      input = await tempWebControl.$("input");
      type = await input.getAttribute("type");
      if (type === "radio") {
        typeOfControl = "RadioButton";
        return { typeOfControl, tempWebControl };
      }
    } catch (e) {
      //console.log("Error :" + e);
    }
  }