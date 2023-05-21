const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateFolder = require("./update-folder");
const sandbox = sinon.createSandbox();

const usersDb = {
    updateEmailFolder: () => {},
};

const updateFolderStub = sandbox.stub(usersDb, "updateEmailFolder");
updateFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    id: this.id,
    Name:this.Name,
    UserId:this.UserId
  });

  return { id: 1 };

});

After(() => {
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
// Given('User details id: {string}, Name: {string},UserId: {string}', (id,Name,UserId) => {
//   this.id = parseInt(id) || undefined;
//   this.Name = Name || undefined;
//   this.UserId = parseInt(UserId) || undefined;
// });

Given('User details id: {string}, Name: {string},UserId: {string}', (id,Name,UserId) => {
  this.id = parseInt(id) || undefined;
  this.Name = Name || undefined;
  this.UserId = parseInt(UserId) || undefined;
});

When("Try to update folder", async () => {
  const updateFolder = makeUpdateFolder({
    Joi,
    usersDb,
  });

  try {

    console.log("hii");
    this.result = await updateFolder({
      id: this.id,
      Name: this.Name,
      UserId:this.UserId
    });
    console.log(this.result);
  } catch (e) {
    this.error = {
      Name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while updating folder',
  (error, message) => {
    expect(this.error).deep.equal({
      Name: error,
      message,
    });
  }
);

Then(
  "updateFolder function will call {int} time while updating folder",
  (updateFolderFunctionCallCount) => {
    sinon.assert.callCount(updateFolderStub, updateFolderFunctionCallCount);
  }
);
Then('It will update folder with details: {string}', (message) => {
  expect(this.result).deep.equal(JSON.parse(message));
});
