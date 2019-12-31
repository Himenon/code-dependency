#!/usr/bin/env node
import { createServer } from "./server";

const main = async () => {
  await createServer();
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
