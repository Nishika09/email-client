const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCheckExistingUser = require("./check-existing-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  existingUsers: () => {},
};

const existingUserStub = sandbox.stub(usersDb, "existingUsers");
existingUserStub.callsFake((args) => {
  expect(args).deep.equal({
    Email: this.Email
  });

  throw new Error("User with the same email is already exists");
});

After(() => {
 
  this.Email = undefined;
 
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given(
  "User details Email: {string} to create new user",
  ( Email) => {
    
    this.Email = Email || undefined;
   
  }
);
Given('Already existed user details: "{string}" with same email', (userDetailsByEmail) => {
    this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
  });
  

When("Try to create existing user", async () => {
  const existingUsers = makeCheckExistingUser({
    Joi,
    usersDb,
  });

  try {
    this.result = await existingUsers({
    
      Email: this.Email,
     
    });
  } catch (e) {
    console.log(e, "error");
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new user',
  (error, message) => {
    console.log(this.error);
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  "existingUser function will call {int} time while creating new user",
  (existingUserFunctionCallCount) => {
    sinon.assert.callCount(existingUserStub, existingUserFunctionCallCount);
  }
);
Then('It will create new user with details: "{string}"', (newUserDetails) => {
  console.log(newUserDetails.Email);
  console.log(this.result);

  expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

