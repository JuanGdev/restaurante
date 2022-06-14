import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        orange: '#FD9401',
        orange_l: '#FEC065',
        yellow: '#FFC404',
        yellow_l: '#FFD858',
        teal: '#008080',
        teal_l: '#68CAB7',
        cof: '#935116',
        green: '#2ECC71',
        fucsia_l: '#FD6E77',
        fucsia: '#F50656'

      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa',
  },
});
