<template>
    <span>
        Esta vista es para poder tomar la orden (ver boceto)
        ELIMINAR ESTE ELEMENTO
    </span>
</template>

<script>
    export default {
        name: 'menu',
        data() {
            return {
                headers: [
                    {
                        text: '',
                        align: 'start',
                        sortable: false,
                        value: '',
                    },
                    { text: '', value: '' }
                ],

                mesas: [],

                created() {

                },

                methods: {
                    
                },
            }
        },
    }
</script>
