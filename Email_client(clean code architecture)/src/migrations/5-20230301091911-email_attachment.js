



// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('Email_Attachment', {
// 		id:{
//               type: Sequelize.INTEGER,
//               allowNull: false,
//               primaryKey: true,
//               autoIncrement: true,
//              } ,
//              Email_Id:{
//               type:Sequelize.INTEGER,
//               allowNull:false,
//               references:{model:'Emails',id:'id'
//             },
//               onDelete: 'CASCADE',
//               onUpdate: 'CASCADE'
//              },
//              FileName:{
//               type:Sequelize.STRING,
              
//              },
//              size:{
//               type:Sequelize.INTEGER,
              
//              },
//              Type:{
//               type:Sequelize.STRING
      
//              },
//              Path:{
//               type:Sequelize.STRING,
              
      
//              }
//             });
           
//         }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('Email_Attachment');
// }

// module.exports = { up, down };

const { Sequelize } = require('sequelize');

async function up({ context: sequelize }) {
	const email_attachment=await sequelize.define('Email_Attachment', {
		id:{
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
             } ,
             Email_Id:{
              type:Sequelize.INTEGER,
              allowNull:false,
              references:{model:'Emails',id:'id'
            },
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
             },
             FileName:{
              type:Sequelize.STRING,
              
             },
             size:{
              type:Sequelize.INTEGER,
              
             },
             Type:{
              type:Sequelize.STRING
      
             },
             Path:{
              type:Sequelize.STRING,
              
      
             }
            },{
              timestamps:false
            });
            email_attachment.sync();
                    }

async function down({ context: sequelize }) {
	await sequelize.dropTable('Email_Attachment');
}

module.exports = { up, down };
