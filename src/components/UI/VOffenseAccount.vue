<template>
    <VBlock class="block">
        <p class="title">{{ offense.title }}</p>
        <p class="date">Дата: {{ date }}</p>
    </VBlock>
</template>

<script>
export default {
    name: 'VOffenseAccount',
    props: {
        offense: {Array},
    },
    computed: {
        date() {
            if (this.offense.date) {
                const dateTime = new Date(this.offense.date);
                const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
                const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);
                
                return `${day}.${month}.${dateTime.getFullYear()}`;
            }
            return "";
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    display: flex;
    justify-content: space-between;
    border-radius: $block-BorderRadius-s;
    padding: 15px;
    padding-bottom: 10px;
    margin-top: 20px;
    width: 640px; 

    @include mq-sm {
        width: 340px !important;
        margin-top: 15px;
    }

    @include mq-s {
        width: 240px !important;
        padding: 10px;
        padding-bottom: 5px;
        margin-top: 10px;
    }
    
    p {
        @include textField;

        @include mq-s {
            @include textField-320;
        }

        &.title {
            text-align: justify;
        }
        &.date {
            display: flex;
            align-self: flex-end;
            margin-top: 5px;

            @include mq-sm {
                margin-top: 10px;
            }

            @include mq-s {
                margin-top: 15px;
            }
        }
    }
    transition: all $time-Animation $type-Animation;

    &:hover{
        filter: $shadow-Filter-s;
    }
}
    
    
</style>