export default [
  {
    "name": "default",
    "type": "postgres",
    "port": process.env.DATABASE_PG_PORT || 5432,
    "host": process.env.DATABASE_PG_HOST || "localhost",
    "username": process.env.DATABASE_PG_USER || "users",
    "password": process.env.DATABASE_PG_PASSWORD || "password",
    "database": process.env.DATABASE_PG_DATABASE || "database_name",
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "entities": [
      "./src/modules/**/entities/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "seed",
    "type": "postgres",
    "port": process.env.DATABASE_PG_PORT || 5432,
    "host": process.env.DATABASE_PG_HOST || "localhost",
    "username": process.env.DATABASE_PG_USER || "users",
    "password": process.env.DATABASE_PG_PASSWORD || "password",
    "database": process.env.DATABASE_PG_DATABASE || "database_name",
    "migrations": [
      "./src/shared/infra/typeorm/seeds/*.ts"
    ],
    "entities": [
      "./src/modules/**/entities/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/seeds"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": process.env.DATABASE_MONGO_HOST || "localhost",
    "port": process.env.DATABASE_MONGO_PORT || 27017,
    "database": process.env.DATABASE_MONGO_DATABASE || "database_name",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
