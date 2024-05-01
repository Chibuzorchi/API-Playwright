const {test, expect} = require('@playwright/test')

// Create Post API Request
test('Create POST api request - static req body', async ({request}) => {
    const postApiRes = await request.post('/booking', {
        data:{
            "firstname": "Suzan",
            "lastname": "Shaw",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
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
