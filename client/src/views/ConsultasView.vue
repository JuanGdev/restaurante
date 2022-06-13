<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items ="consultas"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Búsquedas</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: 'Consultas',
        data() {
            return {
                headers: [
                    {
                        text: 'Identificador',
                        aling: 'start',
                        sortable: false,
                        value: 'ord_id'
                    },
                    { texto: 'Mesero', value: 'ord_mes_id'},
                    { texto: 'Ordenes', value: 'Ordenes'},
                    { texto: 'Total de Venta', value: 'total_venta'},
                    { texto: 'Fecha', value: 'Fecha'}
                ],

                consultas: [
                   /*
                    {
                        mesero: '',
                        mesa: '',
                        ordenes: '',
                        total_venta: '',
                        fecha: '',
                        total_ordenes: '',
                        total_ventas: ''
                    }
                    */
                ],
                nl_dialog: false,

                /*
                nuevo_usuario: {
                    usu_nombre: '',
                    usu_ap_pat: '',
                    usu_ap_mat: '',
                    usu_correo: ''
                }
                */
            }
        },

        created(){
        this.llenar_consultas();
        },

        methods: {
            async llenar_consultas(){
                const api_data = await this.axios.get('consultas/consulta1');
                this.consultas = api_data.data;
            }
        }
    }
</script>
