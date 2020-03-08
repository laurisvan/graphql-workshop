import { Model, Table, Column, PrimaryKey, ForeignKey, IsUUID, IsDate } from 'sequelize-typescript'
import { Customer } from './Customer'
import { Person } from './Person'

@Table
export class Assignment extends Model<Assignment> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @IsUUID(4)
  @ForeignKey(() => Person)
  @Column
  assigneeId!: string;

  @IsUUID(4)
  @ForeignKey(() => Customer)
  @Column
  recipientId!: string;

  @IsUUID(4)
  @ForeignKey(() => Customer)
  @Column
  orderedById!: string;

  @IsDate
  @Column
  starts!: Date

  @IsDate
  @Column
  ends!: Date
}