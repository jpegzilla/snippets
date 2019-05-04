// javascript equivalent of sprintf

String.prototype.sprintf = function(...args) {
  const d = /%d/;
  const s = /%s/;
  const c = /%c/;
  const b = /%b/;
  const f = /%(?:\d+f)/;
  const rs = /%(?:\d+s)/;
  const nd = /%(?:\d+d)/;
  const rc = /%(?:\d+c)/;
  const rb = /%(?:\d+b)/;
  let string = this.valueOf();
  if (
    !f.test(string) &&
    !b.test(string) &&
    !rs.test(string) &&
    !c.test(string) &&
    !d.test(string) &&
    !s.test(string) &&
    !nd.test(string) &&
    !rc.test(string) &&
    !rb.test(string) &&
    string
  ) {
    console.log(string);
    throw new Error(`no codes specified, ${string}`);
  }
  if (!string) throw new Error("no string passed.");
  if (!args) throw new Error("no arguments passed.");
  let ogString = string;
  let strAsArr = string.split(/(%\w*)\b/gim);
  let countCodes = string.match(
    /%(?:\d+c)|%(?:\d+d)|%(?:\d+s)|%(?:\d+f)\b|%d|%s|%c|%b/gim
  );
  let arg = [];

  for (let i = 0; i < args.length; i++) arg.push(args[i]);
  if (countCodes && arg) {
    if (countCodes.length > arg.length)
      throw new Error("more codes than arguments.");
    if (countCodes.length < arg.length)
      throw new Error("more arguments than codes.");
  }

  for (let i = 0; i < arg.length; i++) {
    for (let j = 0; j < strAsArr.length; j++) {
      if (typeof arg[i] == "string" && s.test(strAsArr[j])) {
        strAsArr[j] = arg[i];
        break;
      } else if (d.test(strAsArr[j]) && typeof arg[i] == "number") {
        strAsArr[j] = arg[i];
        break;
      } else if (rc.test(strAsArr[j]) && typeof arg[i] == "string") {
        let n = strAsArr[j].split(/(\d*)/)[1];
        strAsArr[j] = arg[i].charAt(0).repeat(n);
        break;
      } else if (rs.test(strAsArr[j]) && typeof arg[i] == "string") {
        let n = strAsArr[j].split(/(\d*)/)[1];
        strAsArr[j] = arg[i].repeat(n);
        break;
      } else if (c.test(strAsArr[j]) && typeof arg[i] == "string") {
        strAsArr[j] = arg[i].charAt(0).toUpperCase();
        break;
      } else if (b.test(strAsArr[j])) {
        strAsArr[j] = arg[i] == true ? "true" : "false";
        break;
      } else if (f.test(strAsArr[j]) && typeof arg[i] == "number") {
        let n = strAsArr[j].split(/(\d*)/)[1];
        strAsArr[j] = arg[i].toFixed(n);
        break;
      } else if (nd.test(strAsArr[j]) && typeof arg[i] == "number") {
        let n = strAsArr[j].split(/(\d*)/)[1];
        strAsArr[j] = arg[i].toString().repeat(n);
        break;
      } else if (rb.test(strAsArr[j])) {
        let n = strAsArr[j].split(/(\d*)/)[1];
        strAsArr[j] = arg[i] == true ? "true".repeat(n) : "false".repeat(n);
        break;
      } else if (
        arg &&
        arg.length == 1 &&
        d.test(strAsArr[j]) &&
        typeof arg[i] !== "number"
      ) {
        throw new Error("%d passed but argument was not number");
      }
    }
  }
  countCodes = strAsArr
    .join("")
    .match(/%(?:\d+c)|%(?:\d+d)|%(?:\d+s)|%(?:\d+f)\b|%d|%s|%c|%b/gim);
  if (countCodes && arg) {
    if (countCodes.length > arg.length || countCodes.length < arg.length)
      throw new Error("possible boolean consumption.");
  }

  if (ogString == strAsArr.join("")) throw new Error("no codes to process.");

  return strAsArr.join("");
};

const strings = {
  shortest: function(array) {
    let c = array;
    c.sort((a, b) => a.length - b.length);
    m = c[0];
    return m;
  },
  longest: function(array) {
    let c = array;
    c.sort((a, b) => b.length - a.length);
    m = c[0];
    return m;
  }
};

const physics = {
  maccel: function(element) {
    if (!element) throw new Error("no element defined.");
    else {
    }
  },

  mspeed: function(element) {
    if (!element) throw new Error("no element defined.");
    else {
    }
  },

  scrollspeed: function(element) {
    if (!element) throw new Error("no element defined.");
    else {
    }
  }
};

const getBeaconPulse = () => {
  const url =
    "https://cors-anywhere.herokuapp.com/https://beacon.nist.gov/beacon/2.0/pulse/last";
  const go = () => {
    let resp;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => (resp = xhr.responseText);
      xhr.open("GET", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onload = resp => resolve(resp);
      xhr.onerror = err => reject(new Error(err));
      xhr.send();
    });
  };

  const returnPulse = async () => {
    let pulse = await go();
    let json = JSON.parse(pulse.target.responseText);
    pulse = json.pulse;
    console.log(pulse);
    return pulse;
  };

  return returnPulse();
};
