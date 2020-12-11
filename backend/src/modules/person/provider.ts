
import { IPerson } from '../../interfaces/schema-typings'
import { Injectable } from 'graphql-modules'
import { v4 as uuidv4 } from 'uuid'
import Person from '../../models/Person'

/**
 * This is a sample provider (just a logic wrapper) that is used as glue
 * between the database models and queries.
 *
 * Note that the `Injectable` decorator makes this provider injectable.
 * DI in graphql-modules is very much like Inversify, but it has additional
 * helpers for different life-cycles (singleton, session, request).
 */
@Injectable({ global: true })
export class PersonProvider {
  async find (): Promise<Person[]> {
    return await Person.findAll()
  }

  async create (input: IPerson): Promise<Person> {
    return await Person.create({
      ...input,
      id: uuidv4()
    })
  }
}

export default PersonProvider
