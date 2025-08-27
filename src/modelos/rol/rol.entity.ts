import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.entity';


@Table({
  tableName: 'roles',
  schema: 'public',
  timestamps: false,
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'cod_rol',
  })
  codRol: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'nombre_rol',
  })
  nombreRol: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'estado_rol',
  })
  estadoRol: number;

  @HasMany(() => Usuario)
  usuarios: Usuario[];
}
