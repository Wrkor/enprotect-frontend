<template>
    <div class="main">
        <div class="title">
            <p>Подать предложение <img src="@/assets/twitch.svg" class="img-title"  id="t-twitch"></p>
        </div>
        <VBlock class="form">
            <div>
                <div class="top-form">
                    <div>
                        <DLabel>Сотрудник: </DLabel>
                    </div>
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <VInput :modelValue="snameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.sname_employee" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput :modelValue="nameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_employee" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput :modelValue="mnameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_employee" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="accImg" id="offerCreate-photo-l" class="img-form">
                </swiper-slide>
            </div>

            <div>
                <DLabel>Название: </DLabel>
                <VTextarea @update:modelValue="$event => offerTitle = $event" :modelValue="offerTitle" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offer_title" @blur="v$.offerTitle.$touch"/>
                <div class="input-errors"  v-for="error of v$.offerTitle.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div>
                <DLabel>Описание: </DLabel>
                <VTextarea @update:modelValue="$event => offerDescription = $event" :modelValue="offerDescription" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offer_description" @blur="v$.offerDescription.$touch"/>
                <div class="input-errors"  v-for="error of v$.offerDescription.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div>
                <DLabel>Фотографии: </DLabel>
                <file-pond
                    name="offersImgs"
                    ref="pond"
                    class="file-pond"
                    label-idle="Нажмите или перетащите изображения..."
                    accepted-file-types="image/jpeg, image/jpg, image/png"
                    max-files="6"
                    :allow-multiple="true"
                    :allowReorder=true
                    :credits="credits"
                />
            </div>

            <div class="v-btn">
                <VBtn @btn="btnOfferCreate">Создать</VBtn>
            </div>
        </VBlock>
        
    </div>
</template>

<script>
import { userService } from '@/services';
import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from '@vuelidate/validators'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
import { SwiperSlide } from 'swiper/vue';

export default {
    components: {
      SwiperSlide,
      FilePond,
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            offer: {
            },
            offerTitle: null,
            offerDescription: null,
            credits:  "",
        }
    },
    computed: {
        accImg() {
            if (this.$store.state.account.userData)
                return "data:image/jpg;base64," + this.$store.state.account.userData.img;

            else
                return require("/src/assets/acc_base_140.jpg");
        },
        snameAuthor() {
            if (this.$store.state.account.userData)
                return this.$store.state.account.userData.sname;

            else
                return "";
            
        },
        nameAuthor() {
            if (this.$store.state.account.userData)
                return this.$store.state.account.userData.name;

            else
                return "";
        },
        mnameAuthor() {
            if (this.$store.state.account.userData)
                return this.$store.state.account.userData.mname;

            else
                return "";
        },
        
    },
    methods: {
        async btnOfferCreate() {
            if (this.offerTitle === null || this.offerDescription === null) {
                this.v$.offerTitle.$touch();
                this.v$.offerDescription.$touch();
            }

            else if (this.v$.offerTitle.$errors.length === 0 && this.v$.offerDescription.$errors.length === 0) {
                const imgs = [];
                this.$refs.pond.getFiles().forEach(element => {
                    imgs.push(element.file);
                });

                await userService.offerCreate(this.offerTitle, this.offerDescription, imgs)
                    .then(
                        request  => {
                            const response =  JSON.parse(request);

                            if (response.result) {
                                this.$router.push(this.$store.state.globalConstants.routesLink.offer);
                                this.$store.dispatch('alert/success', "Предложение успешно создано", { root: true });
                            }
                            else {
                                this.$store.dispatch('alert/error', response.message , { root: true });
                            }
                        }
                    );
            }
        }
    },
    validations () {
        return {
            offerTitle: { 
                required: helpers.withMessage('Необходимо ввести название предложения', required),
                minLength: helpers.withMessage(({$params}) => `Минимальная длина - ${$params.min} символов`, minLength(10)),
                maxLength: helpers.withMessage(({$params}) => `Максимальная длина - ${$params.max} символов`, maxLength(200)),
            },
            offerDescription: { 
                required: helpers.withMessage('Необходимо ввести описание предложения', required), 
                minLength: helpers.withMessage(({$params}) => `Минимальная длина - ${$params.min} символов`, minLength(20)),
                maxLength: helpers.withMessage(({$params}) => `Максимальная длина - ${$params.max} символов`, maxLength(5000)),
            },
        }
    },
}
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
    }
}
</style>