const {test, expect} = require('@playwright/test')
import {faker} from '@faker-js/faker';
const {DateTime} = require('luxon');

// Create Post API Request
test('Create POST api request - Dynamic req body', async ({request}) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkoutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');
    
    const postApiRes = await request.post('/booking', {
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkinDate,
                "checkout": checkoutDate
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
    expect(postApiResBody.booking).toHaveProperty("firstname", firstName);
    expect(postApiResBody.booking).toHaveProperty("lastname", lastName);

    //Validate Nested JSON Object
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkin", checkinDate);
    expect(postApiResBody.booking.bookingdates).toHaveProperty("checkout", checkoutDate);
})
