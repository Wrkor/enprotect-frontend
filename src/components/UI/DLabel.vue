<template>
    <p class="label">
        <slot></slot>
    </p>
</template>

<script>
export default {
    name: 'DLabel',
}
</script>

<style lang="scss" scoped>
    .label {
        @include textLabelInput;
        justify-self: flex-start;

        @include mq-sm {
            @include textLabelInput-480
        }
    } 
</style>