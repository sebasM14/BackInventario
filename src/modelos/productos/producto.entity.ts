import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';

@Table({
  tableName: 'productos',
  schema: 'public',
  timestamps: false,
})
export class Producto extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'cod_producto',
    type: DataType.INTEGER,
  })
  declare codProducto: number;

  @AllowNull(false)
  @Column({
    field: 'numero_lote',
    type: DataType.STRING(100),
    unique: true,
  })
  declare numeroLote: string;

  @AllowNull(false)
  @Column({
    field: 'nombre_producto',
    type: DataType.STRING(250),
  })
  declare nombreProducto: string;

  @AllowNull(false)
  @Column({
    field: 'precio',
    type: DataType.DECIMAL(10, 2),
  })
  declare precio: number;

  @AllowNull(false)
  @Column({
    field: 'cantidad_disponible',
    type: DataType.INTEGER,
  })
  declare cantidadDisponible: number;

  @AllowNull(false)
  @Column({
    field: 'fecha_ingreso',
    type: DataType.DATE,
  })
  declare fechaIngreso: Date;

  @Default(true)
  @Column({
    field: 'estado',
    type: DataType.BOOLEAN,
  })
  declare estado: boolean;

}