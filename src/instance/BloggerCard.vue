<template>
    <div class="blogger-card-container">
        <el-popover
                ref="popover"
                placement="bottom-start"
                width="640"
                trigger="hover"
                popper-class="blogger--popover--wrapper">
            <div class="blogger-card">
                <div class="name">{{ videoObj.userName }}</div>
                <div class="live">
                    <div class="live-text">近30天直播<span style="color: #fc9024; padding: 0 3px;">{{ videoObj.day30LiveDay || 0 }}</span>场</div>
                    <div class="tags" v-if="videoObj.goodsShow">带货达人</div>
                    <div class="tags" v-if="videoObj.maxWatchNum > 1000">直播达人</div>
                    <div class="tags" v-if="videoObj.maxViewCount > 50000">视频达人</div>
                </div>
                <div class="detail">
                    <div class="work">
                        <div class="flex-box">
                            <img src="../../assets/video-count.png" alt="" class="data-icon">
                            <div>作品总数</div>
                        </div>
                        <div class="work-number">{{ videoObj.productNum | shortNumber(10000,'w') }}</div>
                    </div>
                    <div class="work">
                        <div class="flex-box">
                            <img src="../../assets/live-count.png" alt="" class="data-icon">
                            <div>作品平均播放量</div>
                        </div>
                        <div class="work-number">{{ videoObj.avgVideoViewCount| shortNumber(10000, 'w', 2, Math.hundredMi) }}</div>

                    </div>
                    <div class="work">
                        <div class="flex-box">
                            <img src="../../assets/sale-count.png" alt="" class="data-icon">
                            <div>直播销售额峰值</div>
                        </div>
                        <div class="work-number">{{ videoObj.maxSellAmount | money }}</div>

                    </div>
                    <div class="work">
                        <div class="flex-box">
                            <img src="../../assets/sale-mount.png" alt="" class="data-icon">
                            <div>直播在线人数峰值</div>
                        </div>
                        <div class="work-number">{{ videoObj.maxWatchNum | shortNumber(10000,'w') }}</div>
                    </div>
                </div>
                <div class="month" v-if="videoObj.videoInfoDTO">
                    <div class="hot">
                        <div class="title">近30天热门作品</div>
                        <div class="info-box">
                            <div class="img-wrap" @click="goVideo(videoObj.videoInfoDTO.photoId)" :style="{ background: `url(${videoObj.videoInfoDTO.thumbnailUrl}) center/cover no-repeat` }"/>
                            <div class="info-detail">
                                <div>
                                    <div class="hot-number"><div>播放量</div><span>{{ videoObj.videoInfoDTO.viewCount | shortNumber(10000, 'w', 2, Math.hundredMi) }}</span></div>
                                    <div class="hot-number"><div>点赞数</div><span>{{ videoObj.videoInfoDTO.likeCount | shortNumber(10000, 'w') }}</span></div>
                                    <div class="hot-number"><div>评论数</div><span>{{ videoObj.videoInfoDTO.commentCount | shortNumber(10000, 'w') }}</span></div>
                                    <div class="hot-number"><div style="font-size: 12px;">发布时间:</div><span style="font-size: 12px;">{{ videoObj.videoInfoDTO.publishTime.slice(0,11) }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hot" v-if="videoObj.goodsDTO">
                        <div class="title">近30天热卖商品</div>
                        <div class="info-box">
                            <div class="img-wrap" @click="goGoodsDetail(videoObj.goodsDTO.goodsId)" :style="{ background: `url(${videoObj.goodsDTO.goodsPicUrl}) center/cover no-repeat` }"/>
                            <div class="info-detail">
                                <div>
                                    <div class="hot-number"><div class="good-title">{{ videoObj.goodsDTO.kwaiTitle }}</div></div>
                                    <div class="hot-number"><div style="font-size: 12px;">成交价</div><span>￥{{ videoObj.goodsDTO.goodsPrice | money }}</span></div>
                                    <div class="hot-number"><div style="font-size: 12px;">销量</div><span>{{ videoObj.goodsDTO.sellCount | shortNumber(10000,'w') }}</span></div>
                                    <div class="hot-number"><div style="font-size: 12px;">销售额</div><span>{{ videoObj.goodsDTO.sellAmount | money }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <slot slot="reference"/>
        </el-popover>
    </div>
</template>

<script>
    export default {
        props: {
            videoObj: Object
        },
        data () {
            return {
            }
        },
        methods: {
            goVideo (id) {
                let routeData = this.$resolve('videoDetail', {}, id)
                window.open(routeData.href)
            },
            goGoodsDetail (id) {
                let routeData = this.$resolve('itemDetail', { goodsId: id })
                window.open(routeData.href)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .blogger-card-container {
        .blogger-card {
            .name {
                font-weight: bold;
                color: red;
            }
        }

        .float-card {
            .good-box {
                //@include flex-between;
                justify-content: flex-start;
                margin-top: 8px;
                width: 180px;
            }

            .good-info {
                margin-left: 18px;

                .title {
                    width: 120px;

                }

                .price {
                    margin-top: 5px;


                    > span {
                        color: #333;
                    }
                }
            }
        }
    }
</style>
