import { writeFile, createWriteStream } from 'node:fs';
import { Buffer } from 'node:buffer';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
  .prompt([{
    name: "userInput",
    type: "input",
    message: "Enter a URL: ",
  }])
  .then((answers) => {
    var qr_svg = qr.image(answers.userInput);
    qr_svg.pipe(createWriteStream('qr_img.png'));
    writeFile("URL.txt", answers.userInput, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

