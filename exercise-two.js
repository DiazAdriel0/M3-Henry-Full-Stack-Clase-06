"use strict";

const { log } = require("async");
let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB,
  problemCx: problemC,
  problemDx: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  /* exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  }); */

  // async await version
  // Tu código acá:
  /* async function promiseAll() { */
    const stanza1 = exerciseUtils.promisifiedReadFile("./poem-two/stanza-01.txt")
    const stanza2 = exerciseUtils.promisifiedReadFile("./poem-two/stanza-02.txt")
    let arrayPromises = await Promise.all([stanza1,stanza2])
    exerciseUtils.blue(arrayPromises[0])
    exerciseUtils.blue(arrayPromises[1])
  /* }
  promiseAll() */
  // exerciseUtils.blue(await exerciseUtils.promisifiedReadFile("./poem-two/stanza-02.txt"))
  console.log("done");
}

async function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  /* filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  }); */

  // async await version
  // Tu código acá:
  /* async function promises(){ */
    let arrayPromisifiedFiles = []
    for (let i = 0; i < filenames.length; i++) {
      arrayPromisifiedFiles.push(exerciseUtils.promisifiedReadFile(filenames[i]))
    }
    let arrayPromises = await Promise.all(arrayPromisifiedFiles)
  /* }
  await promises() */
  arrayPromises.forEach(promise => exerciseUtils.blue(promise))
  console.log("done");
}

async function problemC() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // callback version
  /* filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
    });
  }); */

  // async await version
  // Tu código acá:
  let arrayPromisifiedFiles = []
  for (let i = 0; i < filenames.length; i++) {
    arrayPromisifiedFiles.push(exerciseUtils.promisifiedReadFile(filenames[i]))
  }
  for (let i = 0; i < arrayPromisifiedFiles.length; i++) {
    exerciseUtils.blue(await arrayPromisifiedFiles[i])
  }
  console.log("done");
}

async function problemD() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  /* filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  }); */

  // async await version
  // Tu código acá:
  try {
    let arrayPromisifiedFiles = []
    for (let i = 0; i < filenames.length; i++) {
      arrayPromisifiedFiles.push(exerciseUtils.promisifiedReadFile(filenames[i]))
    }
    for (let i = 0; i < arrayPromisifiedFiles.length; i++) {
      const log = exerciseUtils.blue(await arrayPromisifiedFiles[i])
      if(!log) throw new Error("error")
      log()
    }
    console.log("done");
  } catch (error) {
    exerciseUtils.magenta(error)
  }
}
