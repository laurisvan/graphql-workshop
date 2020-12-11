import { Sequelize } from 'sequelize-typescript'

import Assignment from './Assignment'
import Customer from './Customer'
import Person from './Person'

export default class Database {
  private readonly sequelize: Sequelize
  private static readonly DEFAULT_CONNECTION_URL: string = 'postgres://localhost:5432/graphql_workshop'
  private static INSTANCE: Database

  private constructor () {
    const url = process.env.DB_CONNECTION_URL ?? Database.DEFAULT_CONNECTION_URL
    this.sequelize = new Sequelize(url, {
      // TODO Remove these comments as we create the models
      models: [
        Assignment,
        Customer,
        Person
      ]
    })
  }

  static get instance (): Database {
    return Database.INSTANCE ?? (Database.INSTANCE = new Database())
  }

  async init (): Promise<void> {
    // Enforce sequelize initialization
    // Call sync({ force: true }) if you permit dropping and re-creating tables
    await this.sequelize.sync()
  }
}
