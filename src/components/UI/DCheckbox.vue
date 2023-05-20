<template>
    <label>
        <input :checked="modelValue" @change="updateInput" type="checkbox" class="checkbox" name="checkbox" @click="clickLabel">
    </label>
</template>

<script>
export default {
    name: 'DCheckbox',
    props: {
        modelValue: [Boolean],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        clickLabel() {
            this.$emit('clickLabel')
        }
    }
}
</script>

<style lang="scss" scoped>
    .checkbox {
        color: $textTitle-Color;
        justify-self: flex-start;
        cursor: pointer;
        width: $checkbox-Size;
        height: $checkbox-Size;
    } 

    input {
        border: rgba(130, 130, 130, 0.6);    
        border-radius: 10px;
    }

    label {
        background: #ffffff url("@/assets/checked.svg") no-repeat center;
    }

    .checkbox:checked {
        display: none;
    }
</style>