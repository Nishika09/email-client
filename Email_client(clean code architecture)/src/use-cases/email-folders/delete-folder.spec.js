// const { Given, When, Then, After } = require("cucumber");
// const sinon = require("sinon");
// const expect = require("chai").expect;
// const Joi = require("joi");

// const makedeleteFolder = require("./delete-folder");
// const sandbox = sinon.createSandbox();

// const usersDb = {
//     deleteEmailFolder: () => {},
// };

// const deleteFolderStub = sandbox.stub(usersDb, "deleteEmailFolder");
// deleteFolderStub.callsFake((args) => {
//   expect(args).deep.equal({
//     id: this.id,
//   });

//   return { affectedRows: 1 };
// });

// After(() => {
//   this.id = undefined;
//   this.result = undefined;
//   this.error = undefined;

//   sandbox.resetHistory();
// });
// Given('User details id: "{string}"', (id) => {
//   this.id = id || undefined;
// });

// Given('User details id: {string}', (id) => {
//   this.id = id || undefined;
// });

// When("Try to delete folder", async () => {
//   const deleteFolder = makedeleteFolder({
//     Joi,
//     usersDb,
//   });

//   try {
//     this.result = await deleteFolder({
//       id: this.id,
//     });
//   } catch (e) {
//     console.log(e, "error");
//     this.error = {
//       Name: e.name,
//       message: e.message,
//     };
//   }
// });

// Then(
//   'It will throw error: {string} with message: "{string}" while deleting folder',
//   (error, message) => {
//     expect(this.error).deep.equal({
//       Name: error,
//       message,
//     });
//   }
// );

// Then(
//   "deleteFolder function will call {int} time while deleting folder",
//   (deleteFolderFunctionCallCount) => {
//     sinon.assert.callCount(deleteFolderStub, deleteFolderFunctionCallCount);
//   }
// );
// Then("It will delete folder with details: {string}", (newFolderDetails) => {
//   expect(this.result).deep.equal(JSON.parse(newFolderDetails).id);
// });
