<template>
    <router-link :to="btnLink">
        <button @click="btn" class="btn">
            <slot></slot>
        </button>
    </router-link>
</template>

<script>
export default {
    name: 'VBtnLink',
    props: {
        btnLink: {String},
    },
    methods: {
        btn() {
            this.$emit('btn');
        }
    },
}
</script>

<style lang="scss" scoped>
    .btn{
        @include textBtn;

        background: $bgBlock-Color;
        border: $active-Border;
        border-radius: $btn-BorderRadius;
        padding: 8px 30px;
        height: 50px;
        cursor: pointer;
        transition: all $time-Animation $type-Animation;

        @include mq-s {
            @include textBtn-320;
            padding: 5px 25px;
            height: 45px;
        }

        &:hover{
            color: $hover-Color;
            background: $active-Color;
        }
    }
    .btn-inc-link * {
        padding: 5px 22px !important;
    }
</style>