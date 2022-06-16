<template>
  <v-container>
    <v-container>
      <v-data-table
        :headers="headers1"
        :items="consultas1"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Ordenes por mesero y total de venta para una fecha
              específica</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers2"
        :items="consultas2"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Ordenes por mesa y total de venta para una fecha
              específica</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers3"
        :items="consultas3"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title
              >Total de Ordenes y Venta para una fecha
              especifica</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers4"
        :items="consultas4"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Total de venta por mes</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers5"
        :items="consultas5"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Total de venta por año</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers6"
        :items="consultas6"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Total de venta de carne por mes</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers7"
        :items="consultas7"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title>Total de venta de cerveza por dia</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
var tabla1 = [
  { text: "Mesero", value: "Mesero", class: "orange white--text" },
  { text: "Ordenes", value: "Ordenes", class: "orange white--text" },
  { text: "Total de Venta", value: "Total_Venta", class: "orange white--text" },
  { text: "Fecha", value: "Fecha", class: "orange white--text" },
];

var tabla2 = [
  { text: "Mesa", value: "Mesa", class: "yellow white--text" },
  { text: "Ordenes", value: "Ordenes", class: "yellow white--text" },
  { text: "Total de Venta", value: "Total_Venta", class: "yellow white--text" },
  { text: "Fecha", value: "Fecha", class: "yellow white--text" },
];

var tabla3 = [
  { text: "Total de Ventas", value: "Total_Venta", class: "teal white--text" },
  {
    text: "Total de Ordenes",
    value: "Total_Ordenes",
    class: "teal white--text",
  },
  { text: "Fecha", value: "Fecha", class: "teal white--text" },
];

var tabla4 = [
  { text: "Mes", value: "Mes", class: "fucsia white--text" },
  {
    text: "Total de Ventas",
    value: "Total_Venta",
    class: "fucsia white--text",
  },
];

var tabla5 = [
  { text: "Año", value: "Anio", class: "orange white--text" },
  {
    text: "Total de Ventas",
    value: "Total_Venta",
    class: "orange white--text",
  },
];

var tabla6 = [
  { text: "Mes", value: "Mes", class: "teal_l white--text" },
  { text: "Venta Total", value: "Venta_Total", class: "teal_l white--text" },
];

var tabla7 = [
  {
    text: "Tipo de Producto",
    value: "Tipo_Producto",
    class: "error white--text",
  },
  { text: "Dia", value: "Dia", class: "error white--text" },
  { text: "Venta Total", value: "Venta_Total", class: "error white--text" },
];

export default {
  name: "Consultas",
  data() {
    // Expone cada objeto para que este disponible en la vista y sea usado por el <template>
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
      consultas5: [],
      headers6: tabla6,
      consultas5: [],
      headers7: tabla7,
      consultas6: [],
    };
  },

  created() {
    //Funcion que se llama despues de que la vista es creada
    this.llenar_consultas();
  },

  methods: {
    async llenar_consultas() {
      const api_data1 = await this.axios.get("consultas/consultas1");
      const api_data2 = await this.axios.get("consultas/consultas2");
      const api_data3 = await this.axios.get("consultas/consultas3");
      const api_data4 = await this.axios.get("consultas/consultas4");
      const api_data5 = await this.axios.get("consultas/consultas5");
      const api_data6 = await this.axios.get("consultas/consultas6");
      const api_data7 = await this.axios.get("consultas/consultas7");
      this.consultas1 = api_data1.data;
      this.consultas2 = api_data2.data;
      this.consultas3 = api_data3.data;
      this.consultas4 = api_data4.data;
      this.consultas5 = api_data5.data;
      this.consultas6 = api_data6.data;
      this.consultas7 = api_data7.data;
    },
  },
};
</script>
