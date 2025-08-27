import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Productos extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  nombre: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  precio: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  cantidad: number;

  @Column({ type: DataType.STRING, allowNull: false })
  numeroLote: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fechaIngreso: Date;
}
