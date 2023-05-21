const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetFolderById = require("./get-email-folder-by-Id");
const sandbox = sinon.createSandbox();

const usersDb = {
    getAllEmailFolderById: () => {},
};

const getFolderByIdStub = sandbox.stub(usersDb, "getAllEmailFolderById");
getFolderByIdStub.callsFake((args) => {
  expect(args).deep.equal({
    UserId: this.UserId,
  });

  return { UserId: 1 };
});

After(() => {
  this.UserId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given('User details id: "{string}"', (UserId) => {
this.UserId = parseInt(UserId) || undefined;
});

Given('User details id: {string}', (UserId) => {
    this.UserId = parseInt(UserId) || undefined;
});

When("Try to get folder by Id", async () => {
  const getFolderById = makeGetFolderById({
    Joi,
    usersDb,
  });

  try {
    this.result = await getFolderById({
      UserId: this.UserId,
    });
  } catch (e) {
    console.log(e, "error");
    this.error = {
      Name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while geting folder by id',
  (error, message) => {
    expect(this.error).deep.equal({
      Name: error,
      message,
    });
  }
);

Then(
  "getFolderById function will call {int} time while getting folder by id",
  (getFolderByIdFunctionCallCount) => {
    sinon.assert.callCount(getFolderByIdStub, getFolderByIdFunctionCallCount);
  }
);
Then("It will get folder by id with details: {string}", (newFolderDetails) => {
  expect(this.result).deep.equal(JSON.parse(newFolderDetails).UserId);
});
