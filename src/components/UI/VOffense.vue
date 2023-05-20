<template>
    <div>
        <p class="title">Инцидент #{{ offense.offenseid }}</p>
        <router-link :to='"/offense/" + offense.offenseid'>
            <VBlock class="block" :class='{"padding-15" : stateExtInfo}'>
                <p class="text">{{ title }}</p>
                
                <div class="info-text">
                    <div class="first">
                        <span class="field">Время: </span>
                        <div><span>{{ time }}</span></div>
                    </div>

                    <div class="second">
                        <span class="field">Дата: </span>
                        <div><span>{{ date }}</span></div>
                    </div>

                    <div class="third">
                        <span class="field">Статус: </span>
                        <div class="status">
                            <span>{{ offense.status }}</span>
                            <div class="arrow" v-if="!stateExtInfo">
                                <span>Подробнее</span>
                                <img src="@/assets/arrow.svg">
                            </div>
                        </div>
                    </div>

                    <div class="arrow" v-if="stateExtInfo">
                        <span>Подробнее</span>
                        <img src="@/assets/arrow.svg">
                    </div>
                </div>
            </VBlock>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'VOffense',
    props: {
        offense: {Array},
        stateExtInfo: {Boolean},
    },
    data() {
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
        },
        time() {
            const dateTime = new Date(this.offense.date);
            return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
        },
        title() {
            if (this.offense.title && this.offense.title.length > 85)
                return this.offense.title.slice(0, 85) + "...";
            else
                return this.offense.title;
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    @include textLabelCard;
    margin-bottom: 10px;
    
    @include mq-sm {
        @include textLabelCard-480;
    }

    @include mq-s {
        @include textLabelCard-320;
    }
}

.block {
    display: flex;
    justify-content: space-between;
    border-radius: $block-BorderRadius-m;
    width: 540px; 
    height: 160px; 
    cursor: pointer;

    @include mq-l {
        width: 350px;
        height: 180px; 
    }

    @include mq-s {
        width: 280px;
        height: 190px; 
    }

    p.text {
        @include textField;
        text-align: start;

        @include mq-s {
            @include textLabelCard-320;
        }
    }

    .info-text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        
        span {
            @include textLabelInput;
            &.field {
                @include textField; 

                @include mq-s {
                    @include textField-320;
                }
            }

            @include mq-s {
                @include textLabelInput-480;
            }
        }

        .first, .second {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            div {
                width: 430px;
                @include mq-l {
                    width: 240px;
                }

                @include mq-s {
                    width: 170px;
                }

                span {
                    text-align: left;
                }
            }
        }
        .third {
            display: flex;
            justify-content: space-between;

            .status {
                display: flex;
                justify-content: space-between;
                width: 430px;
                @include mq-l {
                    width: 240px;
                }

                @include mq-s {
                    width: 170px;
                }

                > .arrow {
                    @include textField; 

                    img {
                        margin-left: 10px;
                    }
                }
            }
        }

        > .arrow {
            margin-top: 5px;
            display: flex;
            justify-content: flex-end;

            @include mq-s {
                margin-top: 10px;
            }

            img {
                margin-left: 10px;
            }
            
        }
    }
    transition: all $time-Animation $type-Animation;
    &:hover{
        transform: $btn-Transform;
        filter: $shadow-Filter-m;
    }
}

.padding-15{
        padding-bottom: 15px;
    }
</style>