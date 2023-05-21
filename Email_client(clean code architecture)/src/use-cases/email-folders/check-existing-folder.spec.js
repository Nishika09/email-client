const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCheckExistingFolder = require("./check-existing-folder");

const sandbox = sinon.createSandbox();

const usersDb = {
    existingFolder: () => {},
};

const existingFolderStub = sandbox.stub(usersDb, "existingFolder");
existingFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    Name: this.Name,
   UserId:this.UserId
  });

  return { UserId: 1 };
});

After(() => {
  this.Name = undefined;
  this.UserId = undefined;
  
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});
Given(
  "User details Name: {string}, UserId: {string} to create new folder",
  (Name, UserId) => {
    this.Name = Name || undefined;
    this.UserId = UserId || undefined;
    
  }
);
Given('Already existed folder details: "{string}" with same UserId', (folderDetailsByUserId) => {
    this.folderDetailsByUserId = JSON.parse(folderDetailsByUserId);
  });
  
 
When('Try to create new folder', async () => {
  const existingFolder = makeCheckExistingFolder({
    Joi,
    usersDb,
  });

  try {
    this.result = await existingFolder({
      Name: this.Name,
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
  'It will throw error: {string} with message: "{string}" while creating new folder',
  (error, message) => {
    expect(this.error).deep.equal({
      Name: error,
      message,
    });
  }
);

Then(
  "createFolder function will call {int} time while creating new folder",
  (createFolderFunctionCallCount) => {
    sinon.assert.callCount(existingFolderStub, createFolderFunctionCallCount);
  }
);
Then('It will create new folder with details: "{string}"', (folderDetailsByUserId) => {
  expect(this.result).deep.equal(JSON.parse(folderDetailsByUserId));
});

