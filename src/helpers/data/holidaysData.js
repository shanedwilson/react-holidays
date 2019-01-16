
import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllHolidays = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const holidaysObject = results.data;
      const holidaysArray = [];
      if (holidaysObject !== null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          holidaysObject[holidayId].id = holidayId;
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      resolve(holidaysArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleHoliday = holidayId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/holidays/${holidayId}.json`)
    .then((result) => {
      const singleHoliday = result.data;
      singleHoliday.id = holidayId;
      resolve(singleHoliday);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteHoliday = holidayId => axios.delete(`${firebaseUrl}/holidays/${holidayId}.json`);

const createHoliday = holidayObject => axios.post(`${firebaseUrl}/holidays.json`, JSON.stringify(holidayObject));

const updateHoliday = (holidayObject, holidayId) => axios.put(`${firebaseUrl}/holidays/${holidayId}.json`, JSON.stringify(holidayObject));

export default {
  getAllHolidays,
  deleteHoliday,
  createHoliday,
  getSingleHoliday,
  updateHoliday,
};
