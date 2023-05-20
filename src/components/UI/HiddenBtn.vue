<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'HiddenBtn',
}
</script>

<style lang="scss" scoped>
    .btn{
        @include textHiddenBtn;

        box-sizing: border-box;
        background: $bgBlock-Color;
        border: $btn-Border;
        border-radius: $btn-BorderRadius;
        padding: 10px;
        cursor: pointer;
        transition: all 400ms ease;

        &:hover{
            color: $hover-Color;
            background: $active-Color;
            border: $active-Border;
        }
    }
</style>