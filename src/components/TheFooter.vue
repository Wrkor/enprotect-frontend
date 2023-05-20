<template>
    <footer>
        <div>
            <a href="https://enplusgroup.com/ru/company/"><span>О компании</span></a>
            <router-link :to="this.ROUTES_ABOUT"><span :class='{"active-text": this.$route.path == this.ROUTES_ABOUT}'>О портале</span></router-link>
            <a href="https://enplusgroup.com/ru/contacts/"><span>Контакты</span></a>
            <router-link :to="this.ROUTES_ACCOUNT"><span>Профиль</span></router-link>
        </div>
    </footer>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
    footer {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        width: 100%;
        background-color: $bgPage-Color;
        border-top: $strokePage-Color 1px solid;
        > div {
            display: flex;
            width: $block-Width-m;
            align-items: center;
            justify-content: space-between;
            margin-top: 50px;
            margin-bottom: 80px;

            @include mq-sm {
                width: $block-Width-s;
            }
            @include mq-s {
                width: 280px;
                height: 60px;
                flex-wrap: wrap;
                align-content: space-between;
                text-align: center;
                 span {
                    display: block;
                    width: 100px;
                }
            }

            span {
                @include textFooter;
                &:hover {
                    color: $active-Color;
                } 
            }
        }
    }
</style>