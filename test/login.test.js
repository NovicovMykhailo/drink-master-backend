//~~~~~~~~~~~~~~~~~~~~~~~~~~TASKs~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*
 *    1. відповідь повина мати статус-код 200
 *    2. у відповіді повинен повертатися токен
 *    3. у відповіді повинен повертатися об'єкт user 
 *       3.1  об'єкт user з 2 полями: email; subscription з типом даних String
 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//URL
const BASE_URL = "http://localhost:3000/users/";

// Valid User Info Data
const testProfile = {
  email: "poly@mail.com",
  password: "123456789",
};

//fetch function
const fetchData = async () => {
  const data = await fetch(`${BASE_URL}login`, {
    method: "POST",
    body: JSON.stringify(testProfile),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

//Tests Cases
describe("unit-tests for the entrance controller (login)", () => {
    
  test("whether the response has a status code of 200", async () => {
    const data = await fetchData();
    expect(data.status).toBe(200);
  });

  test("if the response has a token", async () => {
    const data = await fetchData();
    const response = await data.json();
    expect(Boolean(response.token)).toBe(true);
  });

  test("whether the user object is returned with 2 fields email and subscription with data type String", async () => {
    const data = await fetchData();
    const response = await data.json();
    const { email, subscription } = response.user;
    expect(Boolean(response.user)).toBe(true);
    expect(Boolean(email)).toBe(true);
    expect(Boolean(subscription)).toBe(true);
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});
//
