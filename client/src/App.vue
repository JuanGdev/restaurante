<template>
  <v-app>
    <v-main>
      <v-row>
        <v-container col>
          <v-navigation-drawer permanent>
            <v-container>
              <v-card flat>
                <v-card-title>
                  <v-icon large color="cof" left>
                    fas fa-hat-cowboy-side
                  </v-icon>
                  <span class="yellow--text"> LA PATRONA </span>
                </v-card-title>
                <v-card-text>
                  <v-list shaped>
                    <v-list-item-group v-model="selectedItem" color="orange">
                      <v-list-item to="/">
                        <v-list-item-icon>
                          <v-icon small> fas fa-utensils </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title> Mesas </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item to="/ordenes">
                        <v-list-item-icon>
                          <v-icon small> fas fa-clipboard </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title> Ordenes </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item to="/administracion">
                        <v-list-item-icon>
                          <v-icon small> fas fa-cogs </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title> Admin </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item to="consultas">
                        <v-list-item-action>
                          <v-icon small> fas fa-search </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title> Consultas </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-img src="@/assets/menu.png"> </v-img>
                </v-card-text>
              </v-card>
            </v-container>
          </v-navigation-drawer>
        </v-container>
        <v-container cols="12">
          <router-view />
        </v-container>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    selectedItem: null,
  }),
};
</script>
