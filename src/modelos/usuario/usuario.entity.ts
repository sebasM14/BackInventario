import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Role } from '../rol/rol.entity';
import { Acceso } from '../acceso/acceso.entity';


@Table({
  tableName: 'usuarios',
  schema: 'public',
  timestamps: false,
})
export class Usuario extends Model<Usuario> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'cod_usuario',
  })
  codUsuario: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'cod_rol',
  })
  codRol: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'nombre_usuario',
  })
  nombreUsuario: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'fecha_nacimiento_usuario',
  })
  fechaNacimientoUsuario: Date;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'telefono_usuario',
  })
  telefonoUsuario: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'genero_usuario',
  })
  generoUsuario: number;

  @BelongsTo(() => Role)
  rol: Role;

  @HasOne(() => Acceso)
  acceso: Acceso;
}
