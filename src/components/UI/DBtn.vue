<template>
    <router-link :to="btnLink">
        <button class="btn">
            <slot></slot>
        </button>
    </router-link>
</template>

<script>
export default {
    name: 'DBtn',
    props: {
        btnLink: {String},
    },
}
</script>

<style lang="scss" scoped>
    .btn{
        @include textBtn;

        background: $bgBlock-Color;
        border: $btn-Border;
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
</style>