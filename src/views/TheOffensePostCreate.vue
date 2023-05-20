<template>
    <div class="main">
        <div class="title">
            <p>Подать инцидент <img src="@/assets/mail.svg" class="img-title" id="t-mail"></p>
        </div>
        <VBlock class="form">
            <div>
                <div class="top-form">
                    <div>
                        <DLabel>Автор: </DLabel>
                    </div>
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <VInput :modelValue="snameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.sname_author" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput :modelValue="nameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_author" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput :modelValue="mnameAuthor" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_author" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="accImgAuthor" class="img-form" id="offenseCreate-1-photo-l">
                </swiper-slide>
            </div>

            <div>
                <DLabel>Категория: </DLabel>
                <VList @update:modelValue="$event => category = $event" :modelValue="category" :options="listCategory" @blur="v$.category.$touch" class="v-list"/>
                <div class="input-errors"  v-for="error of v$.category.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div v-show='category === "Персонал"'>
                <div class="top-form">
                    <div>
                        <DLabel>Сотрудник: </DLabel>
                    </div>
                    <div>
                        <DLabel class="label">Фамилия: </DLabel>
                        <v-select :options="employees" :get-option-label="(option) => option.sname" @search="fetchOptions" v-model="selectedEmployee" @search:blur="v$.selectedEmployee.$touch" class="v-select" :placeholder="this.$store.state.globalConstants.placeholders.sname_employee">
                            <!-- eslint-disable-next-line vue/no-unused-vars  -->
                            <template #no-options="{ search, searching, loading }">
                                <div v-if="search.length === 0">Введите фамилию</div>
                                <div v-if="search.length !== 0 && search.length < 3">Введите больше 3 букв</div>
                                <div v-if="search.length >= 3 && !loading">Сотрудник не найден</div>
                                <div v-if="loading">Происходит поиск</div>
                            </template>

                            <template #option="{ sname, name, mname }">
                                {{ sname }} {{ name[0] }}. {{ mname[0] }}.
                                </template>
                        </v-select>
                    </div>

                    <div>
                        <DLabel class="label">Имя: </DLabel>
                        <VInput @update:modelValue="$event => nameEmployee = $event" :modelValue="nameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.name_employee" disabled/>
                    </div>

                    <div>
                        <DLabel class="label">Отчество: </DLabel>
                        <VInput @update:modelValue="$event => mnameEmployee = $event" :modelValue="mnameEmployee" class="input v-input" :placeholder="this.$store.state.globalConstants.placeholders.mname_employee" disabled/>
                    </div>
                </div>
                <swiper-slide class="swiper-slide-acc">
                    <img :src="accImgEmployee"  class="img-form" id="offenseCreate-2-photo-l">
                </swiper-slide>
            </div>

            <div>
                <div class="input-errors input-errors-1"  v-for="error of v$.selectedEmployee.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div>
                <DLabel>Название: </DLabel>
                <VTextarea @update:modelValue="$event => offenseTitle = $event" :modelValue="offenseTitle" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offense_title" @blur="v$.offenseTitle.$touch"/>
                <div class="input-errors"  v-for="error of v$.offenseTitle.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div>
                <DLabel>Описание: </DLabel>
                <VTextarea @update:modelValue="$event => offenseDescription = $event" :modelValue="offenseDescription" class="textarea v-textarea" :placeholder="this.$store.state.globalConstants.placeholders.offense_description" @blur="v$.offenseDescription.$touch"/>
                <div class="input-errors"  v-for="error of v$.offenseDescription.$errors" :key="error.$uid">
                    <div class="error-msg" >{{ error.$message }}</div>
                </div> 
            </div>

            <div>
                <DLabel>Фотографии: </DLabel>
                <file-pond
                    name="offensesImgs"
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
                <VBtn @btn="btnOffenseCreate">Создать</VBtn>
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

import 'vue-select/dist/vue-select.css';

import { SwiperSlide } from 'swiper/vue';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

const selectedEmployee = (value) => value !== null;

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
            listCategory: this.$store.state.globalConstants.list.listCategory,
            offense: {
            },
            selectedEmployee: null,
            snameEmployee: null,
            mnameEmployee: null,
            nameEmployee: null,
            imgEmployee: null,
            employees: [],
            offenseTitle: null,
            offenseDescription: null,
            category: null,
            credits:  "",
        }
    },
    computed: {
        accImgAuthor() {
            if (this.$store.state.account.userData)
                return "data:image/jpg;base64," + this.$store.state.account.userData.img;

            else
                return require("/src/assets/acc_base_140.jpg");
        },
        accImgEmployee() {
            if (this.imgEmployee)
                return "data:image/jpg;base64," + this.imgEmployee;

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
        async btnOffenseCreate() {
            if (this.offenseTitle === null || this.offenseDescription === null || this.category === null) {
                this.v$.offenseTitle.$touch();
                this.v$.offenseDescription.$touch();
                this.v$.category.$touch();
            }

            if (this.category === "Персонал" && this.selectedEmployee === null) {
                this.v$.selectedEmployee.$touch();
            }

            else if (this.v$.offenseTitle.$errors.length === 0 && this.v$.offenseDescription.$errors.length === 0 && this.v$.category.$errors.length === 0 && 
            ((this.category === "Персонал" && this.v$.selectedEmployee.$errors.length === 0) || this.category === "Оборудование")) {
                const imgs = [];
                this.$refs.pond.getFiles().forEach(element => {
                    imgs.push(element.file);
                });

                await userService.offenseCreate(this.selectedEmployee ? this.selectedEmployee.userid : "" , this.offenseTitle, this.offenseDescription, this.category, imgs)
                    .then(
                        request  => {
                            const response =  JSON.parse(request);

                            if (response.result) {
                                this.$router.push(this.$store.state.globalConstants.routesLink.offense);
                                this.$store.dispatch('alert/success', "Инцидент успешно создан", { root: true });
                            }
                            else {
                                this.$store.dispatch('alert/error', response.message , { root: true });
                            }
                        }
                    );
            }
        },
        async fetchOptions(search) {
            if (search.length >= 3) {
                await userService.userid(search)
                .then(
                    request  => {
                        const response =  JSON.parse(request);

                        if (response.result) {
                            this.employees =  JSON.parse(response.data);
                        }
                        else {
                            this.employees = [];
                        }
                    }
                );
            }
            else {
                this.v$.selectedEmployee.$touch();
                this.employees = [];
            }
        },
        async fetchImg(employeeid) {
            await userService.userimg(employeeid)
                .then(
                    request  => {
                        const response =  JSON.parse(request);

                        if (response.result) {
                            this.imgEmployee = JSON.parse(response.data);
                        }
                        else {
                            this.$store.dispatch('alert/error', response.message , { root: true });
                        }
                    }
                );
        }
    },
    watch: {
        async selectedEmployee(employee) {
            if (employee) {
                this.snameEmployee = employee.sname;
                this.nameEmployee = employee.name;
                this.mnameEmployee = employee.mname;
                await this.fetchImg(employee.userid);
            }

            else {
                this.snameEmployee = null;
                this.nameEmployee = null;
                this.mnameEmployee = null;
                this.imgEmployee = null;
            }
            
        }
    },
    validations () {
        return {
            offenseTitle: { 
                required: helpers.withMessage('Необходимо ввести название инцидента', required),
                minLength: helpers.withMessage(({$params}) => `Минимальная длина - ${$params.min} символов`, minLength(10)),
                maxLength: helpers.withMessage(({$params}) => `Максимальная длина - ${$params.max} символов`, maxLength(200)),
            },
            offenseDescription: { 
                required: helpers.withMessage('Необходимо ввести описание инцидента', required), 
                minLength: helpers.withMessage(({$params}) => `Минимальная длина - ${$params.min} символов`, minLength(20)),
                maxLength: helpers.withMessage(({$params}) => `Максимальная длина - ${$params.max} символов`, maxLength(5000)),
            },
            category: { 
                required: helpers.withMessage('Необходимо выбрать категорию инцидента', required), 
            },
            selectedEmployee: {
                selectedEmployee: helpers.withMessage('Необходимо выбрать сотрудника', selectedEmployee), 
            }
        }
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
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;

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

        > :nth-child(1), > :nth-child(3) {
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

        > :nth-child(4) {
            margin-bottom: 0px;
        }

        > :nth-child(5){
            .textarea {
                height: 80px;
                margin-top: 5px;
            }
        }

        > :nth-child(6) {
            .textarea {
                height: 160px;
                margin-top: 5px;
            }
        }
    }
    .v-select {
        @include textField;
        width: 260px; 
        color: #4a4a4ae0;

        @include mq-sm {
            width:  170px;
        }

        @include mq-s {
            @include textField-320
        }

    }
    .input-errors-1 {
        margin-left: 118px;

        @include mq-sm {
            margin-left: 0px;
        }
    }
}
</style>