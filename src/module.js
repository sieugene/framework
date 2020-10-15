console.log("module.js");

async function start() {
  return await Promise.resolve("async woking2");
}

start().then(console.log);
