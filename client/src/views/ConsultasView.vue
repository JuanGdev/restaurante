<template>
    <v-container>
        <v-data-table
            :headers="headers1"
            :items ="consultas1"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Consulta 1</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
        <v-data-table
            :headers="headers2"
            :items ="consultas2"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Consulta 2</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
        <v-data-table
            :headers="headers3"
            :items ="consultas3"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Consulta 3</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
        <v-data-table
            :headers="headers4"
            :items ="consultas4"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Consulta 4</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
        <v-data-table
            :headers="headers5"
            :items ="consultas5"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Consulta 5</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
 var tabla1 = 
        [
            { text: 'Mesero', value: 'Mesero'},
            { text: 'Ordenes', value: 'Ordenes'},
            { text: 'Total de Venta', value: 'Total_Venta'},
            { text: 'Fecha', value: 'Fecha'}
        ];

 var tabla2 = 
        [
            { text: 'Mesa', value: 'Mesa'},
            { text: 'Ordenes', value: 'Ordenes'},
            { text: 'Total de Venta', value: 'Total_Venta'},
            { text: 'Fecha', value: 'Fecha'}
        ];

 var tabla3 = 
        [
            { text: 'Total de Ventas', value: 'Total_Venta'},
            { text: 'Total de Ordenes', value: 'Total_Ordenes'},
            { text: 'Fecha', value: 'Fecha'}
        ];

 var tabla4 = 
        [
            { text: 'Mes', value: 'Mes'},
            { text: 'Total de Ventas', value: 'Total_Venta'}
        ];

 var tabla5 =
        [
            { text: 'Año', value: 'Anio'},
            { text: 'Total de Ventas', value: 'Total_Venta'}
        ];

    export default {
        name: 'Consultas',
        data() { // Expone cada objeto para que este disponible en la vista y sea usado por el <template>
            return {
                headers1: tabla1, // headers1 contine la especificacion de las columnas de la tabla1
                consultas1: [], // consulta1 se define aqui solo para que sea un objeto visible en la vista
                headers2: tabla2, 
                consultas2: [], 
                headers3: tabla3, 
                consultas3: [],
                headers4: tabla4, 
                consultas4: [],
                headers5: tabla5, 
                consultas5: []
            }
        },

        created(){ //Funcion que se llama despues de que la vista es creada
        this.llenar_consultas();
        },

        methods: {
            async llenar_consultas(){ 
                const api_data1 = await this.axios.get('consultas/consultas1');
                const api_data2 = await this.axios.get('consultas/consultas2');
                const api_data3 = await this.axios.get('consultas/consultas3');
                const api_data4 = await this.axios.get('consultas/consultas4');
                const api_data5 = await this.axios.get('consultas/consultas5');
                this.consultas1 = api_data1.data;
                this.consultas2 = api_data2.data;
                this.consultas3 = api_data3.data;
                this.consultas4 = api_data4.data;
                this.consultas5 = api_data5.data;
            }
        }
    }
</script>
