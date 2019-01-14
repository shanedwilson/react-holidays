
import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllHolidays = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      resolve(friendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteHoliday = holidayId => axios.delete(`${firebaseUrl}/holidays/${holidayId}.json`);

const createHoliday = holidayObject => axios.post(`${firebaseUrl}/holidays.json`, JSON.stringify(holidayObject));


// const getHolidaysByArrayOfIds = (uid, holidayIdsArray) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
//     .then((result) => {
//       const holidaysObject = result.data;
//       const holidaysArray = [];
//       if (holidaysObject !== null) {
//         Object.keys(holidaysObject).forEach((holidayId) => {
//           holidaysObject[holidayId].id = holidayId;
//           holidaysArray.push(holidaysObject[holidayId]);
//         });
//       }
//       const selectedHolidays = holidaysArray.filter(x => holidayIdsArray.includes(x.id));
//       resolve(selectedHolidays);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

export default {
  getAllHolidays,
  deleteHoliday,
  createHoliday,
};
