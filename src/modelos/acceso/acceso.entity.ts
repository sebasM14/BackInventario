import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.entity';

@Table({
  tableName: 'accesos',
  schema: 'public',
  timestamps: false,
})
export class Acceso extends Model {
  
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    field: 'cod_usuario',
    primaryKey: true,
  })
  declare codUsuario: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'nombre_acceso',
    unique: true,
  })
  declare nombreAcceso: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'clave_acceso',
  })
  declare claveAcceso: string;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}