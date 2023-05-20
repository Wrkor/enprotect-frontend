<template>
    <div class="main">
        <div class="title">
            <p>Личный кабинет <img src="@/assets/user.svg" class="img-title" id="t-user"></p>
        </div>
        <VBlock class="form">
            <div class="top-form">
                <div class="top-left-form">
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <VInput :modelValue="user.sname" class="input v-input" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput :modelValue="user.name" class="input v-input" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput :modelValue="user.mname" class="input v-input" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="accImg" id="acc-photo-l" class="img-form">
                </swiper-slide>
            </div>

            <div class="middle-form">
                <DLabel class="labelField">Должность: </DLabel>
                <VTextarea :modelValue="user.jobTitle" class="textarea v-textarea" disabled/>
            </div>

            <div class="bottom-form">
                <DLabel class="labelField">Уведомления: </DLabel>
                <div>
                    <DCheckbox :modelValue="pushOffenseSMS" @clickLabel="checkboxPushOffenseSMS" class="checkbox"/>
                    <DLabel class="labelCheckbox" @click="checkboxPushOffenseSMS">Разрешить отправку инцидентов по SMS</DLabel>
                </div>
                <div>
                    <DCheckbox :modelValue="pushOffenseEmail" @clickLabel="checkboxPushOffenseEmail" class="checkbox"/>
                    <DLabel class="labelCheckbox" @click="checkboxPushOffenseEmail">Разрешить отправку инцидентов на Email</DLabel>
                </div>
                <div>
                    <DCheckbox :modelValue="pushOfferEmail" @clickLabel="checkboxPushOfferEmail" class="checkbox"/>
                    <DLabel class="labelCheckbox" @click="checkboxPushOfferEmail">Разрешить отправку предложений на Email</DLabel>
                </div>
            </div>

            <div class="btn">
                <span @click="btnLogout">Выйти </span>
                <img src="@/assets/close.svg" id="i-close">
            </div>
        </VBlock>
        <VBlock v-if="access(this.OFFENSE_HAS)" class="form">
            <h2 >Нарушения по охране труда:</h2>
            <div>
                <div v-if="offenses.length > 0">
                    <div v-for="offense in offenses" :key="offense.offenseid">
                        <VOffenseAccount :offense="offense" />
                    </div>
                </div>

                <div v-else>
                    <p class="push-form" >Нарушений нет</p>
                </div>
            </div>
        </VBlock>
        <div v-else style="margin-top: 80px;"></div>
    </div>
</template>

<script>
import { SwiperSlide } from 'swiper/vue';

export default {
    components: {
      SwiperSlide,
    },
    data() {
        return {
            pushOffenseSMS: false,
            pushOffenseEmail: false,
            pushOfferEmail: false,
            user: {},
            offenses: [],
            options: {"title": false,}
        };
    },
    computed: {
        accImg() {
            if (this.$store.state.account.userData)
                return "data:image/jpg;base64," + this.$store.state.account.userData.img;

            else
                return require("/src/assets/acc_base_140.jpg");
        },
    },
    methods: {
        checkboxPushOfferEmail() {
            this.pushOfferEmail = !this.pushOfferEmail;
            this.saveData();
        },
        checkboxPushOffenseEmail() {
            this.pushOffenseEmail = !this.pushOffenseEmail;
            this.saveData();
        },
        checkboxPushOffenseSMS() {
            this.pushOffenseSMS = !this.pushOffenseSMS;
            this.saveData();
        },
        btnLogout() {
            this.$store.dispatch('authentication/logout');
        },
        async fetchData() {
            if (!this.$store.state.account.userData)
                await this.$store.dispatch('account/accountData');

            const user =  this.$store.state.account.userData;
            
            if (user) {
                this.pushOfferEmail = user.push_offer_email;
                this.pushOffenseEmail = user.push_offense_email;
                this.pushOffenseSMS = user.push_offense_sms;
                this.user.name = user.name;
                this.user.mname = user.mname;
                this.user.sname = user.sname;
                this.user.img = "data:image/jpg;base64," + user.img;
                this.user.jobTitle = user.job;

                if (user.roleid && user.roleid === 1){
                    await this.$store.dispatch('account/offensesDataByEmployee');
                    this.offenses =  this.$store.state.account.offensesDataByEmployee;
                }
            }
            
        },
        async saveData() {
            const userSaveData = {
                push_offer_email: this.pushOfferEmail,
                push_offense_email: this.pushOffenseEmail,
                push_offense_sms: this.pushOffenseSMS,
            }
            await this.$store.dispatch('account/accountSaveData', userSaveData);
        }
    },
    async created() {
        await this.fetchData();
    },
}
</script>

<style lang="scss" scoped>
.main {
    width: 700px;
    display: flex;
    flex-direction: column;

    @include mq-sm {
        width:  400px;
    }

    @include mq-s {
        width:  280px;
    }

    .form {
        width: 700px;
        border-radius: $block-BorderRadius-m;
        margin-bottom: 30px;
        padding: 20px 30px;
        display: flex;
        flex-direction: column;

        @include mq-sm {
            width:  400px;
        }

        @include mq-s {
            width:  280px;
            padding: 20px 20px;
        }
    }

    .top-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        @include mq-sm {
            margin-bottom: 15px;
        }

        @include mq-s {
            flex-direction: column-reverse;
            margin-bottom: 20px;
        }

        .top-left-form {
            display: flex;
            flex-direction: column;
            align-content: flex-end;
            flex-wrap: wrap;
            width: 470px;
            margin-right: 30px;

            @include mq-sm {
                width:  360px;
                margin-right: 10px;
            }

            @include mq-s {
                width:  240px;
                margin-right: 0px;
            }

            > :nth-child(1), > :nth-child(2), > :nth-child(3) {
                margin-bottom: 10px;
                display: flex;
                align-content: center;
                justify-content: space-between;
                width: 350px;

                @include mq-sm {
                    width:  250px;
                    margin-bottom: 7px;
                }

                @include mq-s {
                    width:  240px;
                }

                .label {
                    display: flex;
                    align-self: center;
                }

                .input {
                    border-radius: $block-BorderRadius-s;
                    @include mq-sm {
                        width:  170px;
                    }
                }
            }

            :last-child {
                margin-bottom: 0px;
            }
        }
    }

    .middle-form {
        margin-bottom: 15px;

        @include mq-sm {
            margin-bottom: 10px;
        }
        .textarea {
            height: 60px;
            margin-top: 5px;
        }
    }

    .bottom-form {
        .labelField {
            margin-bottom: 10px;
        }
        > :nth-child(2), > :nth-child(3), > :nth-child(4) {
            margin-bottom: 10px;
            display: flex;
            
            &:hover {
                .labelCheckbox {
                    color: $active-Color;
                }
            }

            .labelCheckbox {
                transition: color $time-Animation $type-Animation;
                display: flex;
                align-self: center;
                flex-wrap: wrap;
                cursor: pointer;
                
            }
            .checkbox {
                transition: color $time-Animation $type-Animation;
                margin-right: 10px;
                cursor: pointer;
            }
            > :nth-child(2) {
                @include mq-s {
                    width: 190px;
                }
            }
        }
    }

    .btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        @include textLabelCard;

        @include mq-sm {
            @include textLabelCard-480;
        }
        @include mq-s {
            @include textLabelCard-320;
            margin-top: 5px;
        }
        
        cursor: pointer;
        
        span {
            transition: color $time-Animation $type-Animation;
            &:hover {
                color: $active-Color;
            }
        }

        img {
            transition: transform $time-Animation cubic-bezier(0.165, 0.84, 0.44, 1);
            @include mq-sm {
                width: 20px;
                height: 20px;
            }
            @include mq-s {
                width: 16px;
                height: 16px;
            }
        }

        &:hover img {
            transform: rotate(90deg);
        }
    }

    h2 {
        @include textLabelInput;
    }

    .push-form {
        @include textLabelInput;
        margin-top: 20px;

        @include mq-sm {
            @include textLabelInput-480;
        }
    }
}
</style>