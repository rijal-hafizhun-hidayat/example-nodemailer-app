import { web } from "./app/web";

const port: number = (parseInt(process.env.PORT as string) as number) || 8000;

web.listen(port, () => {
  console.info("app start in port " + port);
});
