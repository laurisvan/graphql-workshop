import { ICustomer } from '../../interfaces/schema-typings'
import { Injectable } from 'graphql-modules'
import { v4 as uuidv4 } from 'uuid'
import Customer from '../../models/Customer'
import DataLoader from 'dataloader'

/**
 * This is a sample provider (just a logic wrapper) that is used as glue
 * between the database models and queries.
 *
 * Note that the `Injectable` decorator makes this provider injectable.
 * DI in graphql-modules is very much like Inversify, but it has additional
 * helpers for different life-cycles (singleton, session, request).
 */
@Injectable({ global: true })
export class CustomerProvider {
  private readonly loader = new DataLoader<string, Customer | undefined>(
    async (ids: readonly string[]): Promise<Array<Customer | undefined>> => {
      const rows = await Customer.findAll({
        where: {
          // Note: We do the array trick just because Sequelize API is mutable
          // and DataLoader isn't.
          id: [...ids]
        }
      })

      return ids.map(id => rows.find(c => c.id === id))
    },
    { cache: false }
  )

  async findById (id: string): Promise<Customer | undefined> {
    if (!id) {
      return undefined
    }

    return await this.loader.load(id)
  }

  async find (): Promise<Customer[]> {
    return await Customer.findAll()
  }

  async create (input: ICustomer): Promise<Customer> {
    return await Customer.create({
      ...input,
      id: uuidv4()
    })
  }
}

export default CustomerProvider
