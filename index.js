#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow('TODO List App');
    await sleep();
    title.stop();
}
await welcome();
let todoList = [];
async function askQuestion() {
    const answer = await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "operator",
            message: "Choose operation \n",
            choices: [
                {
                    name: "Add List",
                    value: "add"
                },
                {
                    name: "Remove List",
                    value: "delete"
                },
                {
                    name: "Remove All",
                    value: "deleteall"
                }
            ]
        },
        {
            type: "string",
            name: "todo",
            message: "Enter Todo",
            when: ({ operator }) => {
                if (operator === 'add')
                    return true;
                else
                    return false;
            }
        }
    ]);
    const { operator, todo } = answer;
    switch (operator) {
        case "add":
            todoList.push(todo);
            break;
        case "delete":
            await displayToDelete();
            break;
        case "deleteall":
            todoList = [];
            console.log(chalk.green(`Todo List is empty now!`));
            break;
        default:
            break;
    }
    displayTodo();
}
const displayToDelete = async () => {
    const { deleteThis } = await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "deleteThis",
            message: "Choose One To Remove \n",
            choices: todoList
        }
    ]);
    console.log(deleteThis);
    todoList = todoList.filter(todo => todo !== deleteThis);
};
function displayTodo() {
    console.log(chalk.yellow(`Todo List`));
    todoList.forEach(todo => {
        console.log(chalk.green(`${todo}`));
    });
}
async function restart() {
    do {
        await askQuestion();
        var inp = await inquirer.prompt([
            {
                type: "input",
                name: "choice",
                message: "Do you want to start again? enter y/n"
            }
        ]);
    } while (inp.choice === 'y');
}
restart();
