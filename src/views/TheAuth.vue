<template>
    <VBlock class="block">
        <p class="title">Авторизация</p>
        <div>
            <DLabel class="label">Номер телефона</DLabel>
            <VInput @update:modelValue="$event => changeLoginAccount($event)" :modelValue="loginAccount" :placeholder="this.$store.state.globalConstants.placeholders.auth_login" @blur="v$.loginAccount.$touch" class="input"/>
            <div class="input-errors"  v-for="error of v$.loginAccount.$errors" :key="error.$uid">
                <div class="error-msg" >{{ error.$message }}</div>
            </div>       
        </div>
        <div>
            <DLabel class="label">Пароль</DLabel>
            <VInput @update:modelValue="$event => changePasswordAccount($event)" :modelValue="passwordAccount" type="password" :placeholder="this.$store.state.globalConstants.placeholders.auth_password" @blur="v$.passwordAccount.$touch" class="input"/>
            <div class="input-errors"  v-for="error of v$.passwordAccount.$errors" :key="error.$uid">
                <div class="error-msg" >{{ error.$message }}</div>
            </div>
            <div class="input-errors"  v-for="error of v$.trueResponse.$errors" :key="error.$uid">
                <div class="error-msg" >{{ error.$message }}</div>
            </div>   
        </div>
        <VBtn @btn="btnAuth">Войти</VBtn>
    </VBlock>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

// eslint-disable-next-line
const alpha = helpers.regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

const authAccount = (value) => value === true;

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            loginAccount: null,
            passwordAccount: null,
            trueResponse: true,
        };
    },
    methods: {
        async btnAuth() {
            if (this.loginAccount === null || this.passwordAccount === null) {
                this.v$.loginAccount.$touch();
                this.v$.passwordAccount.$touch();
            }

            else if (this.v$.loginAccount.$errors.length === 0 && this.v$.passwordAccount.$errors.length === 0) {
                 await this.$store.dispatch('authentication/login', {
                    username: this.loginAccount, 
                    password: this.passwordAccount, 
                });

                if (!this.$store.state.authentication.user){
                    this.trueResponse = false;
                    this.v$.trueResponse.$touch();
                }
            }
        },
        changeLoginAccount(newValue) {
            if (!this.trueResponse)
                this.trueResponse = true;
            this.loginAccount = newValue;
        },
        changePasswordAccount(newValue) {
            if (!this.trueResponse)
                this.trueResponse = true;
            this.passwordAccount = newValue;
        }
    },
    validations () {
        return {
            loginAccount: { 
                required: helpers.withMessage('Необходимо ввести номер', required),
                alpha: helpers.withMessage('Неправильный формат номера', alpha),
            },
            passwordAccount: { 
                required: helpers.withMessage('Необходимо ввести пароль', required), 
            },
            trueResponse: {
                authAccount: helpers.withMessage('Неверный логин или пароль', authAccount),
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    margin-top: 160px;
    margin-bottom: 240px;
    width: 400px;
    border-radius: $block-BorderRadius-m;
    display: flex;
    align-items: center;
    @include mq-s {
        width:  280px;
        padding: 15px !important;
    }

    p.title {
        @include textTitle;
        margin-bottom: 20px;

        @include mq-s {
            @include textTitle-480;
            margin-bottom: 10px;
        }
    }
    :nth-child(2) {
        margin-bottom: 10px;
        @include mq-s {
            margin-bottom: 5px;
        }
    }
    
    :nth-child(3) {
        margin-bottom: 20px;
        @include mq-s {
            margin-bottom: 10px;
        }
    }

    .label {
        margin-bottom: 5px;
    }

    .input {
        width: 300px;
        border-radius: $block-BorderRadius-s;
        @include mq-s {
            width:  240px;
        }
    }
}

</style>