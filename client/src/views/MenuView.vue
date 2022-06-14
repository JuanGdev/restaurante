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
      <v-btn color="success" @click="guardar_mesero()">Agregar</v-btn>
      </template>
      </v-data-table>
  </v-container> 

<v-container cols = "3">
  <v-data-table
    :headers="headers_ordenes" 
    :items="ordenes"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Nueva orden</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
  </v-data-table>
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
        ordenes: [],
        nl_dialog: false,

        nueva_orden:{
          ord_mesa_id: '',
          ord_mes_id: '',
          ord_estado: '',
          ord_fecha: '',
          ord_productos: '',
          ord_tot: ''
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
        //wait espera a que recupere los datos
        //la funcion debe ser asincrona
        this.productos = api_data.data;
      },
            async llenar_ordenes(){
              const api_data = await this.axios.get('ordenes/todas_las_ordenes');
              this.ordenes = api_data.data;
            },
              async guardar_producto(){
        await this.axios.post('productos/nuevo_producto', this.nuevo_producto);
        this.llenar_productos();
        this.cancelar();
      }
    }
    }
</script>