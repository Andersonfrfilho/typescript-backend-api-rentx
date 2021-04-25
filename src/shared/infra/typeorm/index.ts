import { Connection, createConnections, getConnectionOptions } from "typeorm";

export default async (host = "localhost"): Promise<Connection[]> => {
  const defaultOptions = await getConnectionOptions();
  return createConnections(
    // newOptions.host = "database_ignite"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    // [Object.assign(defaultOptions, {
    //   host: process.env.NODE_ENV === "test" ? "localhost" : host,
    //   database:
    //     process.env.NODE_ENV === "test"
    //       ? "rentx_test"
    //       : defaultOptions.database,
    // })]
  );
};
