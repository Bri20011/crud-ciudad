import { ComprasLoteAPI } from '@/services/compras_lote.api';
import { ProveedorAPI } from '@/services/proveedor.api';
import { TipoDocumentoAPI } from '@/services/tipo_documento.api';
import { ProductoAPI } from '@/services/producto.api';
import { IvaAPI } from '@/services/iva.api';
import { CajaAPI } from '@/services/caja.api';
import { BarrioAPI } from '@/services/barrio.api';
import { CiudadAPI } from '@/services/ciudad.api';
import { OrdenUrbApi } from '@/services/orde_compra_lote.api';
import dayjs from 'dayjs';

export default (await import('vue')).defineComponent({
components: {
VDataTable
},
data() {
return {
dialogoFormulario: false,
dialogoCambiarEstado: false,

dialogoFormularioEditar: false,
dialogoFormularioEditarDetalle: false,
dialogoFormularioGenerarCuota: false,
ordenCompraSeleccionada: null,
dialogoFormularioEditarDetallePagos: false,



formulario: {
proveedor: '',
documento: '',
fechaO: null,
fechaD: null,
timbrado: '',
numero_factura: '',
costo: '',
cantidad: '',
dimensionTotal: '',
nombreLoteado: '',
caja: '',
},
detalle: {
fechaD: null,
cantidad_lote: '',
costo_lote: '',
ciudad: '',
barrio: '',
},

contador: 1,
limit: 45,
defaultFormulario: {
codigo: '',
descripcion: '',
fecha: '',
timbrado: '',
producto: null,
cantidad: '',
precio: '',
nomnbreProducto: '',
descripcionI: ''
},
buscador: '',
headers: [
{ title: 'Codigo', align: 'start', sortable: false, key: 'id', },
{ title: 'Numero de Factura', key: 'numero_factura' },
{ title: 'Tipo Documento', key: 'documento' },
{ title: 'Caja', key: 'caja' },
{ title: 'Fecha de Factura', key: 'fecha', align: 'star' },
{ title: 'Timbrado', key: 'timbrado', align: 'star' },
{ title: 'Proveedor', key: 'proveedor', align: 'star' },
{ title: 'Accion', key: 'action', sortable: false, align: 'end' },
],
headersCompra: [
{ title: 'Producto', key: 'idProducto', align: 'center' },
{ title: 'Descripcion', key: 'nombreProducto', align: 'center' },
{ title: 'Ubicacion', key: 'ubicacion', align: 'center' },
{ title: 'Barrio', key: 'barrio', align: 'center' },
{ title: 'Ciudad', key: 'ciudad', align: 'center' },
{ title: 'Dimension Total', key: 'dimensionTotal', align: 'center' },
{ title: 'Cantidad', key: 'cantidad_lote', align: 'center' },
{ title: 'Costo Unitario', key: 'costo_lote', align: 'center' },
{ title: 'Iva', key: 'iva', align: 'center' },
{ title: 'Exenta', key: 'exenta', align: 'center' },
{ title: 'Iva 5%', key: 'iva5', align: 'center' },
{ title: 'Iva 10%', key: 'iva10', align: 'center' },
{ title: 'Total', key: 'total', align: 'center' },
{ title: 'Accion', key: 'action', sortable: false, align: 'end' },
],
headersCuentasPagar: [
{ title: 'Fecha de Pago', key: 'fechaD', align: 'star' },
{ title: 'Monto', key: 'monto', align: 'center' },
{ title: 'Accion', key: 'action', sortable: false, align: 'end' },
],
items: [
{
id: '',
descripcion: '',
fecha: '',
action: '',
timbrado: '',
numero_factura: '',
proveedor: ''
}
],
itemsDetalle: [],
dialogoEliminar: false,
elementoAEliminar: null,

listaProveedor: [],
listaDocumento: [],
listaProducto: [],
};
},

computed: {
itemsComputed() {
if (!this.buscador) return this.items;
return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()));
},
// excededLimit() {
//     return this.formulario.descripcion.length > this.limit;
// },
// errorMessage() {
//     if (this.excededLimit) {
//         return 'Superaste el límite de 45 letras';
//     }
//     return '';
// }
},
methods: {
ObtenerProveedor() {
ProveedorAPI.getAll().then(({ data }) => {
this.listaProveedor = data.map(item => {
return {
id: item.idProveedor,
descripcionP: item.Razon_social
};
});
});
},

ObtenerTipoD() {
TipoDocumentoAPI.getAll().then(({ data }) => {
this.listaDocumento = data.map(item => {
return {
id: item.idTipo_Documento,
descripcionD: item.Descripcion
};
});
});
},

ObtenerProducto() {
ProductoAPI.getAll().then(({ data }) => {
this.listaProducto = data.map(item => {
return {
id: item.idProducto,
descripcionPr: item.Descripcion,
};
});
});
},

ObtenerIva() {
IvaAPI.getAll().then(({ data }) => {
this.listaIva = data.map(item => {
return {
id: item.idIva,
descripcion: item.Descripcion,
descripcionI: item.Porcentaje
};
});
});
},
ObtenerCaja() {
CajaAPI.getAll().then(({ data }) => {
this.listaCaja = data.map(item => {
return {
id: item.idCaja,
descripcionC: item.nombrecaja,
numerCaja: item.Cajahabilitada,
idSucursal: item.idSucursal,
nombreSucursal: item.nombreSucursal
};
});
});
},
ObtenerBarrio() {
BarrioAPI.getAll().then(({ data }) => {
this.listaBarrio = data.map(item => {
return {
id: item.idBarrio,
descripcionB: item.descripcion
};
});
});
},
ObtenerCiudades() {
CiudadAPI.getAll().then(({ data }) => {
this.listaCiudad = data.map(item => {
return {
id: item.idCiudad,
descripcionCi: item.Descripcion
};
});
});
},


// INICIO NUEVO 
ObtenerOrden_compraLote() {
ComprasLoteAPI.getAll().then(({ data }) => {
});
},

ObtenerCodigoOrden() {
// Verifica que se haya ingresado un número de orden
if (!this.formulario.numero_orden) {
// Puedes mostrar un mensaje de error o realizar la lógica que prefieras
return;
}

// Realiza una solicitud a tu API para obtener el detalle de la orden de compra
OrdenUrbApi.getById(this.formulario.numero_orden).then(({ data }) => {

this.formulario = {
...this.formulario,
fechaD: data.fecha,
itemsDetalle: data.detalle,
};
});

this.dialogoFormulario = true;
},


formatearFecha(fecha) {
return dayjs(fecha).format('DD/MM/YYYY');
},
showDatePicker() {
this.showDatepicker = true;
},
hideDatePicker() {
this.showDatepicker = false;
},

abrirDialogo() {
// Abrir el modal y cargar el código aquí
this.dialogoFormulario = true;
this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario));
this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario));

},
generarCodigo() {
const nuevoCodigo = this.contador++;
return nuevoCodigo;
},

guardarFormulario() {
if (!this.formulario.numero_factura) {

this.emptyFieldError = true;
return;
}


ComprasLoteAPI.create({
idcompras_lote: this.formulario.codigo,
fecha_doc: this.formulario.fechaD,
timbrado: this.formulario.timbrado,
numero_factura: this.formulario.numero_factura,
idTipo_Documento: this.formulario.documento,
idProveedor: this.formulario.proveedor,
idorde_compra_lote: this.formulario.numero_orden, //nuevo 
idCaja: this.formulario.caja,
Detalle: this.formulario.itemsDetalle
}
).then(() => {
this.ObtenerComprasLote();
});

this.formulario.codigo = '';
this.formulario.fechaD = '';
this.formulario.timbrado = '';
this.formulario.numero_factura = '';
this.formulario.documento = '';
this.formulario.caja = '';
this.formulario.proveedor = '';
this.dialogoFormulario = false;
},


confirmarCambiarEstado(elemento) {
// Abre el diálogo de confirmación y guarda el elemento a cambiar de estado
this.elementoACambiarEstado = elemento;
this.dialogoCambiarEstado = true;
},
cancelarCambiarEstado() {
// Cierra el diálogo de confirmación y restablece la variable
this.dialogoCambiarEstado = false;
this.elementoACambiarEstado = null;
},
cambiarEstadoCompra() {
if (this.elementoACambiarEstado) {
// Realiza la actualización aquí para cambiar el estado
ComprasLoteAPI.update(this.elementoACambiarEstado.id, { estado_compras: true }
).then(() => {
// Actualiza la tabla después de que la actualización se haya completado
this.items = [];
this.ObtenerComprasLote();

});


// Cierra el diálogo de confirmación
this.dialogoCambiarEstado = false;
this.elementoACambiarEstado = null;




}

},

ObtenerComprasLote() {
ComprasLoteAPI.getAll().then(({ data }) => {
this.items = data.map(item => {
return {
id: item.idCompras,
proveedor: item.idProveedor,
numero_factura: item.Numero_fact,
documento: item.idTipo_Documento,
caja: item.idCaja,
proveedor: item.idProveedor,
timbrado: item.Timbrado,
fechaD: item.Fecha_doc,
detalleItems: item.detalle
};
});
});
},
recalcularTotal() {
// Verifica que haya valores en cantidad y precio
if (this.formulario.cantidad && this.formulario.costo) {
// Calcula el total dinámicamente
this.formulario.total = this.formulario.cantidad * this.formulario.costo;

}

},


editarDetalle(parametro) {
this.dialogoFormularioEditarDetalle = true;
this.formulario.producto = parametro.idProducto;
this.formulario.cantidad = parametro.cantidad_lote;
this.formulario.costo = parametro.costo_lote;
this.formulario.ciudad = parametro.idCiudad;
this.formulario.barrio = parametro.idBarrio;



// Calcula el total al abrir el diálogo
this.formulario.total = this.formulario.cantidad * this.formulario.costo;
this.formulario.iva = parametro.idIva;
o;



},
guardarFormularioEditarDetalle() {
if (!this.formulario.producto || !this.formulario.cantidad || !this.formulario.costo) {
this.emptyFieldError = true;
return;
}

// Busca el índice del elemento que se va a editar
const index = this.formulario.itemsDetalle.findIndex(item => item.idProducto === this.formulario.producto);
console.log(index);
console.log(this.formulario.itemsDetalle);
if (index !== -1) {
// Si se encontró el elemento, actualiza sus datos
this.formulario.itemsDetalle[index].Cantidad = this.formulario.cantidad;
this.formulario.itemsDetalle[index].Costo = this.formulario.costo;
//Quiero enviar el id de Ciudad y no su nombre  
this.formulario.itemsDetalle[index].ciudad = this.formulario.ciudad;
this.formulario.itemsDetalle[index].barrio = this.formulario.barrio;
this.formulario.itemsDetalle[index].ubicacion = this.formulario.ubicacion;
this.formulario.itemsDetalle[index].dimensionTotal = this.formulario.dimensionTotal;
this.formulario.itemsDetalle[index].nombreLoteado = this.formulario.nombreLoteado;
this.formulario.itemsDetalle[index].total = this.formulario.cantidad * this.formulario.costo;
this.formulario.itemsDetalle[index].iva = this.formulario.iva;

switch (this.formulario.iva) {
case 1:
this.formulario.itemsDetalle[index].exenta = 0;
this.formulario.itemsDetalle[index].iva5 = 0;
this.formulario.itemsDetalle[index].iva10 = 0;
break;
case 2:
this.formulario.itemsDetalle[index].exenta = 0;
this.formulario.itemsDetalle[index].iva5 = Math.round(this.formulario.itemsDetalle[index].total / 21);
this.formulario.itemsDetalle[index].iva10 = 0;
break;
case 3:
this.formulario.itemsDetalle[index].exenta = 0;
this.formulario.itemsDetalle[index].iva5 = 0;
this.formulario.itemsDetalle[index].iva10 = Math.round(this.formulario.itemsDetalle[index].total / 11);
break;
default:
// Manejar otro caso si es necesario
break;
}
} else {
// Si no se encontró el elemento, agrega uno nuevo
const nuevoItem = {};
this.formulario.itemsDetalle.push(nuevoItem);
}

this.dialogoFormularioEditarDetalle = false;
},

//     sumarColumna(columna) {
//   return this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0);
// },
sumarIva(columna) {
// Verifica que this.formulario.itemsDetalle tenga un valor
if (this.formulario.itemsDetalle) {
// Redondea cada valor de IVA antes de sumarlos
return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
} else {
return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
}
},

sumarTotal(columna) {
// Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
if (this.formulario.itemsDetalle && Array.isArray(this.formulario.itemsDetalle)) {
// Redondea cada valor de la columna antes de sumarlos
return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
} else {
return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
}
},

abrirformulariogenerarcuentas() {
// Abrir el modal y cargar el código aquí
this.dialogoFormularioGenerarCuota = true;
this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario));
this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario));
},

AgregarDetallePago() {
this.itemsDetalle.push({
fecha: this.formulario.fechaD,
monto: this.formulario.monto,
action: '',
}),
this.formulario.fechaD = '';
this.formulario.monto = '';
},

editarDetallePagos(parametro) {
this.dialogoFormularioEditarDetallePagos = true;
this.formulario.fechaD = parametro.fechaD;
this.formulario.monto = parametro.monto;

// Calcula el total al abrir el diálogo
this.formulario.total = this.formulario.cantidad * this.formulario.precio;
this.formulario.iva = parametro.idIva;


},

guardarFormularioEditarDetallePago() {
if (!this.detalle.fechaD || !this.formulario.monto) {
this.emptyFieldError = true;
return;
}

// Busca el índice del elemento que se va a editar
const index = this.itemsDetalle.findIndex(item => item.monto === this.formulario.monto);

if (index !== -1) {
// Si se encontró el elemento, actualiza sus datos
this.itemsDetalle[index].fechaD = this.formulario.fechaD;
this.itemsDetalle[index].monto = this.formulario.monto;
}
this.dialogoFormularioEditarDetallePagos = false;
},
},


created() {
// Generar automáticamente el código al cargar el componente
this.formulario.codigo = this.generarCodigo();
this.ObtenerComprasLote();
this.ObtenerProveedor();
this.ObtenerTipoD();
this.ObtenerProducto();
this.ObtenerOrden_compraLote();
this.ObtenerIva();
this.ObtenerCaja();
this.ObtenerBarrio();
this.ObtenerCiudades();

},
});
