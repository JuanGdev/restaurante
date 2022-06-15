<template>
  <v-container>
    <v-container>
      <v-data-table
        :headers="headers_mesa"
        :items="mesas"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Mesas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="orange" dark @click="mesa_dialog = true"
              >Nueva mesa</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="eliminar_mesa(item)" small> fas fa-trash-alt </v-icon>
        </template>
        <template v-slot:[`item.mesa_estatus`]="{ item }">
          <v-chip :color="getColor(item.mesa_estatus)" dark>
            {{ item.mesa_estatus }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>

    <v-container>
      <v-data-table
        :headers="headers_mesero"
        :items="meseros"
        :items-per-page="5"
        class="elevation-7"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Meseros</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="yellow" dark @click="mes_dialog = true"
              >Nuevo mesero</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="eliminar_mesero(item)" small>
            fas fa-trash-alt
          </v-icon>
        </template>
      </v-data-table>
    </v-container>

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
            <v-btn color="teal" dark @click="pro_dialog = true"
              >Nuevo producto</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="eliminar_producto(item)" small>
            fas fa-trash-alt
          </v-icon>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="mesa_dialog" max-width="500px">
      <v-card>
        <v-card-title class="orange_l white--text"> Nueva mesa </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="'6">
                <v-text-field
                  v-model="nueva_mesa.mesa_capacidad"
                  label="Capacidad"
                >
                </v-text-field>
              </v-col>
              <v-col cols="'6">
                <v-text-field
                  v-model="nueva_mesa.mesa_estatus"
                  label="Estatus (Libre/Ocupada)"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardar_mesa()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="mes_dialog" max-width="500px">
      <v-card>
        <v-card-title class="yellow_l white--text"> Nuevo mesero </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="'6">
                <v-text-field v-model="nuevo_mesero.mes_nombre" label="Nombre">
                </v-text-field>
              </v-col>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_mesero.mes_ap_pat"
                  label="Apellido paterno"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_mesero.mes_ap_mat"
                  label="Apellido materno"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardar_mesero()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pro_dialog" max-width="500px">
      <v-card>
        <v-card-title class="teal_l white--text"> Nuevo producto </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_producto.pro_nombre"
                  label="Nombre"
                >
                </v-text-field>
              </v-col>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_producto.pro_desc"
                  label="Descripción"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="'6">
                <v-text-field v-model="nuevo_producto.pro_costo" label="Costo">
                </v-text-field>
              </v-col>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_producto.pro_cob"
                  label="comida/bebida"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="'6">
                <v-text-field
                  v-model="nuevo_producto.pro_categoria"
                  label="Categoría (garnacha, caldo, carne, agua, licor, refresco)"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardar_producto()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Administracion",
  data() {
    //almacena temporalmente las variables
    return {
      headers_mesa: [
        {
          text: "Número de mesa",
          class: "orange_l white--text",
          align: "start",
          sortable: false,
          value: "mesa_id",
        },
        {
          text: "Capacidad",
          value: "mesa_capacidad",
          class: "orange_l white--text",
        },
        {
          text: "Estatus",
          value: "mesa_estatus",
          class: "orange_l white--text",
        },
        { text: "Acciones", value: "actions", class: "orange_l white--text" },
      ],
      headers_mesero: [
        {
          text: "Identificador",
          class: "yellow_l white--text",
          align: "start",
          sortable: false,
          value: "mes_id",
        },
        { text: "Nombre", value: "mes_nombre", class: "yellow_l white--text" },
        {
          text: "Apellido paterno",
          value: "mes_ap_pat",
          class: "yellow_l white--text",
        },
        {
          text: "Apellido materno",
          value: "mes_ap_mat",
          class: "yellow_l white--text",
        },
        { text: "Acciones", value: "actions", class: "yellow_l white--text" },
      ],
      headers_producto: [
        {
          text: "Identificador",
          class: "teal_l white--text",
          align: "start",
          sortable: false,
          value: "pro_id",
        },
        { text: "Nombre", value: "pro_nombre", class: "teal_l white--text" },
        { text: "Descripción", value: "pro_desc", class: "teal_l white--text" },
        { text: "Costo", value: "pro_costo", class: "teal_l white--text" },
        {
          text: "Comida/Bebida",
          value: "pro_cob",
          class: "teal_l white--text",
        },
        {
          text: "Categoría",
          value: "pro_categoria",
          class: "teal_l white--text",
        },
        { text: "Acciones", value: "actions", class: "teal_l white--text" },
      ],
      mesas: [],
      meseros: [],
      productos: [],

      mesa_dialog: false,
      mes_dialog: false,
      pro_dialog: false,

      nueva_mesa: {
        mesa_capacidad: "",
        mesa_estatus: "",
      },

      nuevo_mesero: {
        mes_nombre: "",
        mes_ap_pat: "",
        mes_ap_mat: "",
      },

      nuevo_producto: {
        pro_nombre: "",
        pro_desc: "",
        pro_costo: "",
        pro_cob: "",
        pro_categoria: "",
      },
    };
  },
  created() {
    this.llenar_mesas();
    this.llenar_meseros();
    this.llenar_productos();
  },
  methods: {
    //instrucciones
    //--------------------Tabla mesa------------------------
    async llenar_mesas() {
      const api_data = await this.axios.get("mesas/todas_las_mesas");
      //wait espera a que recupere los datos
      //la funcion debe ser asincrona
      this.mesas = api_data.data;
    },
    async eliminar_mesa(item) {
      const body = {
        mesa_id: item.mesa_id,
      };
      await this.axios.delete("mesas/eliminar_mesa", { data: body });
      this.llenar_mesas();
    },

    cancelar() {
      //cierra el dialogo y lo cancela
      this.nueva_mesa = {};
      this.mesa_dialog = false;
      this.nuevo_mesero = {};
      this.mes_dialog = false;
      this.nuevo_producto = {};
      this.pro_dialog = false;
    },

    async guardar_mesa() {
      await this.axios.post("mesas/nueva_mesa", this.nueva_mesa);
      this.llenar_mesas();
      this.cancelar();
    },

    //---------------------Tabla mesero----------------------
    async llenar_meseros() {
      const api_data = await this.axios.get("meseros/todos_los_meseros");
      //wait espera a que recupere los datos
      //la funcion debe ser asincrona
      this.meseros = api_data.data;
    },
    async eliminar_mesero(item) {
      const body = {
        mes_id: item.mes_id,
      };
      await this.axios.delete("meseros/eliminar_mesero", { data: body });
      this.llenar_meseros();
    },

    async guardar_mesero() {
      await this.axios.post("meseros/nuevo_mesero", this.nuevo_mesero);
      this.llenar_meseros();
      this.cancelar();
    },

    //--------------------Tabla producto------------------------
    async llenar_productos() {
      const api_data = await this.axios.get("productos/todos_los_productos");
      //wait espera a que recupere los datos
      //la funcion debe ser asincrona
      this.productos = api_data.data;
    },
    async eliminar_producto(item) {
      const body = {
        pro_id: item.pro_id,
      };
      await this.axios.delete("productos/eliminar_producto", { data: body });
      this.llenar_productos();
    },

    async guardar_producto() {
      await this.axios.post("productos/nuevo_producto", this.nuevo_producto);
      this.llenar_productos();
      this.cancelar();
    },
    //--------------------Colores------------------------
    getColor(mesa_estatus) {
      if (mesa_estatus == "Libre") return "green";
      else if (mesa_estatus == "Ocupada") return "error";
    },
  },
};
</script>
