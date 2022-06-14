<template>
  <v-container>
    <v-data-table
      :headers="headers_mesa" 
      :items="mesas"
      :items-per-page="10"
      class="elevation-7"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mesas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{item}">
          <v-btn 
            small
            dark
            rounded
            color="teal_l"
            @click="definirMesa(item)"
          >
            Ocupar mesa
          </v-btn>
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
    <v-dialog v-model="mesa_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Asignar mesero
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
                <v-select
                :items="meseros"
                v-model="nueva_orden.ord_mes_id"
                label="Mesero">                    
                </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success"  @click="guardar()">Asignar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
    export default {
    name: 'Mesas',
    data(){ //almacena temporalmente las variables
      return{
        headers_mesa: [
          {
            text: 'Número de mesa',
            align: 'start',
            sortable: false,
            value: 'mesa_id',
            class:"teal white--text",
          },
          { text: 'Capacidad', value: 'mesa_capacidad', class:"teal white--text", },
          { text: 'Estatus', value: 'mesa_estatus', class:"teal white--text", },
          { text: 'Acciones', value: 'actions', class:"teal white--text", }
        ],
        mesas: [],
        meseros: [],

        mesa_dialog: false,
        nueva_orden: {
          ord_mesa_id: '',
          ord_mes_id: '',
          ord_estado: 'Abierta'
        }
      }
    },
    created(){
      this.llenar_mesas();
      this.llenar_meseros();
    },
    methods:{
      async llenar_mesas(){
        const api_data = await this.axios.get('mesas/todas_las_mesas');
        this.mesas = api_data.data;
      },
      async llenar_meseros(){
        const api_data = await this.axios.get('meseros/todos_los_meseros');
        api_data.data.forEach((item) => {
          this.meseros.push({
            text: item.mes_nombre + ' ' + item.mes_ap_pat + ' ' + item.mes_ap_pat,
            value: item.mes_id
          });
        });
      },
      cancelar(){
        this.nueva_orden = {};
        this.mesa_dialog = false;
      },
      definirMesa(item){
        if(item.mesa_estatus!="Ocupada"){
          this.mesa_dialog=true;
          this.nueva_orden.ord_mesa_id = item.mesa_id;
        }
        else{
          this.cancelar();
        }
      },

      async guardar(){
        console.log(this.nueva_orden);
        await this.axios.put('/mesas/estado_ocupada/'+this.nueva_orden.ord_mesa_id.toString());
        await this.axios.post('/ordenes/nueva_orden', this.nueva_orden);
        this.cancelar();
        window.location.assign("http://localhost:8080/menu");
      },
      //--------------------Colores------------------------
      getColor (mesa_estatus) {
        if (mesa_estatus=='Libre') return 'green'
        else if (mesa_estatus=='Ocupada') return 'fucsia'
      }
    }
  }
</script>
