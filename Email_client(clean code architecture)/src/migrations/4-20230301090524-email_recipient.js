

const { Sequelize } = require("sequelize");

async function up({ context: sequelize }) {
  const email_recipient=await sequelize.define("Email_Recipient", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.STRING,
    },
    Email_Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Emails",
        key: "id",
        
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    Email_Address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Type: {
      type: Sequelize.STRING("from", "to", "cc", "bcc"),
      allowNull: false,
    },
  },{
    timestamps:false
  });
  email_recipient.sync();
          }
  
async function down({ context: sequelize }) {
  await sequelize.dropTable("Email_Recipient");
}

module.exports = { up, down };

