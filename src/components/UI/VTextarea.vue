<template>
    <textarea :value="modelValue" @input="updateInput" type="text" class="textarea"></textarea>
</template>

<script>
export default {
    name: 'VTextarea',
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
    .textarea {
        @include textField;
        border: $block-Border;
        justify-self: flex-end;
        resize: none;
        width: $input-Width-m;
        height: $input-Height-s;
        padding: 8px 8px;

        @include mq-s {
            @include textField-320;
            padding: 5px 5px;
        }
    } 
</style>