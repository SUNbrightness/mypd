
<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex';

    export default {
        name: '',
        computed: { ...mapGetters([
                'wlist',
                'wdata'
            ])
        },
        methods: {
            ...mapMutations([
                'setWdata',
                 'setWlist'
            ]),
        },
    };
</script>

<style>
</style>
