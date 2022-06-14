<template>
  <v-container>
    <v-data-table
      :headers="headers_mesa" 
      :items="mesas"
      :items-per-page="5"
      class="elevation-1"
    >

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Mesas</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
            <template v-slot:[`item.actions`]="{item}">
                <router-link :to="{name: 'menu'}">
                <v-btn color="purple" dark @click="mesa_dialog=true">Ocupar mesa
                </v-btn>
                </router-link>
            </template>    
    <template v-slot:[`item.mesa_estatus`]="{ item }">
      <v-chip
        :color="getColor(item.mesa_estatus)"
        dark
      >
        {{ item.mesa_estatus }}
      </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
    export default {
    name: 'Administracion',
    data(){ //almacena temporalmente las variables
      return{
        headers_mesa: [
          {
            text: 'Número de mesa',
            align: 'start',
            sortable: false,
            value: 'mesa_id',
          },
          { text: 'Capacidad', value: 'mesa_capacidad' },
          {text: 'Estatus', value: 'mesa_estatus'},
          {text: 'Acciones', value: 'actions'}
        ],
        
        mesas: [],
        mesa_dialog: false,
        mes_dialog: false,
        pro_dialog: false,
      }
    },
    created(){
      this.llenar_mesas();
    },
    methods:{ //instrucciones
      //--------------------Tabla mesa------------------------
      async llenar_mesas(){
        const api_data = await this.axios.get('mesas/todas_las_mesas');
        //wait espera a que recupere los datos
        //la funcion debe ser asincrona
        this.mesas = api_data.data;
      },


      cancelar(){
        //cierra el dialogo y lo cancela
        this.nueva_mesa={}
        this.mesa_dialog=false;

      },

    
      
      //---------------------Tabla mesero----------------------
      async llenar_meseros(){
        const api_data = await this.axios.get('meseros/todos_los_meseros');
        //wait espera a que recupere los datos
        //la funcion debe ser asincrona
        this.meseros = api_data.data;
      },
      async eliminar_mesero(item){
        const body = {
          mes_id: item.mes_id
        };
        await this.axios.delete('meseros/eliminar_mesero', {data:body});
        this.llenar_meseros();
      },

      async guardar_mesero(){
        await this.axios.post('meseros/nuevo_mesero', this.nuevo_mesero);
        this.llenar_meseros();
        this.cancelar();
      },
      //--------------------Colores------------------------
      getColor (mesa_estatus) {
        if (mesa_estatus=='Libre') return 'green'
        else if (mesa_estatus=='Ocupada') return 'fucsia'
      }
    }
  }
</script>
