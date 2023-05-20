export default {
    data() {
        return {
            OFFER: this.$store.state.globalConstants.ACCESS.OFFER,
            OFFER_CREATE: this.$store.state.globalConstants.ACCESS.OFFER_CREATE,
            OFFER_EDIT: this.$store.state.globalConstants.ACCESS.OFFER_EDIT,
            OFFENSE: this.$store.state.globalConstants.ACCESS.OFFENSE,
            OFFENSE_CREATE: this.$store.state.globalConstants.ACCESS.OFFENSE_CREATE,
            OFFENSE_EDIT: this.$store.state.globalConstants.ACCESS.OFFENSE_EDIT,
            OFFENSE_HAS: this.$store.state.globalConstants.ACCESS.OFFENSE_HAS,
        }
    },
    computed: {
        accesses() {
            return this.$store.getters['authentication/accesses'];
        },
        login() {
            return this.$store.getters['authentication/login'];
        }
    },
    methods: {
        access(access) {
            return this.accesses.includes(access) ? true : false;
        }
    }
}