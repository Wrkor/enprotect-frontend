<template>
    <div class="main">
        <div>
            <p class="title">En+ Group — инициатор создания ассоциации «Байкал без пластика»</p>
            <p >Портал регистрации предложений и инцидетов охраны труда в компании En+</p>
        </div>
        <div v-if="login && !access(this.OFFENSE)" class="offerBtns">
            <LinkBtn :link="this.ROUTES_ACCOUNT">Личный кабинет</LinkBtn>
            <LinkBtn :link="this.ROUTES_OFFER"><p>Предложения</p><p>Форма подачи</p><p>Статус</p></LinkBtn>
        </div>
        <div v-else >
            <LinkBtn :link="this.ROUTES_ACCOUNT">Личный кабинет</LinkBtn>
            <LinkBtn :link="this.ROUTES_OFFENSE">Отчет</LinkBtn>
            <LinkBtn :link="this.ROUTES_OFFENSE"><p>Нарушения</p><p>Форма подачи</p><p>Статус</p></LinkBtn>
            <LinkBtn :link="this.ROUTES_OFFER"><p>Предложения</p><p>Форма подачи</p><p>Статус</p></LinkBtn>
        </div>
        
    </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: space-between;
    width: $block-Width-l;
    margin-top: 115px;
    margin-bottom: 260px;

    @include mq-l {
        flex-direction: column;
        align-items: center;
        width: $block-Width-m;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    @include mq-sm {
        width: $block-Width-s;
    }

    @include mq-s {
        width: $block-Width-xs;
    }

    > div {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        width: 520px;
        height: 320px;

        &:nth-child(1)  {
            justify-content: flex-start;

            @include mq-l {
                height: 280px;
                margin-bottom: 50px;
            }

            @include mq-sm {
                width: 320px;
                height: 170px;
            }

            @include mq-s {
                width: 270px;
                height: 150px;
            }

            > p {
                color: $textTitle-Color;
                font-weight: 300;
                font-size: 24px;
                line-height: 140%;
                
                @include mq-l {
                    &:last-child {
                        text-align: center;
                    }   
                }

                @include mq-sm {
                    font-size: 14px;
                }
                
                &.title {
                    color: $textTitle-Color;
                    font-weight: 700;
                    font-size: 40px;
                    line-height: 160%;
                    text-transform: uppercase;

                    @include mq-sm {
                        font-size: 24px;
                    }
                    @include mq-s {
                        font-size: 20px;
                    }
                }
            } 

            
        }

        &:nth-child(2) {
            justify-content: space-between;

            @include mq-sm {
                width: 250px;
                height: 660px;
            }
        }  

        &.offerBtns {
            align-content: center;

            @include mq-l {
                align-content: space-between;
                height: 320px;
            }
        }
    }
}
</style>