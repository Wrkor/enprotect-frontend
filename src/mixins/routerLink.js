export default {
    data() {
        return {
            ROUTES_MAIN: this.$store.state.globalConstants.routesLink.main,
            ROUTES_OFFER: this.$store.state.globalConstants.routesLink.offer,
            ROUTES_OFFER_POST: this.$store.state.globalConstants.routesLink.offer_post,
            ROUTES_OFFER_CREATE: this.$store.state.globalConstants.routesLink.offer_create,
            ROUTES_OFFENSE: this.$store.state.globalConstants.routesLink.offense,
            ROUTES_OFFENSE_POST: this.$store.state.globalConstants.routesLink.offense_post,
            ROUTES_OFFENSE_CREATE: this.$store.state.globalConstants.routesLink.offense_create,
            ROUTES_AUTH: this.$store.state.globalConstants.routesLink.auth,
            ROUTES_ACCOUNT: this.$store.state.globalConstants.routesLink.account,
            ROUTES_NOTICE: this.$store.state.globalConstants.routesLink.notice,
            ROUTES_ABOUT: this.$store.state.globalConstants.routesLink.about,
            ROUTES_NOT_FOUND: this.$store.state.globalConstants.routesLink.not_found,
        }
    },
}