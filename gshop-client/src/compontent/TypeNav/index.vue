<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="ishidenFirst" @mouseenter="isshowFirst">
                <h2 class="all">全部商品分类</h2>
                <transition name="move">
                    <div class="sort" v-show="isshowlist">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item" :class="{item_on:index===isshowindex}"
                                 v-for="(c1,index) in baseCategoryList" :key="c1.categoryId" @mouseenter="showCategoryList(index)">
                                <h3>
                                    <a href="javascript:" :data-categoryName="c1.categoryName"
                                       :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a href="javascript:" :data-categoryName="c2.categoryName"
                                                   :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a href="javascript:" :data-categoryName="c3.categoryName"
                                                       :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>


        </div>
    </div>
</template>

<script>
    // import {mapState} from "vuex"
    import throttle from "lodash/throttle"

    export default {
        name: 'TypeNav',
        data() {
            return {
                isshowindex: -2,
                isshowlist: true
            }
        },
        methods: {
            showCategoryList: throttle(function (index) {
                if (this.isshowindex == -2) return
                console.log(index)
                this.isshowindex = index
            }, 200),
            toSearch(event) {
                if (event.target.tagName.toUpperCase() !== "A") return
                // console.log(event.target.dataset)
                const {categoryname, category1id, category2id, category3id} = event.target.dataset
                let query = {
                    categoryName: categoryname
                }
                console.log(category1id, category2id, category3id)
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else if (category3id) {
                    query.category3Id = category3id
                }
                const localtion = {
                    name: "search",
                    query,
                    params: this.$route.params
                }
                if (this.$route.name==='search') {
                    this.$router.replace(localtion)
                } else {
                    this.$router.push(localtion)
                }
                this.isshowlist = false
            },
            isshowFirst() {
                this.isshowindex = -1
                this.isshowlist = true
            },
            ishidenFirst() {
                this.isshowindex = -2
                if (this.$route.path === "/home") return
                this.isshowlist = false
            }
            /*
            控制下拉列表显示
            * */

        },
        computed: {
            // ...mapState({
            //   baseCategoryList:state => state.home.baseCategoryList
            // }),
            baseCategoryList() {
                return this.$store.state.home.baseCategoryList
            }
        },
        mounted() {
            if (this.$route.path === "/home") {
                this.isshowlist = true
            } else {
                this.isshowlist = false

            }
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                &.move-enter-active, &.move-leave-active { /* 显示的过渡 */
                    transition: all .5s
                }

                &.move-enter, &.move-leave-to {
                    opacity: 0;
                    height: 0;
                }

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            _height: 200px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item_on {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
