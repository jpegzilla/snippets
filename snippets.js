let stringlist = [
  "hello",
  "world",
  "it's",
  "a",
  "beautiful",
  "day",
  "today",
  "test",
  "longer",
  "hexadecimal",
  "hydrochloric",
  "deoxyribonucleic",
  "sulfuric"
];

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
    if (!element) {
    } else {
    }
  },

  mspeed: function(element) {
    if (!element) {
    } else {
    }
  },

  scrollspeed: function(element) {
    if (!element) {
    } else {
    }
  }
};

const getBeaconPulse = () => {
  let x = window.performance.now();
  let txt;
  const url =
    "https://cors-anywhere.herokuapp.com/https://beacon.nist.gov/beacon/2.0/pulse/last";
  const go = () => {
    let resp;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => (resp = xhr.responseText);
      xhr.open("GET", url);
      xhr.setRequestHeader("Accept", "application/json");

      xhr.onload = resp => {
        resolve(resp);
      };
      xhr.onerror = () => {
        reject(new Error("there was an error making the request."));
      };

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
