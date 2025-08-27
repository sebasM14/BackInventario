import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.entity';


@Table({
  tableName: 'accesos',
  schema: 'public',
  timestamps: false,
})
export class Acceso extends Model<Acceso> {
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: 'cod_usuario',
  })
  codUsuario: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'nombre_acceso',
  })
  nombreAcceso: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'clave_acceso',
  })
  claveAcceso: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;
}
