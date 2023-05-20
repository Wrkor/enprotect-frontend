<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input">
</template>

<script>
export default {
    name: 'VInput',
    props: {
        modelValue: [String],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
    .input {
        @include textField;
        border: $block-Border;
        justify-self: flex-end;
        resize: none;
        width: $input-Width-m;
        height: $input-Height-s;
        padding: 10px 10px;

        @include mq-s {
            @include textField-320;
            padding: 5px 8px;
        }
    } 
</style>