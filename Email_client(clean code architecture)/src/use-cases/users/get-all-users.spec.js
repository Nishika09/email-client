// const { Given, When, Then, After } = require("cucumber");
// const sinon = require("sinon");
// const expect = require("chai").expect;
// const Joi = require("joi");

// const makeGetAllUser = require("./get-all-users");
// const sandbox = sinon.createSandbox();

// const usersDb = {
//     getAllUsers: () => {},
// };

// const getAllUserStub = sandbox.stub(usersDb, "getAllUsers");
// getAllUserStub.callsFake((args) => {
//   expect(args).deep.equal({

//   return { insertId: 1 };
//   });
// });

// After(() => {
//   this.Name = undefined;
//   this.Email = undefined;
//   this.Password = undefined;
//   this.result = undefined;
//   this.error = undefined;

//   sandbox.resetHistory();
// });
// // Given(
// //   "Create User details Name:{string},Email:{string},and Password:{string} to create new user",
// //   (Name, Email, Password) => {
// //     this.Name = Name || undefined;
// //     this.Email = Email || undefined;
// //     this.Password = Password || undefined;
// //   }
// // );

// When("Try to create new user", async () => {
//   const getAllUser = makeGetAllUser({
//     Joi,
//     usersDb,
//   });

// //   try {
// //     this.result = await createUser({
// //       Name: this.Name,
// //       Email: this.Email,
// //       Password: this.Password,
// //     });
// //   } catch (e) {
// //     console.log(e, "error");
// //     this.error = {
// //       Name: e.name,
// //       message: e.message,
// //     };
// //   }
// });

// // Then(
// //   'It will throw error: {string} with message: "{string}" while creating new user',
// //   (error, message) => {
// //     expect(this.error).deep.equal({
// //       Name: error,
// //       message,
// //     });
// //   }
// // );

// Then('It will give all users: {string}', (allUserDetails) => {
//     expect(this.result).deep.equal(JSON.parse(allUserDetails));
//   });
  
// Then(
//   "getAllUser function will call {int} time while getting all user",
//   (getAllUserFunctionCallCount) => {
//     sinon.assert.callCount(getAllUserStub, getAllUserFunctionCallCount);
//   }
// );
