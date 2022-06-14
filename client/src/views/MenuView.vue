<template>
  <v-row>
    <v-container cols="9">
      <v-data-table
        :headers="headers_producto" 
        :items="productos"
        :items-per-page="5"
        class="elevation-1"
      >
      <template v-slot:top>
        <v-toolbar flat>
        <v-toolbar-title>Productos</v-toolbar-title>
        <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{item}">
      <v-btn color="success" @click="producto_dialog=true">Agregar</v-btn>
      </template>
      </v-data-table>
          <v-dialog v-model="producto_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Detalle del producto
        </v-card-title>
        <v-card-text>
          <v-container>
              <input v-model="detalles.det_comentario" placeholder="Agrega alguna especificación para el producto"/>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success"  @click="guardar()">Añadir</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container> 
</v-row>
</template>


<script>
    export default {
    name: 'Menu',
    data(){ //almacena temporalmente las variables
      return{
        headers_producto: [
          {
            text: 'Identificador',
            align: 'start',
            sortable: false,
            value: 'pro_id',
          },
          {text: 'Nombre', value: 'pro_nombre' },
          {text: 'Descripción', value: 'pro_desc'},
          {text: 'Costo', value: 'pro_costo'},
          {text: 'Comida/Bebida', value: 'pro_cob'},
          {text: 'Categoría', value: 'pro_categoria'},
          {text: 'Acciones', value: 'actions', sortable:false}
        ],
        headers_ordenes:[
          {
            text: 'Número de orden',
            align: 'start',
            sortable: false,
            value: 'ord_id',
          },
          {text: 'Número de mesa', value: 'mesa_id'},
          {text: 'Mesero', value: 'mes_id'},
          {text: 'Estatus de la orden', value: 'ord_estado'},
          {text: 'Fecha', value: 'ord_fecha'},
          {text: 'Productos', value: 'ord_productos'},
          {text: 'Total', value: 'ord_tot'}
        ],
        productos: [],
        producto_dialog: false,

        detalles:{
          det_pro_id: '',
          det_ord_id: '',
          det_comentario: ''
        }
      }
    },
    created(){
      this.llenar_productos();
      this.llenar_ordenes();
    },
    methods:{ //instrucciones
            async llenar_productos(){
        const api_data = await this.axios.get('productos/todos_los_productos');
        this.productos = api_data.data;
      },
              async guardar(){
        // await this.axios.post('productos/nuevo_producto', this.nuevo_producto);
        // this.llenar_productos();
        this.cancelar();
      },
              cancelar(){
        this.detalles = {};
        this.producto_dialog = false;
      },
    }
    }
</script>