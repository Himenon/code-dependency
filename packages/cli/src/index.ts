import { createServer } from "./server";

const main = async () => {
  const server = await createServer();

  console.log("Run: http://localhost:3000");
  server.listen(3000);
};

main().catch(error => {
  console.error(error);
});
