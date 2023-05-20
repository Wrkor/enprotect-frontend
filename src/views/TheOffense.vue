<template>
    <div class="main">
        <div class="title-2">
            <p>Список инцидентов <img src="@/assets/briefcase.svg" class="img-title" id="t-briefcase"></p>
            <div class="v-btn">
                <VBtnLink :btnLink="this.ROUTES_OFFENSE_CREATE"  class="btn-inc-link">Подать инцидент</VBtnLink>
                <VBtn @btn="btnReport" class="btn-inc">Отчет</VBtn>
            </div>
        </div>
        <div>
           <div v-if="offenses.length > 0" class="offenses" :class='{
                    "margin-1": offenses.length == 1 || offenses.length == 2,
                    "margin-2": offenses.length == 3 || offenses.length == 4,
            }'>
                <div v-for="offense in offenses" :key="offense.offenseid" class="offense">
                    <VOffense :offense="offense" :stateExtInfo="stateInfo"/>
                </div>
           </div>
           <div v-else>
                <p class="push">Инцидентов нет</p>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offenses: [],
            stateExtInfo: false,
        }
    },
    computed: {
        stateInfo() {
            return this.stateExtInfo;
        }
    },
    methods: {
        async fetchData() {
            await this.$store.dispatch('account/offensesData');
            const offenses =  this.$store.state.account.offensesData;
            
            if (offenses) {
                this.offenses = offenses;
            }           
        },
        changeWidth() {
            if (document.documentElement.clientWidth >= 1200)
                this.stateExtInfo = false;
            else
                this.stateExtInfo = true;
        },
        btnReport() {

        }
    },
    async created() {
        window.addEventListener('resize', this.changeWidth);
        this.changeWidth();
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

    .offenses {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .offense {
            margin-bottom: 30px;
        }
    }

    .btn-inc{
        margin-left: 20px;
        @include mq-s {
            margin-left: 8px;
            padding: 5px 22px;
        }
    }

    .push {
        margin-bottom: 550px; 
        margin-top: 30px;
    }
    .margin-1 {
        margin-bottom: 370px;
    }
    .margin-2 {
        margin-bottom: 120px;
    }
}
</style>