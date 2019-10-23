
const inquirer = require('inquirer');
const faker = require('faker');
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

  const { sequelize, products } = dbs();

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // creating mocked products
    const productsArr = [];

    for (let index = 0; index < 200; index++) {
      const product = {
        name: faker.commerce.product(),
        price: Number(faker.finance.amount(2000, 5000, 0)),
        description: faker.lorem.sentences(4),
        image: faker.image.food(300, 400),
      };

      productsArr.push(product);
    }

    await products.bulkCreate(productsArr);

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
