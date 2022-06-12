<template>
    <span>
        En esta vista podremos ver todas las ordenes 
        ELIMINAR ESTE ELEMENTO
    </span>
</template>

<script>
    export default {
        name: 'ordenes',
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
