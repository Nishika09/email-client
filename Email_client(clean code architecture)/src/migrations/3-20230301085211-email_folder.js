

const { Sequelize } = require("sequelize");

async function up({ context: sequelize }) {
  const email_folder=await sequelize.define("Email_Folder", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
       
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    ProviderId: {
      type: Sequelize.STRING,
    },
    Priority:{
      type:Sequelize.INTEGER
    },
    Fetched:{
      type:Sequelize.BOOLEAN,
      allowNull:true,
      defaultValue: false,

    }
  },{
    timestamps:false
  });
  email_folder.sync();
          }
 
async function down({ context: sequelize }) {
  await sequelize.dropTable("Email_Folder");
}

module.exports = { up, down };
