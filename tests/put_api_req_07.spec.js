const {test, expect} = require('@playwright/test')
import {stringFormat} from '../utils/common';
const bookingApiReqBody = require('../test-data/post_dyn_reqBody.json');
const tokenReqBody = require('../test-data/token_req_body.json');
const putReqBody = require('../test-data/put_req_body.json');

// Write Test
test('Create PUT API', async ({request}) => {
   const dynamicReqBody = stringFormat(JSON.stringify(bookingApiReqBody), "Flegen", "Claw", "Apple")
    
   console.log("========POST === API===== BODY========");
   
   // Create POST API
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

    console.log("=========GET === API ===== BODY=========");

    //Get API CALL
    const getApiResponde = await request.get(`/booking/${bId}`);
    console.log(await getApiResponde.json());

    //Validate Status Code
    expect(getApiResponde.ok).toBeTruthy();
    expect(getApiResponde.status()).toBe(200)


    //Generate Token
    const tokenRes = await request.post(`/auth`, {
        data: tokenReqBody
    })

    const tokenApiRes = await tokenRes.json();
    const tokenNo = tokenApiRes.token;
    console.log('Token number is : '+ tokenNo);

    console.log("========PUT === API ===== BODY=========");

    //PUT Request Body
    const putResponse = await request.put(`/booking/${bId}`, {
        headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${tokenNo}`
        },
        data: putReqBody
    })

    const putResponseBody = await putResponse.json();
    console.log(putResponseBody);

})
