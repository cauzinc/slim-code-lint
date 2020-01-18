<template>
    <div>
        <live-select
                :options="tagsSelectObj.content.map(m => m.value)"
                :lists='tagsSelectObj.content'
                v-model="value"
                v-if="isDrop"
                ref="tagRef"
        />
        <label-select :label-obj="tagsSelectObj" v-model="value" ref="tagLabelRef" v-else/>
    </div>
</template>
<script>
    export default {
        props: {
            tageskey: String | Number,
            selectName: String,
            isDrop: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                value: this.tageskey,
                tagsSelectObj: {
                    name: this.selectName,
                    content: [
                        { key: '', value: this.selectName || '不限' }
                    ]
                }
            }
        },
        model: {
            prop: 'tageskey',
            event: 'updateModel'
        },
        components: {

        },
        created () {
            this.getTags()
            this.$watch('tageskey', () => {
                this.value = this.tageskey
                // this.$emit('updateModel', this.tageskey)
            })
            this.$watch('value', () => {
                this.$emit('updateModel', this.value)
            })
        },
        methods: {
            async  getTags () {
                try {
                    let result = await this.$axios.get(`/live-api/selector/tags?`)
                    this.tagsSelectObj.content = this.tagsSelectObj.content.concat(result.map(item => {
                        return {
                            key: item.tag,
                            value: item.tag
                        }
                    }))
                } catch (error) {
                    this.$message.error(error.message)
                }
            },
            setSelectItem (item, index) {
                if (this.$refs.tagRef) {
                    this.$refs.tagRef.setSelectItem(item, index)
                }
                if (this.$refs.tagLabelRef) {
                    this.$refs.tagLabelRef.update(item)
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    .label-select-wrap {
        display: flex;
        padding-bottom: 24px;
    }

    .main-font {
        padding: 4px 24px;
        min-width: 110px;
        box-sizing: border-box;
    }

    .thirdly-font {
        padding: 4px 12px;
        margin: 0 16px;
        // box-sizing: border-box;
    }

    .button-color {
        color: #fff;
    }
</style>
