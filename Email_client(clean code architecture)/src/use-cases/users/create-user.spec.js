// const { Given, When, Then, After } = require("cucumber");
// const sinon = require("sinon");
// const expect = require("chai").expect;
// const Joi = require("joi");

// const makeCreateUser = require("./create-user");
// const sandbox = sinon.createSandbox();

// const usersDb = {
//   createUser: () => {},
// };

// const createUserStub = sandbox.stub(usersDb, "createUser");
// createUserStub.callsFake((args) => {
//   expect(args).deep.equal({
//     Name: this.Name,
//     Email: this.Email,
//     Password: this.Password,
//   });

//   return { insertId: 1 };
// });

// After(() => {
//   this.Name = undefined;
//   this.Email = undefined;
//   this.Password = undefined;
//   this.result = undefined;
//   this.error = undefined;

//   sandbox.resetHistory();
// });
// Given(
//   "Create User details Name:{string},Email:{string},and Password:{string} to create new user",
//   (Name, Email, Password) => {
//     this.Name = Name || undefined;
//     this.Email = Email || undefined;
//     this.Password = Password || undefined;
//   }
// );

// When("Try to create new user", async () => {
//   const createUser = makeCreateUser({
//     Joi,
//     usersDb,
//   });

//   try {
//     this.result = await createUser({
//       Name: this.Name,
//       Email: this.Email,
//       Password: this.Password,
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
//   'It will throw error: {string} with message: "{string}" while creating new user',
//   (error, message) => {
//     expect(this.error).deep.equal({
//       Name: error,
//       message,
//     });
//   }
// );

// Then(
//   "createUser function will call {int} time while creating new user",
//   (createUserFunctionCallCount) => {
//     sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
//   }
// );
// Then('It will create new user with details: {string}', (newUserDetails) => {
//   expect(this.result).deep.equal(JSON.parse(newUserDetails).insertId);
// });
