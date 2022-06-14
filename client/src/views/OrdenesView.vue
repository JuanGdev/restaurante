<template>
    <v-container>
        <v-container>
            <v-data-table
            :headers="headers_ordenes" 
            :items="ordenes"
            :items-per-page="10"
            class="elevation-7"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Ordenes</v-toolbar-title>
                        <v-spacer></v-spacer>
                            <v-btn class="orange_l white--text" to="/" >Nueva Orden </v-btn>
                    </v-toolbar>
                </template>

                <template v-slot:[`item.actions`]="{item}">
                    
                    <v-icon class="mr-2" @click="detalles_dialog=true" medium>
                        fa-solid fa-receipt
                    </v-icon>

                    <v-btn icon :to="{ name: 'menu'}">
                        <v-icon class="mr-2" medium>fa-solid fa-pencil-alt</v-icon>
                    </v-btn>
                    
                    <v-icon class="mr-2" @click="eliminar_orden(item)" medium>
                        fa-solid fa-trash-alt
                    </v-icon>

                </template>

                <template v-slot:[`item.ord_estado`]="{ item }">
                    <v-chip
                        :color="getColor(item.ord_estado)" dark
                        @click="openDialog(item)"
                    >
                        {{ item.ord_estado }}
                    </v-chip>
                </template>

            </v-data-table>
        </v-container>

        <v-dialog v-model="orden_dialog" max-width = "1000px">
            <v-card>
                <v-card-title class="fucsia_l white--text">
                    Cuenta
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <span> Orden: {{ datos_cuenta.ord_id }}</span>
                        <span> Mesa: {{ datos_cuenta.ord_mesa_id }}</span>
                        <span> Mesero: {{ datos_cuenta.ord_mes_id }}</span>
                        <span> Fecha: {{ datos_cuenta.ord_fecha }}</span>
                        <span> Total: {{ datos_cuenta.ord_total }}</span>
                        <v-container>
                            <v-data-table
                                :headers="headers_cuenta" 
                                :items="cuenta"
                                hide-default-footer
                                class="elevation-0"
                            >
                            </v-data-table>
                        </v-container>
                        
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
                    <v-btn color="success" @click="actualiza_estado()">Pagar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="detalles_dialog" max-width = "500px">
            <v-card>
                <v-card-title> Detalles </v-card-title>
                <v-card-text>
                    <v-container>
                    
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="error" @click="cancelar()">Cerrar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    export default {
        name: 'Ordenes',
        data() {
            return {
                headers_ordenes: [
                    {
                        text: 'Número de Orden', class:"orange_l white--text",
                        align: 'start',
                        sortable: false,
                        value: 'ord_id',
                    },
                    {text: 'Mesa', value: 'ord_mesa_id', class:"orange_l white--text"},
                    {text: 'Mesero', value: 'ord_mes_id', class:"orange_l white--text"},
                    {text: 'Fecha', value: 'ord_fecha', class:"orange_l white--text"},
                    {text: 'Total', value: 'ord_tot', class:"orange_l white--text"},
                    {text: 'Estatus', value: 'ord_estado', class:"orange_l white--text"},
                    {text: 'Acciones', value: 'actions', class:"orange_l white--text"}
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



                ordenes: [],
                cuenta: [],

                orden_dialog: false,
                detalles_dialog: false,

                datos_cuenta: {    
                    ord_id: '',
                    ord_mesa_id: '',
                    ord_mes_id: '',
                    ord_fecha: '',
                    ord_total: ''
                },

            }
        },
        created() {
            this.llenar_ordenes();
        },

        methods: {
            async llenar_ordenes(){
                const api_data = await this.axios.get('ordenes/todas_las_ordenes');
                this.ordenes = api_data.data;
            },

            async eliminar_orden(item){
                const body = {
                    ord_id: item.ord_id
                };
                await this.axios.delete('ordenes/eliminar_orden', {data:body});
                this.llenar_ordenes();
            },

            cancelar(){
                this.datos_cuenta={}
                this.orden_dialog=false;
                this.detalles_dialog=false;
            },

            async actualiza_estado(){
                await this.axios.put('ordenes/estadopagado', this.datos_cuenta);
                this.llenar_ordenes();
                this.cancelar();
            },

            /*async llenar_cuenta(){
                console.log('SI');
                const api_data = await this.axios.get('detalles/detalles_de_una_orden', this.datos_cuenta);
                console.log(this.datos_cuenta);
                api_data.data.forEach((item) => {
                    this.cuenta.push({
                        text: 'Descripcion', value: 'Descripcion',
                        text: 'Tipo de producto', value: 'Tipo',
                        text: 'Categoria', value: 'Categoria',
                        text: 'Comentario', value: 'Comentario',
                        text: 'Costo', value: 'Costo'
                    });
                });
            },*/

            async openDialog(item){
                this.orden_dialog=true,

                this.datos_cuenta.ord_id=item.ord_id,
                this.datos_cuenta.ord_mesa_id=item.ord_mesa_id,
                this.datos_cuenta.ord_mes_id=item.ord_mes_id,
                this.datos_cuenta.ord_fecha=item.ord_fecha,
                this.datos_cuenta.ord_total=item.ord_total,

                this.llenar_cuenta();
            },

            async llenar_cuenta(){
                const api_data = await this.axios.get('detalles/detalles_de_una_orden', this.datos_cuenta);
                this.cuenta = api_data.data;
            },

            verificaestado(item){
                if(item.ord_estado!="Pagada"){
                    orden_dialog=true;
                }
                else{
                    this.cancelar();
                }
            },

            getColor (ord_estado) {
                if (ord_estado=='Abierta') return 'green'
                else if (ord_estado=='Cerrada') return 'orange'
                else if (ord_estado=='Pagada') return 'error'
            }
        }
    }
</script>
