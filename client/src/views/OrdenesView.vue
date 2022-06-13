<template>
    <v-container cols = 7>
        <v-data-table
        :headers="headers_ordenes" 
        :items="ordenes"
        :items-per-page="10"
        class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Ordenes</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{item}">
                
                <router-link :to="{name: 'menu'}">
                    <v-btn color="blue" dark>
                        Detalles
                    </v-btn>
                </router-link>
                <v-icon @click="editar_orden(item)" small>
                    fa-solid fa-pencil-alt
                </v-icon>

                <v-icon @click="eliminar_orden(item)" small>
                    fa-solid fa-trash-alt
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: 'Ordenes',
        data() {
            return {
                headers_ordenes: [
                    {
                        text: 'Número de Orden',
                        align: 'start',
                        sortable: false,
                        value: 'ord_id',
                    },
                    {text: 'Mesa', value: 'ord_mesa_id' },
                    {text: 'Mesero', value: 'ord_mes_id'},
                    {text: 'Fecha', value: 'ord_fecha'},
                    {text: 'Total', value: 'ord_tot'},
                    {text: 'Estatus', value: 'ord_estado'},
                    {text: 'Acciones', value: 'actions'}
                ],

                ordenes: [],
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
            }


        }
    }
</script>
