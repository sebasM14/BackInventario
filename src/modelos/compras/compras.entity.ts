import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, Default, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Usuario } from '../usuario/usuario.entity';

@Table({
  tableName: 'compras',
  schema: 'public',
  timestamps: false,
})
export class Compra extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'cod_compra',
    type: DataType.INTEGER,
  })
  declare codCompra: number;

  @ForeignKey(() => Usuario)
  @AllowNull(false)
  @Column({
    field: 'cod_usuario',
    type: DataType.INTEGER,
  })
  declare codUsuario: number;

  @Default(DataType.NOW)
  @Column({
    field: 'fecha_compra',
    type: DataType.DATE,
  })
  declare fechaCompra: Date;

  @AllowNull(false)
  @Column({
    field: 'total_compra',
    type: DataType.DECIMAL(12, 2),
  })
  declare totalCompra: number;

  @Default('pendiente')
  @Column({
    field: 'estado',
    type: DataType.STRING(20),
  })
  declare estado: string;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  

}