import { Model, Table, Column, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export class Person extends Model<Person> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string
}