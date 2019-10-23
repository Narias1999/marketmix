
const inquirer = require('inquirer');
const dbs = require('./index');

const prompt = inquirer.createPromptModule();

async function setup() {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'Esto va a generar una nueva base de datos, esta seguro?',
    },
  ]);
  if (!answer.setup) return console.log('OK!');

  const { sequelize } =  dbs();

  
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('database reseted successsfully!');
    process.exit(0);
  } catch (error) {
    console.error('Ocurrió un error reseteando la base de datos!');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

setup();
