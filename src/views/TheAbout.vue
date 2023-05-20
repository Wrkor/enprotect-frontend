<template>
    <div class="main">
        <div class="title">
            <p>О портале <img src="@/assets/info.svg" class="img-title" id="t-info"></p>
        </div>
        <div>
            <VBlock class="VBlock">
                Данный сайт предоставляют возможность 
                оперативной и продуктивной работы по обработки 
                предложений и фиксации нарушений, а также улучшения взаимодействия 
                между Сотрудниками и Руководством по средствам отправки предложений 
                по усовершенствованию качества работы и охраны труда.
            </VBlock>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 700px;
    display: flex;
    flex-direction: column;
    margin-bottom: 480px;

    @include mq-sm {
        width:  400px;
        margin-bottom: 280px;
    }

    @include mq-s {
        width:  280px;
        margin-bottom: 180px;
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