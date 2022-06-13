<template>
  <v-container>
    <v-card max-width="200" height="700">
        <v-card-title>
          <v-icon left>
            fas fa-hat-cowboy-side
          </v-icon>
          <span>
            LA PATRONA
          </span>
        </v-card-title>
        <v-list nav>
          <v-list-item-group 
            v-model="selectedItem"
          >
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon small>
                  fas fa-utensils
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Mesas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/ordenes">
              <v-list-item-icon>
                <v-icon small>
                  fas fa-clipboard
                </v-icon>
              </v-list-item-icon>  
              <v-list-item-content>
                <v-list-item-title>
                  Ordenes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/administracion">
              <v-list-item-icon>
                <v-icon small>
                  fas fa-cogs
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Administración
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/consultas">
              <v-list-item-action>
                <v-icon small>
                  fas fa-search
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Consultas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-img 
          src="@/assets/menu.png"
        >
        </v-img>
      </v-card> 
  </v-container> 
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0
    })
  }
</script>