'use strict';


const commandGenerate = require(`./src/commands/generate`);
const processCommands = require(`./src/commands`);
const {askQuestion} = require(`./src/interface-frontend`);
const {checkFileExist} = require(`./src/interface-backend`);

if (process.argv.length === 2) {
  const questions = [
    `Сколько сущностей создаем? `,
    `Какой будет путь до файла? `
  ];

  let count = 0;
  let dataFilePath = ``;

  askQuestion(questions[0])
    .then((answer) => {
      count = answer;
      return askQuestion(questions[1]);
    })
    .then((answer) => {
      dataFilePath = answer;
      return checkFileExist(dataFilePath);
    })
    .then((fileExist) => {
      if (fileExist) {
        askQuestion(`Перезаписать? (y)`)
          .then((answer) => {
            if (answer === `y`) {
              return commandGenerate.execute(count, dataFilePath);
            } else {
              console.log(`Файл с данными не был создан!`);
            }
            return true;
          });
      }
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

} else {
  processCommands(process.argv.slice(2));
}
