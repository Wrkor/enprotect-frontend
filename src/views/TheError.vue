<template>
    <div class="main">
        <div class="title">
            <p>Ошибка 404 <img src="@/assets/info.svg" class="img-title" id="t-info"></p>
        </div>
        <div>
            <VBlock class="VBlock">
                Запрашиваемого ресурса не существует.
            </VBlock>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 700px;
    display: flex;
    flex-direction: column;
    margin-bottom: 550px;

    @include mq-sm {
        width:  400px;
        margin-bottom: 480px;
    }

    @include mq-s {
        width:  280px;
        margin-bottom: 420px;
    }

    .VBlock {
        border-radius: $block-BorderRadius-m;
        @include textBlock;

        transition: filter $time-Animation $type-Animation;
        &:hover{
            filter: $shadow-Filter-m;
        }

        @include mq-sm {
            @include textBlock-480;
            padding: 15px 20px;
        }

        @include mq-s {
            @include textBlock-320;
            padding: 10px 15px;
        }
    }
}
</style>