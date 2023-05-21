



const { Sequelize } = require('sequelize');

async function up({ context: sequelize }) {
	const emailFolder_association=await sequelize.define('emailFolder_Association', {
    Email_id: {
      type:Sequelize.INTEGER,
      primaryKey: true,
      references:{model:'Emails',key:'id'},
      
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
     } ,
     Folder_Id:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      references:{model:'Email_Folders',key:'id'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    
  },{
    timestamps:false
  });
  emailFolder_association.sync();
          }

async function down({ context: sequelize }) {
	await sequelize.dropTable('emailFolder_Association');
}

module.exports = { up, down };