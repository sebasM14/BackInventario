import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Compra } from '../compras/compras.entity';
import { Producto } from '../productos/producto.entity';


@Table({
  tableName: 'detalles_compra',
  schema: 'public',
  timestamps: false,
})
export class DetalleCompra extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'cod_detalle',
    type: DataType.INTEGER,
  })
  declare codDetalle: number;

  @ForeignKey(() => Compra)
  @AllowNull(false)
  @Column({
    field: 'cod_compra',
    type: DataType.INTEGER,
  })
  declare codCompra: number;

  @ForeignKey(() => Producto
)
  @AllowNull(false)
  @Column({
    field: 'cod_producto',
    type: DataType.INTEGER,
  })
  declare codProducto: number;

  @AllowNull(false)
  @Column({
    field: 'cantidad',
    type: DataType.INTEGER,
  })
  declare cantidad: number;

  @AllowNull(false)
  @Column({
    field: 'precio_unitario',
    type: DataType.DECIMAL(10, 2),
  })
  declare precioUnitario: number;

  @AllowNull(false)
  @Column({
    field: 'subtotal',
    type: DataType.DECIMAL(10, 2),
  })
  declare subtotal: number;

  @BelongsTo(() => Compra)
  declare compra: Compra;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}