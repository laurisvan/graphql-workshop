import { DataType, Model, Table, Column, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export default class Person extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string

  @Column
  name!: string
}
