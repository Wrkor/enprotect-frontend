<template>
    <div class="block">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VBlock',
}
</script>

<style lang="scss" scoped>
    .block{
        border: $block-Border;
        background: $bgBlock-Color;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
</style>