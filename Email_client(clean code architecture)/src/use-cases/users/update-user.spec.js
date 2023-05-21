const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateUser = require("./update-user");
const sandbox = sinon.createSandbox();

const usersDb = {
  updateUser: () => {},
};

const updateUserStub = sandbox.stub(usersDb, "updateUser");
updateUserStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
    Name:this.Name
  });

  return 1;
});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
// Given('User details id: "{string}", Name: {string}', (id,Name) => {
//   this.id = id || undefined;
//   this.Name = Name || undefined;
// });

Given('User details id: {string}, Name: {string}', (id,Name) => {
  this.id = id || undefined;
  this.Name = Name || undefined;
});

When("Try to update user", async () => {
  const updateUser = makeUpdateUser({
    Joi,
    usersDb,
  });

  try {
    this.result = await updateUser({
      id: this.id,
      Name: this.Name,
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
  'It will throw error: {string} with message: "{string}" while updating user',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  "updateUser function will call {int} time while updating user",
  (updateUserFunctionCallCount) => {
    sinon.assert.callCount(updateUserStub, updateUserFunctionCallCount);
  }
);
Then("It will update user with details: {int}", (newUserDetails) => {
  expect(this.result).deep.equal(newUserDetails);
});
