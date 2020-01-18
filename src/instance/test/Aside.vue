<template>
    <div>
        <div class="item-wrapper overall--clickable" @click="viewCollect" id="aside-collect">
            <i class="iconfont aside-icon keep--center iconshoucang1" id="collect-icon"/>
            <div class="add-one" id="add-one">+1</div>
            <span class="tip-text">收藏夹</span>
        </div>
        <WXPopover placement="right" des='微信扫一扫,联系客服' trigger-type='hover' :pic-src="cdn + 'promotion/kefu.png'">
            <div class="item-wrapper overall--clickable">
                <i class="iconfont aside-icon keep--center iconlianxikefu1"/>
                <span class="tip-text">客服</span>
            </div>
        </WXPopover>
        <WXPopover placement="right" des='微信扫一扫' trigger-type='hover' :pic-src="cdn + 'promotion/alive-code.png'">
            <div class="item-wrapper overall--clickable">
                <i class="iconfont aside-icon keep--center iconxiaochengxu"/>
                <span class="tip-text">小程序</span>
            </div>
        </WXPopover>
        <div @click="purchase" class="item-wrapper overall--clickable">
            <i class="iconfont aside-icon keep--center icongouwuche"/>
            <span class="tip-text">购买</span>
        </div>
    </div>
</template>

<script>
    import config from 'config'

    export default {
        data () {
            return {
                cdn: config.cdn
            }
        },
        methods: {
            purchase () {
                let routeData = this.$resolve('version')
                window.open(routeData.href)
            },
            viewCollect () {
                let routeData = this.$resolve('collectManage')
                window.open(routeData.href)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-wrapper {
        width: 48px;
        height: 48px;
        z-index: 1000;
        margin-bottom: 30px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        position: relative;
        background: #fff;

        .aside-icon {
            width: fit-content;
            height: 22px;
            font-size: 22px;
            color: #262626;
        }

        .add-one {
            width: 24px;
            height: 24px;
            font-size: 12px;
            color: #fff;
            line-height: 24px;
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
            // transition: all 1s;
            opacity: 0;
            right: 0;
            left: 0;
            top: -12px;
            margin: 0 auto;
            position: absolute;
        }

        &:last-child {
            margin-top: 0;
        }

        .tip-text {
            position: absolute;
            top: 52px;
            display: inline-block;
            width: 100%;
            text-align: center;
            white-space: nowrap;
        }

        &:hover {
            i {
            }
        }
    }
</style>

