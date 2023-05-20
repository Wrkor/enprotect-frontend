<template>
    <div class="main">
        <div class="title">
            <p>Просмотр инцидента <img src="@/assets/clock.svg" class="img-title" id="t-clock"></p>
        </div>
        <VBlock class="form">
            <div>
                <div class="top-form">
                    <div>
                        <DLabel>Автор: </DLabel>
                    </div>
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <VInput :modelValue="offense.snameExpert" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.sname_author" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput :modelValue="offense.nameExpert" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_author" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput :modelValue="offense.mnameExpert" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_author" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="offense.imgExpert" class="img-form" id="offenseView-1-photo-l">
                </swiper-slide>
            </div>

            <div :class='{"margin-0" : !offense.snameEmployee}'>
                <div v-if="offense.snameEmployee">
                    <div class="top-form">
                        <div>
                            <DLabel>Сотрудник: </DLabel>
                        </div>
                        <div>
                            <DLabel class="label">Фамилия: </DLabel>
                            <VInput :modelValue="offense.snameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.sname_employee" disabled/>
                        </div>

                        <div>
                            <DLabel class="label">Имя: </DLabel>
                            <VInput :modelValue="offense.nameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_employee" disabled/>
                        </div>

                        <div>
                            <DLabel class="label">Отчество: </DLabel>
                            <VInput :modelValue="offense.mnameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_employee" disabled/>
                        </div>
                    </div>
                    <swiper-slide class="swiper-slide-acc">
                        <img :src="offense.imgEmployee" class="img-form" id="offenseView-2-photo-l">
                    </swiper-slide>
                </div> 
            </div>

            <div>
                <DLabel>Название: </DLabel>
                <VTextarea :modelValue="offense.title" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offense_title" disabled/>
            </div>

            <div>
                <DLabel>Описание: </DLabel>
                <VTextarea :modelValue="offense.description" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offense_description" disabled/>
            </div>
            <div :class='{"margin-0" : !(offense.imgs && offense.imgs.length > 0)}'>
                <div v-if="offense.imgs && offense.imgs.length > 0"> 
                    <DLabel>Фотографии: </DLabel>
                    <div>
                        <viewer :options="options" :images="offense.imgs"
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
                <DLabel>Категория: </DLabel>
                <VList :modelValue="offense.category" :options="listCategory"  class="v-list" disabled/>
            </div>

            <div>
                <DLabel>Статус: </DLabel>
                <VList @update:modelValue="$event => offense.status = $event" :modelValue="offense.status" :options="listStatus" class="v-list"/>
            </div>

            <div>
                <DLabel>Дата: {{ date }} в {{ time }}</DLabel>
            </div>

            <div class="v-btn">
                <VBtn @btn="btnOffenseSave">Сохранить</VBtn>
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
    setup() {
      return {
        modules: [Pagination],
      };
    },
    data() {
        return {
            listStatus: this.$store.state.globalConstants.list.listOffenseStatus,
            listCategory: this.$store.state.globalConstants.list.listCategory,
            offense: {},
            options: {"title": false,},
            slidesByWindow: 2,
        }
    },
    computed: {
        date() {
            if (this.offense.date) {
                const dateTime = new Date(this.offense.date);
                const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
                const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);
                
                return `${day}.${month}.${dateTime.getFullYear()}`;
            }
            return "";
        },
        time() {
            const dateTime = new Date(this.offense.date);
            return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
        },
        slidesPerView() {
            return this.slidesByWindow;
        }
    },
    methods: {
        async btnOffenseSave() {
            await userService.offenseUpdate(this.offense.offenseid, this.offense.status)
                .then(
                    request  => {
                        const response =  JSON.parse(request);

                        if (response.result) {
                            this.$router.push(this.$store.state.globalConstants.routesLink.offense);
                            this.$store.dispatch('alert/success', "Статус успешно обновлен", { root: true });
                        }
                        else {
                            this.$store.dispatch('alert/error', response.message , { root: true });
                        }
                    }
                );
        },
        async offenseData() {
            await userService.offense(this.$route.params.id)
                .then(
                    offense => {
                        const response =  JSON.parse(offense);

                        if (response.result) {
                            this.offense = JSON.parse(response.data);
                            this.offense.imgs = JSON.parse(this.offense.imgs);
                            
                            this.offense.imgExpert = "data:image/jpg;base64," + JSON.parse(this.offense.imgExpert);

                            if (this.offense.snameEmployee) {
                                this.offense.imgEmployee = "data:image/jpg;base64," + JSON.parse(this.offense.imgEmployee);
                            }

                            for (let i = 0; i < this.offense.imgs.length; i++) {
                                this.offense.imgs[i] = "data:image/jpg;base64," + this.offense.imgs[i];
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
            if (document.documentElement.clientWidth >= 768 && this.offense.imgs && this.offense.imgs.length > 1)
                this.slidesByWindow = 2;
            else
                this.slidesByWindow = 1;
        }
    },
    async created() {
        window.addEventListener('resize', this.changeWidth);
        this.changeWidth();
        await this.offenseData();
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

        > :nth-child(1), > :nth-child(2) > div {
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

        > :nth-child(3){
            .textarea {
                height: 80px;
                margin-top: 5px;
            }
        }

        > :nth-child(4) {
            .textarea {
                height: 160px;
                margin-top: 5px;
            }
        }

        > :nth-child(5) {
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

        > :nth-child(8) {
            margin-top: 5px;
        }
    }
    .margin-0 {
        margin: 0px !important;
    }
}
</style>