import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Role } from '../rol/rol.entity';
import { Acceso } from '../acceso/acceso.entity';

@Table({
  tableName: 'usuarios',
  schema: 'public',
  timestamps: false,
})
export class Usuario extends Model {
  
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'cod_usuario',
  })
  declare codUsuario: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'cod_rol',
  })
  declare codRol: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'nombre_usuario',
  })
  declare nombreUsuario: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'fecha_nacimiento_usuario',
  })
  declare fechaNacimientoUsuario: Date;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    field: 'telefono_usuario',
  })
  declare telefonoUsuario: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'genero_usuario',
  })
  declare generoUsuario: number;

  @BelongsTo(() => Role)
  declare rol: Role;

  @HasOne(() => Acceso)
  declare acceso: Acceso;
}