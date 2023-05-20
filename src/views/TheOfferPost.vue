<template>
    <div class="main">
        <div class="title">
            <p>Просмотр предложение <img src="@/assets/twitch.svg" class="img-title" id="t-twitch"></p>
        </div>
        <VBlock class="form">
            <div>
                <div class="top-form">
                    <div>
                        <DLabel>Сотрудник: </DLabel>
                    </div>
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <VInput :modelValue="offer.snameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.sname_employee" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput :modelValue="offer.nameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_employee" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput :modelValue="offer.mnameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_employee" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="offer.imgEmployee" class="img-form" id="offer-photo-l">
                </swiper-slide>
            </div>

            <div>
                <DLabel>Название: </DLabel>
                <VTextarea :modelValue="offer.title" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offer_title" disabled/>
            </div>

            <div>
                <DLabel>Описание: </DLabel>
                <VTextarea :modelValue="offer.description" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offer_description" disabled/>
            </div>

            <div :class='{"margin-0" : !(offer.imgs && offer.imgs.length > 0)}'>
                <div v-if="offer.imgs && offer.imgs.length > 0"> 
                    <DLabel>Фотографии: </DLabel>
                    <div>
                        <viewer :options="options" :images="offer.imgs"
                            @inited="inited"
                            class="viewer imgs" ref="viewer"
                        >
                            <template #default="scope">
                                <swiper :slidesPerView="slidesPerView"
                                        :spaceBetween="20"
                                        :pagination="{
                                            clickable: true,
                                        }"
                                        :modules="modules"
                                        class="mySwiper"
                                >
                                    <swiper-slide v-for="src in scope.images" :src="src" :key="src">
                                        <img :src="src" :key="src" class="img">
                                    </swiper-slide>
                                </swiper>
                                
                            </template>
                        </viewer>
                    </div>
                </div>
            </div>

            <div>
                <DLabel>Статус: </DLabel>
                <VList v-if="access(this.OFFER_EDIT)" @update:modelValue="$event => offer.status = $event" :modelValue="offer.status" :options="listStatus" class="v-list"/>
                <VList v-else :modelValue="offer.status" :options="listStatus" class="v-list" disabled/>
            </div>

            <div>
                <DLabel>Дата: {{ date }}</DLabel>
            </div>

            <div v-if="access(this.OFFER_EDIT)" class="v-btn">
                <VBtn @btn="btnOfferSave">Сохранить</VBtn>
            </div>
        </VBlock>
        
    </div>
</template>

<script>
import { userService } from '@/services';
import { defineComponent } from 'vue'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/styleSwiper.css';

export default defineComponent({
    components: {
      Viewer,
      Swiper,
      SwiperSlide,
    },
    data() {
        return {
            listStatus: this.$store.state.globalConstants.list.listOffenseStatus,
            offer: {}, 
            options: {"title": false,},
            slidesByWindow: 2,
        }
    },
    computed: {
        date() {
            if (this.offer.date) {
                const dateTime = new Date(this.offer.date);
                const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
                const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);
                
                return `${day}.${month}.${dateTime.getFullYear()}`;
            }
            return "";
        },
        slidesPerView() {
            return this.slidesByWindow;
        }
    },
    methods: {
        async btnOfferSave() {
            await userService.offerUpdate(this.offer.offerid, this.offer.status)
                .then(
                    request  => {
                        const response =  JSON.parse(request);

                        if (response.result) {
                            this.$router.push(this.$store.state.globalConstants.routesLink.offer);
                            this.$store.dispatch('alert/success', "Статус успешно обновлен", { root: true });
                        }
                        else {
                            this.$store.dispatch('alert/error', response.message , { root: true });
                        }
                    }
                );
        },
        async offerData() {
            await userService.offer(this.$route.params.id)
                .then(
                    offer => {
                        const response =  JSON.parse(offer);

                        if (response.result) {
                            this.offer = JSON.parse(response.data);
                            this.offer.imgs = JSON.parse(this.offer.imgs);

                            this.offer.imgEmployee = "data:image/jpg;base64," + JSON.parse(this.offer.imgEmployee);

                            for (let i = 0; i < this.offer.imgs.length; i++) {
                                this.offer.imgs[i] = "data:image/jpg;base64," + this.offer.imgs[i];
                            }

                            this.changeWidth();
                        }

                        else {
                            this.$store.dispatch('alert/error', response.message , { root: true });
                        }
                    }
                );
        },
        inited (viewer) {
            this.$viewer = viewer
        },
        changeWidth() {
            if (document.documentElement.clientWidth >= 768 && this.offer.imgs && this.offer.imgs.length > 1)
                this.slidesByWindow = 2;
            else
                this.slidesByWindow = 1;
        }
    },
    async created() {
        window.addEventListener('resize', this.changeWidth);
        this.changeWidth();
        await this.offerData();
    },
    setup() {
      return {
        modules: [Pagination],
      };
    },
})
</script>

<style lang="scss" scoped>
.main {
    width: 700px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    @include mq-sm {
        width:  400px;
    }

    @include mq-s {
        width:  280px;
    }

    .form {
        width: 700px;
        border-radius: $block-BorderRadius-m;
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

        > div {
            margin-bottom: 20px;

            @include mq-s {
                margin-bottom: 15px;
            }
        }

        > :nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @include mq-s {
                flex-direction: column-reverse;
            }
            
            .top-form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
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

                > div {
                    display: flex;
                    align-content: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    width: 350px;

                    @include mq-sm {
                        width:  250px;
                        margin-bottom: 7px;
                    }

                    @include mq-s {
                        width:  240px;
                    }

                    &:nth-child(1) p {
                        @include textField;

                        @include mq-s {
                            @include textField-320;
                        }
                    }

                    &:last-child {
                        margin-bottom: 0px;
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

                
            }
        }

        > :nth-child(2){
            .textarea {
                height: 80px;
                margin-top: 5px;
            }
        }

        > :nth-child(3) {
            .textarea {
                height: 160px;
                margin-top: 5px;
            }
        }

        > :nth-child(4) {
            .imgs {
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
                .img {
                    width: 300px;
                    height: 300px;
                    border-radius: $block-BorderRadius-s;

                    @include mq-sm {
                        width: 340px;
                        height: 340px;
                    }

                    @include mq-s {
                        width: 240px;
                        height: 240px;
                    }
                }
            }
        }

        > :nth-child(6) {
            margin-top: 5px;
        }

        > .btns {
            justify-content: space-between !important;
            @include mq-s {
                flex-direction: column-reverse;
                align-content: center;
                flex-wrap: wrap;
                height: 110px;
                > :first-child {
                    width: 150px;
                }
                > :last-child {
                    width: 140px;
                }
            }
        }
    }

    .margin-0 {
        margin: 0px !important;
    }
}
</style>