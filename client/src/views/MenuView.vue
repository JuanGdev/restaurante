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

      <v-data-table
        :headers="headers_ordenid" 
        :items="ordenid"
        :items-per-page="1"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Numero de Orden</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{item}">
          <v-btn color="success" @click="llenar_cuenta(item)">Tomar Orden</v-btn>
        </template>
      </v-data-table>
      <v-data-table
          :headers="headers_cuenta" 
          :items="cuenta"
          hide-default-footer
          class="elevation-0"
      >
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
        headers_ordenid:[
          {
            text: '',
            align: 'start',
            sortable: false,
            value: 'OrdenId',
          },
          {text: '', align: 'end', value: 'actions', sortable:false}
        ],
        headers_cuenta: [
          {
              text: 'Nombre del Producto',
              align: 'start',
              sortable: false,
              value: 'Nombre',
          },
          {text: 'Descripcion', value: 'Descripcion', sortable: false},
          {text: 'Tipo de producto', value: 'Tipo', sortable: false},
          {text: 'Categoria', value: 'Categoria', sortable: false},
          {text: 'Comentario', value: 'Comentario', sortable: false},
          {text: 'Costo', value: 'Costo', sortable: false}
        ],

        productos: [],
        ordenid: [],
        cuenta: [],

        producto_dialog: false,

        consulta:{
            ord_id: ''
        },

        detalles:{
          det_pro_id: '',
          det_ord_id: '',
          det_comentario: ''
        }
      }
    },
    created(){
      this.llenar_productos();
      this.llenar_ordenid();
      this.llenar_cuenta();
    },
    methods:{ //instrucciones
      
      async llenar_productos(){
        const api_data = await this.axios.get('productos/todos_los_productos');
        this.productos = api_data.data;
      },

      async llenar_ordenid(){
        const api_data = await this.axios.get('ordenes/max_orden');
        this.ordenid = api_data.data;
      },
      
      async guardar(){
        await this.axios.post('detalles/agregar_detalles', this.detalles);
        this.cancelar();
      },
        
      cancelar(){
        this.detalles = {};
        this.producto_dialog = false;
      },

      async llenar_cuenta(item){
        console.log(item.OrdenId);
          const api_data = await this.axios.get('detalles/detalles_de_una_orden/'+item.OrdenId.toString());
          this.cuenta = api_data.data;
      },
    }
  }
</script>