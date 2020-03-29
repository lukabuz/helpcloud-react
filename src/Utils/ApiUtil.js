import axios from "axios";
const API_URL = "https://helpcloud-api.herokuapp.com/api";

const formatErrors = errors => {
  const keys = Object.keys(errors);
  let errorArray = [];
  for (const key of keys) {
    errorArray.push(errors[key]);
  }
  return errorArray;
};

const serialize = function(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (
      obj.hasOwnProperty(p) &&
      obj[p] !== null &&
      obj[p] !== "" &&
      obj[p] !== []
    ) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};

export function voulenteer({
  name,
  email,
  profession,
  residence,
  description,
  general_location,
  offers
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${API_URL}/voulenteer`, {
        name,
        email,
        profession,
        country: residence[0],
        city: residence[1],
        description,
        general_location,
        offers
      });

      resolve({ status: "success", data: response.data });
    } catch (e) {
      if (e.response.status === 422) {
        reject(formatErrors(e.response.data.errors));
      } else {
        reject(["Unknown error, please refresh the page and try again."]);
      }
    }
  });
}

export function getReasons() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}/offers`);
      resolve(response.data.offers);
    } catch (e) {
      reject(["Unknown error, please refresh the page and try again."]);
    }
  });
}

export function getVoulenteers(
  country = null,
  city = null,
  generalLocation = null,
  offers = []
) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `${API_URL}/voulenteers?${serialize({
          country: country,
          city: city,
          general_location: generalLocation,
          offers: offers
        })}`
      );
      console.log(response.data);
      resolve(response.data.voulenteers);
    } catch (e) {
      reject(["Unknown error, please refresh the page and try again."]);
    }
  });
}

export function requestHelp({
  name,
  status,
  message,
  phone_number,
  voulenteer_id
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${API_URL}/help`, {
        name,
        status,
        message,
        phone_number,
        voulenteer_id
      });

      resolve({ status: "success", data: response.data });
    } catch (e) {
      if (e.response.status === 422) {
        reject(formatErrors(e.response.data.errors));
      } else {
        reject(["Unknown error, please refresh the page and try again."]);
      }
    }
  });
}
