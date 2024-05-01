const {test, expect} = require('@playwright/test')
import {stringFormat} from '../utils/common';
const bookingApiReqBody = require('../test-data/post_dyn_reqBody.json');

// Create Post API Request
test('Create GET api request - Dynamic JSON File', async ({request}) => {
   const dynamicReqBody = stringFormat(JSON.stringify(bookingApiReqBody), "Flegen", "Claw", "Apple")
   
    const postApiRes = await request.post('/booking', {
        data: JSON.parse(dynamicReqBody)
    })

    //Validate Status Code
    expect(postApiRes.ok()).toBeTruthy()
    expect(postApiRes.status()).toBe(200)
  
    const postApiResBody = await postApiRes.json();
    console.log(postApiResBody);

    const bId = postApiResBody.bookingid;

    //Validate JSON Api Response
    expect(postApiResBody.booking).toHaveProperty("firstname", "Flegen");
    expect(postApiResBody.booking).toHaveProperty("lastname", "Claw");

    //Validate Nested JSON Object
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01",);
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");

    console.log("=======================================================");

    const getApiResponde = await request.get(`/booking/${bId}`);
    console.log(await getApiResponde.json());

    //Validate Status Code
    expect(getApiResponde.ok).toBeTruthy();
    expect(getApiResponde.status()).toBe(200)
})
