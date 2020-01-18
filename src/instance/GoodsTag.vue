<template>
    <div @click="goDetail" class="img"
         :style="{'backgroundImage': `url(${imgurl})`,'background-size': 'cover', ...imgStyle}">
        <div class="goodstag" :style="{'background-color': colorStyle}">
            <span class="text">{{ config.getSourceNameByKey(tagType) }}</span></div>
    </div>
</template>
<script>
    import config from 'config/filterConfigs'

    export default {
        props: {
            tagType: {
                type: Number,
                default: 0
            },
            // tagtype: {
            //   type: String,
            //   default: '有赞'
            // },
            imgurl: String,
            imgStyle: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            colorStyle () {
                const tagName = this.config.getSourceNameByKey(this.tagType)
                const color = this.colors.find(color => color.name === tagName)
                return (color && color.value) || ''
            }
        },
        data () {
            return {
                config,
                colors: [
                    { name: '淘宝', value: '#fc9024' },
                    { name: '有赞', value: '#fc4c24' },
                    { name: '魔筷', value: '#fc245b' },
                    { name: '拼多多', value: '#DD3A30' },
                    { name: '快手小店', value: '#FA7739' }
                ]
            }
        },
        methods: {
            goDetail () {
                this.$emit('toDetail')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 4px;
    }

    .goodstag {
        width: fit-content;
        padding: 0 4px;
        height: 16px;
        background-color: #ee7600;
        position: relative;
        top: 0;
        border-top-left-radius: 4px;
        border-bottom-right-radius: 8px;
        line-height: 16px;

        .text {
            width: 20px;
            height: 14px;
            font-family: PingFangSC-Medium;
            font-size: 10px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0;
            color: #fff;
        }
    }
</style>
