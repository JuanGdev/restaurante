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
            <v-btn class="orange_l white--text" to="/">Nueva Orden </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="openDetalle(item)" medium>
            fa-solid fa-receipt
          </v-icon>

          <v-icon class="mr-2" @click="openEdit(item)" medium>
            fa-solid fa-pencil-alt
          </v-icon>

          <v-icon class="mr-2" @click="eliminar_orden(item)" medium>
            fa-solid fa-trash-alt
          </v-icon>
        </template>

        <template v-slot:[`item.ord_estado`]="{ item }">
          <v-chip
            @click="openDialog(item)"
            :color="getColor(item.ord_estado)"
            dark
          >
            {{ item.ord_estado }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="orden_dialog" max-width="900px">
      <v-card>
        <v-card-title class="teal_l white--text"> Cuenta </v-card-title>
        <v-card-text>
          <v-container>
            <br />
            <v-row></v-row>
            <v-row>
              <label style="font-size: 150%">
                Orden: {{ datos_cuenta.ord_id }}
              </label>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                Fecha: {{ datos_cuenta.ord_fecha }}
              </label>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesa: {{ datos_cuenta.ord_mesa_id }}
              </label>
              <v-spacer></v-spacer>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesero: {{ datos_cuenta.ord_mes_id }}
              </label>
            </v-row>
            <br />
            <v-container>
              <v-data-table
                :headers="headers_cuenta"
                :items="cuenta"
                hide-default-footer
                class="elevation-0"
              >
              </v-data-table>
            </v-container>
            <br />
            <br />
            <v-row>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                {{ datos_cuenta.ord_total }}
              </label>
            </v-row>
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

    <v-dialog v-model="detalles_dialog" max-width="900px">
      <v-card>
        <v-card-title class="teal_l white--text"> Detalles </v-card-title>
        <v-card-text>
          <v-container>
            <br />
            <v-row></v-row>
            <v-row>
              <label style="font-size: 150%">
                Orden: {{ datos_cuenta.ord_id }}
              </label>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                Fecha: {{ datos_cuenta.ord_fecha }}
              </label>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesa: {{ datos_cuenta.ord_mesa_id }}
              </label>
              <v-spacer></v-spacer>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesero: {{ datos_cuenta.ord_mes_id }}
              </label>
            </v-row>
            <br />
            <v-container>
              <v-data-table
                :headers="headers_cuenta"
                :items="cuenta"
                hide-default-footer
                class="elevation-0"
              >
              </v-data-table>
            </v-container>
            <br />
            <br />
            <v-row>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                {{ datos_cuenta.ord_total }}
              </label>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelar()">Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="edit_dialog" max-width="900px">
      <v-card>
        <v-card-title class="teal_l white--text"> Editar </v-card-title>
        <v-card-text>
          <v-container>
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
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="success" @click="definirProducto(item)">Agregar</v-btn>
              </template>
            </v-data-table>
            
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
                  <v-btn color="error" @click="cancelarProd()">Cancelar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>



          </v-container>
          <v-container>
            <br />
            <v-row></v-row>
            <v-row>
              <label style="font-size: 150%">
                Orden: {{ datos_cuenta.ord_id }}
              </label>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                Fecha: {{ datos_cuenta.ord_fecha }}
              </label>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesa: {{ datos_cuenta.ord_mesa_id }}
              </label>
              <v-spacer></v-spacer>
            </v-row>
            <br />
            <v-row>
              <label style="font-size: 150%">
                Mesero: {{ datos_cuenta.ord_mes_id }}
              </label>
            </v-row>
            <br />
            <v-container>
              <v-data-table
                :headers="headers_cuenta"
                :items="cuenta"
                class="elevation-0"
              >
              </v-data-table>
            </v-container>
            <br />
            <br />
            <v-row>
              <v-spacer></v-spacer>
              <label style="font-size: 150%">
                {{ datos_cuenta.ord_total }}
              </label>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cierraOrden()">Cerrar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "Ordenes",
  data() {
    return {
      headers_ordenes: [
        {
          text: "Número de Orden",
          class: "orange_l white--text",
          align: "start",
          sortable: false,
          value: "ord_id",
        },
        { text: "Mesa", value: "ord_mesa_id", class: "orange_l white--text" },
        { text: "Mesero", value: "ord_mes_id", class: "orange_l white--text" },
        { text: "Fecha", value: "ord_fecha", class: "orange_l white--text" },
        //{ text: "Total", value: "ord_tot", class: "orange_l white--text" },
        { text: "Estatus", value: "ord_estado", class: "orange_l white--text" },
        { text: "Acciones", value: "actions", class: "orange_l white--text" },
      ],

      headers_cuenta: [
        {
          text: "Nombre del Producto",
          align: "start",
          sortable: false,
          value: "Nombre",
        },
        { text: "Descripcion", value: "Descripcion", sortable: false },
        { text: "Tipo de producto", value: "Tipo", sortable: false },
        { text: "Categoria", value: "Categoria", sortable: false },
        { text: "Comentario", value: "Comentario", sortable: false },
        { text: "Costo", value: "Costo", sortable: false },
      ],
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

      ordenes: [],
      cuenta: [],
      productos: [],

      orden_dialog: false,
      detalles_dialog: false,
      edit_dialog: false,
      producto_dialog: false,

      datos_cuenta: {
        ord_id: "",
        ord_mesa_id: "",
        ord_mes_id: "",
        ord_fecha: "",
        ord_total: "",
      },

      detalles: {
        det_pro_id: "",
        det_ord_id: "",
        det_comentario: "",
      }

    };
  },
  created() {
    this.llenar_ordenes();
  },

  methods: {
    async llenar_ordenes() {
      const api_data = await this.axios.get("ordenes/todas_las_ordenes");
      this.ordenes = api_data.data;
    },

    async eliminar_orden(item) {
      const body = {
        ord_id: item.ord_id,
      };
      await this.axios.delete("ordenes/eliminar_orden", { data: body });
      this.llenar_ordenes();
    },

    cancelar() {
      this.datos_cuenta = {};
      this.orden_dialog = false;
      this.detalles_dialog = false;
      this.edit_dialog =false;
    },

    cancelarProd() {
      this.detalles.det_comentario="";
      this.producto_dialog = false;
    },

    async guardar() {
      await this.axios.post("detalles/agregar_detalles", this.detalles);
      const api_data = await this.axios.get(
        "detalles/detalles_de_una_orden/" + this.detalles.det_ord_id.toString()
      );
      this.cuenta = api_data.data;
      this.cancelarProd();
    },

    async actualiza_estado() {

      await this.axios.put(
        "mesas/liberamesa/" + this.datos_cuenta.ord_mesa_id.toString()
      );
      await this.axios.put(
        "ordenes/estadopagado/" + this.datos_cuenta.ord_id.toString()
      );

      this.llenar_ordenes();
      this.cancelar();
    },

    async cierraOrden() {
      await this.axios.put(
        "ordenes/estadocerrado/" + this.datos_cuenta.ord_id.toString()
      );
      this.llenar_ordenes();
      this.cancelar();
    },

    async llenaDetalle(item) {
      const api_data = await this.axios.get(
        "detalles/total/" + item.ord_id.toString()
      );
      this.datos_cuenta.ord_total = api_data.data[0];
      this.datos_cuenta.ord_id = item.ord_id;
      this.datos_cuenta.ord_mesa_id = item.ord_mesa_id;
      this.datos_cuenta.ord_mes_id = item.ord_mes_id;
      this.datos_cuenta.ord_fecha = item.ord_fecha;
      this.llenar_cuenta();
    },

    openDetalle(item) {
      this.detalles_dialog = true;
      this.llenaDetalle(item);
    },

    openDialog(item) {
      if (item.ord_estado != "Pagada") {
        this.orden_dialog = true;
        this.llenaDetalle(item);
      }
    },

    async llenar_productos() {
      const api_data = await this.axios.get("productos/todos_los_productos");
      this.productos = api_data.data;
    },

    async llenar_cuenta() {
      this.detalles.det_ord_id = this.datos_cuenta.ord_id;
      const api_data = await this.axios.get(
        "detalles/detalles_de_una_orden/" + this.datos_cuenta.ord_id.toString()
      );
      this.cuenta = api_data.data;
    },

    async openEdit(item){
      if (item.ord_estado != "Pagada") {
        this.edit_dialog=true;
        this.llenar_productos();
        this.llenaDetalle(item);
      }
    },

    getColor(ord_estado) {
      if (ord_estado == "Abierta") return "green";
      else if (ord_estado == "Cerrada") return "orange";
      else if (ord_estado == "Pagada") return "error";
    },

    definirProducto(item) {
      this.detalles.det_pro_id = item.pro_id;
      this.producto_dialog = true;
    },
  },
};
</script>
