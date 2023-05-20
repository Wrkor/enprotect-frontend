<template>
    <div>
        <p class="title">Предложение #{{ offer.offerid }}</p>
        <router-link :to='"/offer/" + offer.offerid'>
            <VBlock class="block">
                <p class="text">{{ title }}</p>

                <div class="info-block">
                    <div>
                        <swiper-slide class="imgs">
                            <img :src="img1" class="img">
                            <img :src='img2' class="img">
                        </swiper-slide>
                    </div>
                    <div class="info-text">
                        <p><b>Дата</b>: {{ date }}</p>
                        <div class="arrow">
                            <span>Подробнее</span>
                            <img src="@/assets/arrow.svg" id='i-arrow{{ index }}'>
                        </div>
                    </div>
                </div>
            </VBlock>
        </router-link>
    </div>
</template>

<script>
import { SwiperSlide } from 'swiper/vue';
export default {
    name: 'VOffer',
    props: {
        offer: {Array},
        index: {Number},
    },
    components: {
      SwiperSlide,
    },
    computed: {
        img1() {
            if (this.offer.imgs[0]){
                return "data:image/jpg;base64," + this.offer.imgs[0];
            }

            else 
                return require("/src/assets/offer_base_140.jpg");
        },
        img2() {
            if (this.offer.imgs[1])
                return "data:image/jpg;base64," + this.offer.imgs[1];

            else 
                return require("/src/assets/offer_base_140.jpg");
        },
        date() {
            const dateTime = new Date(this.offer.date);
            const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
            const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);

            return `${day}.${month}.${dateTime.getFullYear()}`;
        },
        title() {
            if (this.offer.title && this.offer.title.length > 90)
                return this.offer.title.slice(0, 86) + "...";
            else
                return this.offer.title;
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
    width: 350px; 
    height: 280px; 
    cursor: pointer;

    @include mq-s {
        width: 280px; 
        height: 250px;
    }

    p.text {
        @include textField;
        text-align: center;

        @include mq-s {
            @include textLabelCard-320;
        }
    }

    .info-block {
        .imgs {
            display: flex;
            justify-content: space-between;
            width: 310px;

            @include mq-s {
                width: 240px;
            }
            
            .img {
                width: 145px;
                height: 145px;
                border-radius: $block-BorderRadius-m;

                @include mq-s {
                    width: 115px;
                    height: 115px;
                }
            }
        }

        .info-text {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            @include textInfo;
            .arrow img{
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
    
    
</style>