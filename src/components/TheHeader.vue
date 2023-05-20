<template>
    <header>
        <div>
            <div class="left-menu">
                <router-link :to="this.ROUTES_MAIN"><img src="@/assets/En_Logo.svg" id="en-logo"></router-link>
                <router-link v-show="access(this.OFFER)" :to="this.ROUTES_OFFER"><span  :class='{"active-text": this.$route.path == this.ROUTES_OFFER}'>Предложения</span></router-link>
                <router-link v-show="access(this.OFFENSE)" :to="this.ROUTES_OFFENSE"><span :class='{"active-text": this.$route.path == this.ROUTES_OFFENSE}'>Нарушения</span></router-link>
            </div>

            <div class="right-menu">
                <router-link v-show="login" :to="this.ROUTES_NOTICE"><img :src="bellSvg" id="i-bell" :class='{"active-icon": this.$route.path == this.ROUTES_NOTICE}'></router-link>
                <router-link v-if="login" :to="this.ROUTES_ACCOUNT">
                    <div>
                        <span :class='{"active-text": this.$route.path == this.ROUTES_ACCOUNT}'>{{ fullName }}</span>
                        <swiper-slide class="swiper-acc">
                            <img :src="accImg" id="acc-photo">
                        </swiper-slide>
                    </div>
                </router-link>
                <router-link v-else :to="this.ROUTES_ACCOUNT">
                    <div>
                        <span></span>
                        <swiper-slide class="swiper-acc">
                            <img :src="accImg" id="acc-photo">
                        </swiper-slide>
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import { SwiperSlide } from 'swiper/vue';
export default {
    components: {
      SwiperSlide,
    },
    computed: {
        fullName() {
            if (this.$store.state.account.userData)
                return `${this.$store.state.account.userData.sname}  ${this.$store.state.account.userData.name[0]}. ${this.$store.state.account.userData.mname[0]}.`;

            else
                return "";
        },
        accImg() {
            if (this.$store.state.account.userData)
                return "data:image/jpg;base64," + this.$store.state.account.userData.img;

            else
                return require("/src/assets/acc_base_140.jpg");
        },
        bellSvg() {
            const notice = this.$store.state.account.pushData;
            let checked = null;

            if (notice) {
                notice.forEach(el => {
                    if (!el.checked) {
                        checked = true;
                    }
                });
            }

            if (checked)
                return require("/src/assets/bell_active.svg");
            else
                return require("/src/assets/bell.svg");
        }
    },
    methods: {
        async fetchData() {
            if (!this.$store.state.account.userData && this.$store.state.authentication.user) {
                await this.$store.dispatch('account/accountData');
            }            
        },
    },
    async created() {
        await this.fetchData();
    },
}
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        width: 100%;
        background-color: $bgPage-Color;
        border-bottom: $strokePage-Color 1px solid;
        > div {
            display: flex;
            width: $block-Width-l;
            align-items: center;
            justify-content: space-between;
            margin: 15px 0px;

            @include mq-l {
                width: $block-Width-m;
            }

            @include mq-sm {
                width: $block-Width-s;
            }

            @include mq-s {
                width: $block-Width-xs;
            }

            span {
                @include textHeader;

                @include mq-sm {
                    @include textHeader-480;
                }
                @include mq-s {
                    @include textHeader-320;
                }
                &:hover {
                    color: $active-Color;
                } 
            }

            .left-menu {
                display: flex;
                align-items: center;
                
                a {
                    margin-right: 30px;
                    @include mq-sm {
                        margin-right: 10px;
                    }

                    @include mq-s {
                        &:first-child {
                            margin-right: 5px;
                        }
                    }

                    &:last-child {
                        margin-right: 0px;
                    }
                }           
            }

            .right-menu {
                display: flex;
                align-items: center;
                div {
                    display: flex;
                    align-items: center;
                    > span {
                        color: $textHeaderAcc-Color;
                        &:hover {
                            color: $active-Color;
                        }
                        @include mq-sm {
                            display: none;
                        }
                    }
                }

                a {
                    margin-left: 18px;
                    @include mq-sm {
                        margin-left: 0px;
                    }
                }
                .swiper-acc {
                    margin-left: 18px;
                    width: 48px;
                    height: 48px;
                    @include mq-sm {
                        margin-left: 0px;
                        width: 34px;
                        height: 34px;
                    }
                    img {
                        border-radius: 100%;
                    }
                }
            }
        }
    }

    #i-bell {
        width: 40px;
        height: 42px; 
        transition: transform $time-Animation cubic-bezier(0.165, 0.84, 0.44, 1);
        &:hover {
            transform: rotate(20deg);
        } 
        @include mq-sm {
            width: 34px;
            height: 34px;
        }
        &.active-icon {
            transform: rotate(20deg);
        }
    }

    #en-logo {
        width: 70px;
        height: 40px;
        transition: transform $time-Animation cubic-bezier(0.165, 0.84, 0.44, 1);
        &:hover {
            transform: scale(1.015);
        } 
        @include mq-sm {
            width: 52px;
            height: 30px;
        }
    }
</style>