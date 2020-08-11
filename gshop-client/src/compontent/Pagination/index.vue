<template>
    <div class="pagination">
        <button :disabled="currentPage==1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
        <button v-if="startend.start>1" @click="setCurrentPage(1)">1</button>
        <button v-if="startend.start>2">···</button>

        <button v-for="(item,index) in startToEndArr" :key="index" :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>

        <button disabled v-if="startend.end<totalPages-1">···</button>
        <button v-if="startend.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
        <button :disabled="startend.start==total" @click="setCurrentPage(myCurrentPage+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            // 当前页码
            currentPage: {
                type: Number,
                default: 1,
            },
            // 总数量
            total: {
                type: Number,
                default: 0,
            },
            // 每页数量
            pageSize: {
                type: Number,
                default: 10
            },
            // 连续页码数 (一般是奇数)
            showPageNo: {
                type: Number,
                default: 5
            }
        },
        data(){
            return{
                myCurrentPage: this.currentPage || 1,//内部的当前页
            }
        },
        watch: {
            currentPage (value) {
                this.myCurrentPage = value
            }
        },

        computed:{
            //确定开始与结尾页码数
            startend(){
                const {myCurrentPage, showPageNo, totalPages} = this//总页码数
                let start//开始页码
                let end//结束页码
                /*
                start=currentPage-showPageNo/2
                end-start=showPageNo-1
                * */
                start=myCurrentPage-Math.floor(showPageNo/2)
                if (start<1){
                    start=1
                }
                end=start+showPageNo-1
                if (end>totalPages){
                    end=totalPages
                    start=end-showPageNo+1
                    if (start<1){
                        start=1
                    }
                }
                console.log(start,end)
                return{
                    start,
                    end
                }
            },
        //    确定总页码数
            totalPages(){
                return Math.ceil(this.total/this.pageSize)
            },
        //    有开始到结束页码组成的数组
            startToEndArr(){
                const {start,end} =this.startend
                let arr=[]
                for (let i=start;i<=end;i++){
                    arr.push(i)
                }
                return arr
            }
        },
        methods:{
            setCurrentPage (page) {
                if (page===this.myCurrentPage) return
                // 更新内部的当前页码
                this.myCurrentPage = page
                // 通知父组件当前页码变化了
                this.$emit('currentChange', page)
            }
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>