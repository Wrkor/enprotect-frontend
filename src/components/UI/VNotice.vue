<template>
    <VBlock class="block" :class='{"active-block" : !notice.checked}'>
        <p class="title">{{ notice.title }}</p>
        <p class="text">{{ notice.description }}</p>
        <p class="date">Дата: {{ date }} в {{ time }}</p>
    </VBlock>
</template>

<script>
export default {
    name: 'VNotice',
    props: {
        notice: {Array},
    },
    computed: {
        date() {
            const dateTime = new Date(this.notice.date);
            const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
            const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);

            return `${day}.${month}.${dateTime.getFullYear()}`;
        },
        time() {
            const dateTime = new Date(this.notice.date);
            return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    display: flex;
    justify-content: space-between;
    border-radius: $block-BorderRadius-m;
    padding-bottom: 10px;
    margin-bottom: 20px;
    width: 700px; 
    @include mq-l {
        width: 730px;
    }

    @include mq-sm {
        width: 350px;
    }

    @include mq-s {
        width: 280px;
        padding: 15px;
        padding-bottom: 10px;
    }

    p {
        @include textLabelInput;

        @include mq-sm {
            @include textLabelInput-480;
        }
        
        &.title {
            @include textLabelCard;

            @include mq-sm {
                @include textLabelCard-480;
            }

            @include mq-s {
                @include textLabelCard-320;
            }
        }
        &.text {
            margin: 20px 0;
            @include mq-sm {
                margin: 10px 0;
            }
        }
        &.date {
            display: flex;
            align-self: flex-end;
        }
    }
    transition: all $time-Animation $type-Animation;

    &:hover{
        filter: $shadow-Filter-m;
    }
}

.block.active-block {
    filter: $shadow-Filter-m;
}
</style>