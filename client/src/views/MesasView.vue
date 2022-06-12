<template>
    <span>
        mesas
    </span>
</template>

<script>
    export default {
        name: 'mesas',
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
