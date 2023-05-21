// 'use strict';

// const { STRING } = require('mysql/lib/protocol/constants/types');
// const { TEXT, Sequelize } = require('sequelize');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
    
//       await queryInterface.createTable('Emails', {
//          id:{
//           type:Sequelize.INTEGER ,
//           allowNull: false,
//          primaryKey: true,
//          autoIncrement: true,
//          },
//          UserId:{
//           type:Sequelize.INTEGER ,
//           allowNull: false,
//           references: { model: 'users', key: 'id' }
//          },
//          Body:{
         
//          type:Sequelize.ENUM('html','text'),
         
//          },
//          Subject:{
          
//           type:Sequelize.STRING,
//          },
//          ThreadId:{
//           type:Sequelize.INTEGER,
//           allowNull:false
//          },
//          isRead:{
//           type:Sequelize.BOOLEAN,
//           allowNull:false,
//           defaultValue:false
//          },
//          messageId:{
//           type:Sequelize.INTEGER,
//           allowNull:false
//          },
//          inReplyTo:{
//           type:Sequelize.BOOLEAN,
//           allowNull:false,
//           defaultValue:false

//          },
//          scheduledAt:{
//           type:Sequelize.DATE,
//           allowNull:true

//          },
//          Snippet:{
//           type:Sequelize.STRING,
//           allowNull:false
//          },
//          isArchieved:{
//           type:Sequelize.BOOLEAN,
//           allowNull:false,
//           defaultValue:false
//          },
//          isTrashed:{
//           type:Sequelize.BOOLEAN,
//           allowNull:false,
//           defaultValue:false
//          },
//          createdAt:{
//           type:Sequelize.DATE,
//           allowNull:false,
//           defaultValue:false
//          }




//       });
        
       
     
//   },

//   async down (queryInterface, Sequelize) {
    
     
//       await queryInterface.dropTable('Emails');
     
//   }
// };
const { Sequelize } = require('sequelize');

async function up({ context: sequelize }) {
	const emails=await sequelize.define('Emails', {
		id:{
                type:Sequelize.INTEGER ,
                allowNull: false,
               primaryKey: true,
               autoIncrement: true,
               },
               UserId:{
                type:Sequelize.INTEGER ,
                allowNull: false,
                references: { model: 'users', key: 'id'
               },
               onDelete: 'CASCADE',
               onUpdate: 'CASCADE', 
               },
               Body:{
               
               type:Sequelize.STRING('html','text'),
               
               },
               Subject:{
                
                type:Sequelize.STRING,
               },
               ThreadId:{
                type:Sequelize.STRING,
                allowNull:false
               },
               isRead:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:false
               },
               messageId:{
                type:Sequelize.STRING,
                allowNull:false
               },
               inReplyTo:{
                type:Sequelize.STRING,
                allowNull:true,
                defaultValue:false
      
               },
               scheduledAt:{
                type:Sequelize.DATE,
                allowNull:true
      
               },
               updatedAt:{
                type:Sequelize.DATE,
                allowNull:true
               },
               Snippet:{
                type:Sequelize.STRING,
                allowNull:false
               },
               isArchieved:{
                type:Sequelize.BOOLEAN,
                allowNull:true,
                defaultValue:false
               },
               isTrashed:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:false
               },
               createdAt:{
                type:Sequelize.DATE,
                allowNull:false,
               
               }
      
      
      
      
            },{
                timestamps:false
              });
              emails.sync();
 }
              
      

async function down({ context: sequelize }) {
	await sequelize.dropTable('Emails');
}

module.exports = { up, down };