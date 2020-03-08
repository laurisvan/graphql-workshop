import { Model, Table, Column, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export class Customer extends Model<Customer> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string
}