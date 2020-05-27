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
  shortest: arr => arr.sort((a, b) => a.length - b.length)[0],
  longest: arr => arr.sort((a, b) => b.length - a.length)[0]
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

// (S)ort (A)rray and (F)ilter (D)uplicates
const safd = array =>
  Array.from(new Set(array))
    .sort((a, b) => a - b)
    .filter(c => c != undefined);

// test if string is valid ipv4 address
const isValidIP = address => {
  let split = address.split(".");
  if (split.length != 4) return false;
  for (var i = 0; i < split.length; i++) {
    if (
      !(parseInt(split[i]) >= 0 && parseInt(split[i]) <= 255) ||
      (split[i].length > 1 && parseInt(split[i].charAt(0)) == 0) ||
      /[^\d]/.test(split[i])
    ) {
      return false;
    }
  }
  return true;
};

// alternate method on string proto
String.prototype.isValidIPV4 = function(arg) {
  let split = this.valueOf().split(".");
  if (split.length != 4) return false;
  for (var i = 0; i < split.length; i++) {
    if (
      !(parseInt(split[i]) >= 0 && parseInt(split[i]) <= 255) ||
      (split[i].length > 1 && parseInt(split[i].charAt(0)) == 0) ||
      /[^\d]/.test(split[i])
    ) {
      return false;
    }
  }
  return true;
};

// honestly, down here most of this stuff is just from codewars challenges

// test for pangram - could be used to generate random pangrams or something?
const isPangram = string => {
  let alpha = "abcdefghijklmnopqrstuvwxyz";
  let str = Array.from(new Set(string.toLowerCase().split("")))
    .sort()
    .filter(e => /[a-z]/.test(e) == true)
    .join("");
  if (alpha == str) return true;
  return false;
};

// rot13 cipher function
const rot13 = str => {
  let input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
  let index = x => input.indexOf(x);
  let translate = x => (index(x) > -1 ? output[index(x)] : x);
  return str
    .split("")
    .map(translate)
    .join("");
};

// this has not been tested
const rotx = (str, x, decrypt = false) => {
  let ccArr = [],
    limits = { upper: [97, 122], lower: [65, 90] },
    charCode;

  if (decrypt) x *= -1;

  x = x % 26;

  for (let i = 0; i < str.length; i++) {
    charCode = str.charCodeAt(i);

    if (charCode >= limits.lower[0] && charCode <= limits.lower[1]) {
      ccArr[i] = ((charCode - limits.upper[0] + x) % 26) + limits.upper[0];
    } else if (charCode >= limits.upper[0] && charCode <= limits.upper[1]) {
      ccArr[i] = ((charCode - limits.upper[0] + x) % 26) + limits.upper[0];
    } else {
      ccArr[i] = charCode;
    }
  }

  return String.fromCharCode(...ccArr);
};

const findOutlier = integers =>
  integers.filter(i => i % 2 == 0).length > 1
    ? integers.filter(i => i % 2 != 0)[0]
    : integers.filter(i => i % 2 == 0)[0];

// convert hex color to rgb

const hexToRGBA = hex => {
  if (!hex || typeof hex != "string" || hex.length < 3)
    throw new Error(hex, "is not a valid argument.");
  if (hex.length == 6) {
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("please enter rgb(a) values only between 0 and F.");
    }

    return { r, g, b };
  } else if (hex.length == 3) {
    hex.split("");
    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
    hex = "0x" + hex.join("");
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("please enter rgb(a) values only between 0 and F.");
    }

    return { r, g, b };
  } else if (hex.length == 8) {
    let a = hex.substring(6, 8);
    hex = hex.substring(0, 6);
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;
    a = "0x" + a;
    a = parseInt(a);

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("please enter rgb(a) values only between 0 and F.");
    }

    return { r, g, b, a };
  } else if (hex.length == 4) {
    let a = hex.substring(3, 4).split("");

    hex = hex.substring(0, 3).split("");
    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
    hex = "0x" + hex.join("");

    a = [a[0], a[0]];
    a = "0x" + a.join("");
    a = parseInt(a);

    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("please enter rgb(a) values only between 0 and F.");
    }

    return { r, g, b, a };
  } else {
    throw new Error(
      hex,
      "is not valid, or you entered some weird format that I forgot about."
    );
  }
};

// difference between two arrays
// returns an array with only elements from a that are not contained in b

const difference = (a, b) => a.filter(x => !new Set(b).has(x));

// binary to text
const binToText = input => parseInt(input, 2).toString(10);

// is ascii the right term?
const binToASCII = input => {
  let out = input.match(/[10]{8}/g)
    ? input
        .match(/[10]{8}/g)
        .map(e => String.fromCharCode(parseInt(e, 2)))
        .join("")
    : null;
  return out;
};

// there's gotta be a shorter way to write this I swear to god
// but for now this is it.
const textToBin = input => {
  let out = "";
  for (var i = 0; i < input.length; i++)
    out += input[i].charCodeAt(0).toString(2) + "";

  return out;
};

// I don't know why I'm so proud of this. es6 just makes things so sexy.
const removeProperty = (obj, prop) =>
  obj.hasOwnProperty(prop) ? delete obj[prop] : false;

// (very rough) implementation of time based one-time passwords. new one every 30 seconds.

/**
 * @param {String} secret
 * @param {Number} length
 */

const getTOTP = (b, len) => {
  const dectohex = s => (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  const hextodec = s => parseInt(s, 16);
  const leftpad = (s, l, p) =>
    l + 1 >= s.length ? Array(l + 1 - s.length).join(p) + s : s;

  const base32tohex = b => {
    let r = "";
    let h = "";
    for (i = 0; i < b.toString().length; i++) {
      r = b
        .toString()
        .charCodeAt(i)
        .toString(16);
      h += r;
    }
    return h.replace(/\D/g, "");
  };

  let epoch = Math.round(new Date().getTime() / 1000);
  let time = leftpad(dectohex(Math.floor(epoch / 30)), 16, "0");
  let newsecret = base32tohex(b);

  let a = [];
  for (let i = 1; i < len + 1; i++) {
    let b = hextodec(time) * i * parseInt(newsecret.toString().substring(0, 8));
    a.push(b.toString().charAt(b.toString().length - 3));
  }
  return a.join("");
};

// generate a random are.na block url. requires cors

const randomArenaBlock = () => {
  const baseUrl =
    "https://cors-anywhere.herokuapp.com/https://www.are.na/block/";

  const reqUrl = "https://www.are.na/block/";

  const rDigits = d =>
    `${"x".repeat(d)}`.replace(/x/g, a => (Math.random() * 9) | 0);

  let digits = rDigits(7);

  let randUrl = {
    request: `${baseUrl}${digits}`,
    set: `${reqUrl}${digits}`
  };

  const checkBlock = a => {
    return new Promise((resolve, reject) => {
      fetch(randUrl.request, {
        method: "HEAD",
        headers: {
          origin: "https://jpegzilla.com"
        }
      })
        .then(resp => {
          if (resp.status != 200) {
            return randomArenaBlock();
          } else resolve(resp);
        })
        .catch(err => {
          return new Error(err);
        });
    });
  };

  checkBlock(randUrl).then(resp => {
    let tab = window.open(randUrl.set, "_blank");
    tab.focus();
    return resp.url;
  });
};

const randomYoutubeVideo = () => {
  const reqUrl = "https://youtube.com/watch?v=";
  const baseUrl =
    "https://cors-anywhere.herokuapp.com/https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=";

  const charList =
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

  const rUrl = () => {
    let output = "";
    for (var i = 0; i < 11; i++) {
      output += Array.from(charList)[(Math.random() * charList.length) | 0];
    }

    return {
      request: `${baseUrl + output}`,
      set: `${reqUrl + output}`
    };
  };

  const checkVid = a => {
    return new Promise((resolve, reject) => {
      fetch(a.request, {
        method: "HEAD",
        headers: {
          origin: "https://jpegzilla.com"
        }
      })
        .then(resp => {
          console.log(resp);
          if (resp.status != 200) {
            setTimeout(function() {
              return randomYoutubeVideo();
            }, 2000);
          } else resolve(resp);
        })
        .catch(err => {
          return new Error(err);
        });
    });
  };

  checkVid(rUrl()).then(resp => {
    let tab = window.open(rUrl().set, "_blank");
    tab.focus();
    return resp.url;
  });
};

const floydSteinberg = (sb, w, h) => {
  for (var i = 0; i < h; i++)
    for (var j = 0; j < w; j++) {
      var ci = i * w + j; // current buffer index
      var cc = sb[ci]; // current color
      var rc = cc < 128 ? 0 : 255; // real (rounded) color
      var err = cc - rc; // error amount
      sb[ci] = rc; // saving real color
      if (j + 1 < w) sb[ci + 1] += (err * 7) >> 4; // if right neighbor exists
      if (i + 1 == h) continue; // if we are in the last line
      if (j > 0) sb[ci + w - 1] += (err * 3) >> 4; // bottom left neighbor
      sb[ci + w] += (err * 5) >> 4; // bottom neighbour
      if (j + 1 < w) sb[ci + w + 1] += (err * 1) >> 4; // bottom right neighbor
    }
};

const add = (...args) => {
  let z = 0;
  args.forEach(a => (z += a));
  return z;
};

// generate a uuidv4
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// get url vars
const getUrlVars = () => {
  var a = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (i, j, k) => {
    a[j] = k;
  });
  return a;
};

// remove cookie by name
const removeCookie = cookiename => {
  document.cookie = `${cookiename}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

// chrome bookmark date to standard date object
const chromeDtToDate = st_dt => {
  const microseconds = parseInt(st_dt, 10);
  const millis = microseconds / 1000;
  const past = new Date(1601, 0, 1).getTime();
  return new Date(past + millis);
};
