import {Sequelize} from 'sequelize-typescript'

export default class Database {
  private sequelize: Sequelize
  private static DEFAULT_CONNECTION_URL: string = 'postgres://user:secret@localhost:5432/graphql_workshop'
  private static INSTANCE: Database

  private constructor() {
    const url = process.env['DATABASE_CONNECTION_URL'] || Database.DEFAULT_CONNECTION_URL
    this.sequelize = new Sequelize(url)
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