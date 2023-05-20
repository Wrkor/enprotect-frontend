<template>
    <select :value="modelValue" @change="changeSelect" class="select">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
</template>

<script>
export default {
    name: 'VList',
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        changeSelect(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
    .select {
        @include textField;
        border-radius: $block-BorderRadius-s;
        border: $block-Border;
        justify-self: flex-start;
        padding: 0px 8px;

        width: $input-Width-l;
        height: $input-Height-s;

        @include mq-s {
            @include textField-320;
            padding: 0px 5px;
        }
    } 
</style>