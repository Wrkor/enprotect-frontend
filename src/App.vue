<template>
    <div class="app">
        <img src="@/assets/En_LogoTop.png" id="bg-logo-top">
        <img src="@/assets/En_LogoDown.png" id="bg-logo-down">
        <notifications classes="v-push" position="bottom right" width="300px" :reverse='true' :max='3'/>

        <TheHeader></TheHeader>
        <router-view></router-view>
        <DBtn :btnLink="btnlinkBackRoute">Вернуться</DBtn>  
        <TheFooter></TheFooter>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
    components: {
        TheHeader,
        TheFooter,
    },
    computed: {
        btnlinkBackRoute() {
            return this.$store.state.authentication.linkBack;
        },
    },
    created() {
        this.$store.dispatch('authentication/auth');
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: $text-Family;
}

body {
    background-color: $bgWebPage-Color;
}

a {
    text-decoration: none;
    span {
        transition: color $time-Animation $type-Animation;
    }
}

.v-input {
    @include textField; 

    @include mq-s {
        @include textField-320
    }
}

.v-textarea {
    width: 640px !important;
    border-radius: $block-BorderRadius-s;

    @include mq-sm {
        width: 340px !important;
    }

    @include mq-s {
        width: 240px !important;
    }
}

.v-list {
    width: 640px !important;
    margin-top: 5px;

    @include mq-sm {
        width: 340px !important;
    }

    @include mq-s {
        width: 240px !important;
    }
}

.v-btn {
    margin-bottom: 0px;
    display: flex;
    justify-content: center;

    @include mq-sm {
        margin-top: 0px;
    }

    @include mq-s {
        margin-top: 5px;
    }
}

.swiper-slide-acc {
    width: 140px !important;
    height: 140px !important;
    @include mq-sm {
        width: 80px !important;
        height: 80px !important;
    }

    @include mq-s {
        width: 100px !important;
        height: 100px !important;
        margin-bottom: 10px;
    }
    img.img-form {
        border-radius: 100%;
    }
}

.file-pond{
    width: 640px;
    margin-top: 5px;

    @include mq-sm {
        width: 340px;
    }

    @include mq-s {
        width: 240px;
    }
}

.push {
    @include textLabelCard;
    
    @include mq-sm {
        @include textLabelCard-480;
    }

    @include mq-s {
        @include textLabelCard-320;
    }
}

.v-push {
    padding: 10px 20px;
    margin: 5px;
    
    background: $bgBlock-Color !important;
    border: $block-Border;
    border-radius: $block-BorderRadius-s;
    cursor: pointer;

    .notification-title {
        color: rgba(39, 39, 39, 0.8) !important;
        font-size: 18px;
    }

    .notification-content {
        margin-top: 10px;
        font-size: 16px;
    }

    &.error {
        color: $error-Color;
    }
    
    &.success {
        color: $success-Color;
    }
}

div.title {
    margin-bottom: 30px;
    display: flex;
    align-self: flex-start;

    @include mq-sm {
        margin-bottom: 20px;
    }
    
}

div.title-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;

    @include mq-sm {
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 20px;
        height: 90px;
    }

    @include mq-s {
        height: 80px;
    }
}

div.title > p,  
div.title-2 > p {
    @include textTitle;
    display: flex;
    justify-content: center;

    @include mq-sm {
        @include textTitle-480;
    }

    @include mq-s {
        @include textTitle-320;
    }
    
    .img-title {
        margin-left: 12px;
        width: 32px;
        height: 32px;

        @include mq-sm {
            margin-left: 8px;
            width: 26px;
            height: 26px;
        }

        @include mq-s {
            margin-left: 6px;
            width: 20px;
            height: 20px;
        }
    }
} 

.active-text {
    color: $active-Color !important; 
}

.input-errors {
    margin-bottom: 10px !important;
    .error-msg {
        color: $error-Color !important; 
        font-size: 14px !important; 
        font-family: $text-Family;
    }
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#bg-logo-down {
    position: fixed;

    left: calc(50% - 600px/2 - 600px);
    top: calc(50% - 397px/2 + 301px);
    z-index: -1;
}

#bg-logo-top {
    position: fixed;

    left: calc(50% - 900px/2 + 720px);
    top: calc(50% - 443px/2 - 203px);
    z-index: -2;
}
</style>
