import { Sequelize } from 'sequelize-typescript'
// TODO Remove these comments as we create the models
// import Assignment from './Assignment'
// import Customer from './Customer'
// import Person from './Person'

export default class Database {
  private sequelize: Sequelize
  private static DEFAULT_CONNECTION_URL: string = 'postgres://localhost:5432/graphql_workshop'
  private static INSTANCE: Database

  private constructor() {
    const url = process.env['DB_CONNECTION_URL'] || Database.DEFAULT_CONNECTION_URL
    this.sequelize = new Sequelize(url, {
      // TODO Remove these comments as we create the models
      models: [ /*Assignment, Customer, Person */ ],
    })
  }

  static get instance() {
    return Database.INSTANCE || (Database.INSTANCE = new Database())
  }

  async init() {
    // Enforce sequelize initialization (force param drop existing tables)
    await this.sequelize.sync({
      force: true
    })
  }
}