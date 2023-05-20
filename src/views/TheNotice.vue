<template>
    <div class="main">
        <div class="title">
            <p>Уведомления <img src="@/assets/t-bell.svg" class="img-title" id="t-bell"></p>
        </div>
        <div>
           <div v-if="notice && notice.length > 0" :class='{
                    "margin-1": notice.length == 1,
                    "margin-2": notice.length == 2,
                    "margin-3": notice.length == 3,
            }'>
                <div v-for="notic in notice" :key="notic.pushid">
                    <VNotice :notice="notic"/>
                </div>
           </div>
           <div v-else>
                <p class="push">Уведомлений нет</p>
           </div>
        </div>
    </div>
</template>

<script>
import { userService } from '@/services';

export default {
    data() {
        return {
            notice: [],
        }
    },
    methods: {
        async fetchData() {
            if (this.$store.state.account.pushData) {
                const pushes =  this.$store.state.account.pushData;
                
                if (pushes) {
                    this.notice = pushes;
                }
                
                const pushidNotChecked = [];

                this.notice.forEach(element => {
                    if (!element.checked)
                    pushidNotChecked.push(element.pushid);
                });


                if (pushidNotChecked.length !== 0) {
                    await userService.pushChecked(pushidNotChecked);
                }
            }
            else {
                await this.$store.dispatch('account/pushData');
                await this.fetchData();
            }
        }
    },
    async created() {
        await this.fetchData();
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 730px;
    display: flex;
    flex-direction: column;
            
    @include mq-sm {
        width:  350px;
    }

    @include mq-s {
        width:  280px;
    }

    .push {
        margin-bottom: 550px;
    }
    
    .margin-1 {
        margin-bottom: 470px;
    }
    
    .margin-2 {
        margin-bottom: 300px;
    }
    
    .margin-3 {
        margin-bottom: 140px;
    }
}
</style>