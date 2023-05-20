<template>
    <router-link v-bind:to="link" class="btn">
        <VBlock class="block">
            <p><slot></slot></p>
            <div>
                <span>Подробнее</span>
                <img src="@/assets/arrow.svg" id="i-arrow">
            </div>
        </VBlock>
    </router-link>
</template>

<script>
export default {
    name: 'LinkBtn',
    props: {
        link: {String},
    }
}
</script>

<style lang="scss" scoped>
.btn{
    .block {
        display: flex;
        justify-content: space-between;
        border-radius: $block-BorderRadius-l;
        width: 250px; 
        height: 150px;
    }
    
    p {
        @include textInfoBtn;
    }

    span {
        @include textInfo;
        margin-right: 10px;
        
    }
    
    transition: all $time-Animation $type-Animation;

    &:hover{
        transform: $btn-Transform;
        filter: $shadow-Filter-m;
    }
}
</style>