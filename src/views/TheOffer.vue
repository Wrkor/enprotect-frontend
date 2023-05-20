<template>
    <div class="main">
        <div class="title-2" :class='{"btn-margin-0" : !access(this.OFFER_CREATE)}'>
            <p>Список предложений <img src="@/assets/clipboard.svg" class="img-title" id="t-clipboard"></p>
            <div>
                <VBtnLink v-show="access(this.OFFER_CREATE)" :btnLink="this.ROUTES_OFFER_CREATE">Подать предложение</VBtnLink>
            </div>
        </div>
        <div>
           <div v-if="offers.length > 0" class="offers" :class='{
                    "margin-1": offers.length <= 3,
                    "offer-last-row-2" : offers.length % 3 === 2 && documentWidth > 1199,
            }'>
                <div v-for="offer in offers" :key="offer.offerid" class="offer">
                    <VOffer :offer="offer"/>
                </div>
           </div>
           <div v-else>
                <p class="push">Предложений нет</p>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offers: [],
        }
    },
    computed: {
        documentWidth() {
            return document.documentElement.clientWidth;
        }
    },
    methods: {
        async fetchData() {
            await this.$store.dispatch('account/offersData');
            const offers =  this.$store.state.account.offersData;
            
            if (offers) {
                this.offers = offers;
            }           
        },
    },
    async created() {
        await this.fetchData();
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 1110px;
    display: flex;
    flex-direction: column;

    @include mq-l {
        width: 730px;
    }

    @include mq-sm {
        width: 350px;
    }

    @include mq-s {
        width: 280px;
    }

    .btn-margin-0 {
        @include mq-sm {
            height: 26px !important;
        }

        @include mq-s {
            height: 20px !important;
        }
    }

    .offers {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .offer {
            margin-bottom: 30px;
        }
    }

    .push {
        margin-bottom: 550px; 
        margin-top: 30px;
    }
    
    .margin-1 {
        margin-bottom: 250px;
    }

    .offer-last-row-2 .offer:last-child {
        margin-left: 30px;
        margin-right: auto;
    }
}
</style>