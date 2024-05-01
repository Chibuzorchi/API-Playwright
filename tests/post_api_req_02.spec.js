const {test, expect} = require('@playwright/test')
const bookingApiReqBody = require('../test-data/post_req_body.json');

// Create Post API Request
test('Create POST api request - static JSON File', async ({request}) => {
    const postApiRes = await request.post('/booking', {
        data: bookingApiReqBody
    })


    //Validate Status Code
    expect(postApiRes.ok()).toBeTruthy()
    expect(postApiRes.status()).toBe(200)
  
    const postApiResBody = await postApiRes.json();
    console.log(postApiResBody);

    //Validate JSON Api Response
    expect(postApiResBody.booking).toHaveProperty("firstname", "Suzan");
    expect(postApiResBody.booking).toHaveProperty("lastname", "Shaw");

    //Validate Nested JSON Object
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01",);
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");
})
