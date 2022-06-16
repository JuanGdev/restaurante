<template>
  <v-container cols="9">
    <v-container>
      <v-data-table
        :headers="headers_producto"
        :items="productos"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Productos</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="orange white--text" small @click="definirProducto(item)">Agregar</v-btn>
        </template>
      </v-data-table>
    </v-container>
    <v-container class="elevation-7">
      <v-data-table
        :headers="headers_ordenid"
        :items="ordenid"
        :items-per-page="1"
        hide-default-footer
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Numero de Orden</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="success" small @click="llenar_cuenta(item)">Tomar Orden</v-btn>
          <v-btn color="error" small @click="cerrarOrden()">Cerrar Orden</v-btn>
        </template>
      </v-data-table>
      <v-data-table
        :headers="headers_cuenta"
        :items="cuenta"
        class="elevation-0"
      ></v-data-table>
    </v-container>
    <v-dialog v-model="producto_dialog" max-width="500px">
      <v-card>
        <v-card-title> Detalle del producto </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field 
              v-model="detalles.det_comentario"
              placeholder="Agrega alguna especificación para el producto"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardar()">Añadir</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Menu",
  data() {
    //almacena temporalmente las variables
    return {
      headers_producto: [
        {
          text: "Identificador",
          class: "orange_l white--text",
          align: "start",
          sortable: false,
          value: "pro_id",
        },
        { text: "Nombre", value: "pro_nombre", class: "orange_l white--text",sortable: false  },
        {
          text: "Descripción",
          value: "pro_desc",
          class: "orange_l white--text",sortable: false 
        },
        { text: "Costo", value: "pro_costo", class: "orange_l white--text", sortable: false  },
        {
          text: "Comida/Bebida",
          value: "pro_cob",
          class: "orange_l white--text",sortable: false 
        },
        {
          text: "Categoría",
          value: "pro_categoria",
          class: "orange_l white--text",sortable: false 
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          class: "orange_l white--text",sortable: false 
        },
      ],
      headers_ordenid: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "OrdenId",
        },
        { text: "", align: "end", value: "actions", sortable: false },
      ],
      headers_cuenta: [
        {
          text: "Nombre del Producto",
          align: "start",
          sortable: false,
          value: "Nombre",         
          class: "teal white--text",
        },
        { text: "Descripcion", value: "Descripcion", sortable: false, class: "teal white--text", },
        { text: "Tipo de producto", value: "Tipo", sortable: false, class: "teal white--text", },
        { text: "Categoria", value: "Categoria", sortable: false, class: "teal white--text", },
        { text: "Comentario", value: "Comentario", sortable: false, class: "teal white--text", },
        { text: "Costo", value: "Costo", sortable: false, class: "teal white--text", },
      ],

      productos: [],
      ordenid: [],
      cuenta: [],

      producto_dialog: false,

      consulta: {
        ord_id: "",
      },

      detalles: {
        det_pro_id: "",
        det_ord_id: "",
        det_comentario: "",
      },
    };
  },
  created() {
    this.llenar_productos();
    this.llenar_ordenid();
    this.llenar_cuenta();
  },
  methods: {
    //instrucciones

    async llenar_productos() {
      const api_data = await this.axios.get("productos/todos_los_productos");
      this.productos = api_data.data;
    },

    async llenar_ordenid() {
      const api_data = await this.axios.get("ordenes/max_orden");
      this.ordenid = api_data.data;
    },

    async llenar_cuenta(item) {
      this.detalles.det_ord_id = item.OrdenId;
      console.log(item.OrdenId);
      const api_data = await this.axios.get(
        "detalles/detalles_de_una_orden/" + this.detalles.det_ord_id.toString()
      );
      this.cuenta = api_data.data;
    },

    async guardar() {
      await this.axios.post("detalles/agregar_detalles", this.detalles);
      const api_data = await this.axios.get(
        "detalles/detalles_de_una_orden/" + this.detalles.det_ord_id.toString()
      );
      this.cuenta = api_data.data;
      this.cancelar();
    },

    async cerrarOrden() {
      await this.axios.put(
        "ordenes/estadocerrado/" + this.detalles.det_ord_id.toString()
      );
      window.location.assign("http://localhost:8081/ordenes");
    },

    cancelar() {
      this.detalles.det_comentario = "";
      this.producto_dialog = false;
    },

    definirProducto(item) {
      this.detalles.det_pro_id = item.pro_id;
      console.log(this.detalles);
      this.producto_dialog = true;
    },
  },
};
</script>
