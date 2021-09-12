<template>
    <Row class-name="layout-header" type="flex">
        <Col :flex="isCollapsed ? '0 0 60px' : '0 0 220px'">
            <img :class="logoClasses" :src="logoSrc" alt="" />
        </Col>
        <Col flex="auto">
            <Row class-name="h100" type="flex" justify="space-between">
                <Col>
                    <Menu class="first-menu" mode="horizontal" :theme="'light'" active-name="1">
                        <MenuItem name="1">
                            <Icon type="ios-paper" />
                            数据看板
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-people" />
                            监控告警
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-stats" />
                            日志管理
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-construct" />
                            部署配置
                        </MenuItem>
                        <MenuItem name="5">
                            <Icon type="ios-construct" />
                            系统配置
                        </MenuItem>
                    </Menu>
                </Col>
                <Col>
                    <Row class-name="h100 setting" type="flex" justify="end">
                        <!-- 全屏 -->
                        <Col>
                            <Icon class="pointer" :type="fullIcon" size="24" @click="toggleScreenFull"/>
                        </Col>
                        <!-- 国际化 -->
                        <Col>
                            <Dropdown class="pointer" @on-click="changleLang">
                                {{$t('common.langList')[lang]}}
                                <Icon type="ios-arrow-down"></Icon>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="(lang, index) in languageList" :key="index" :name="lang">{{$t('common.langList')[lang]}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <!-- 通知 -->
                        <Col class="notification">
                            <Dropdown transfer-class-name="maxh500" class="pointer">
                                <Badge dot style="line-height: 24px;">
                                    <Icon type="ios-notifications-outline" size="24"/>
                                </Badge>
                                <DropdownMenu slot="list">
                                    <Tabs value="name1" style="width: 300px;">
                                        <TabPane label="通知" name="name1">
                                            <Card :padding="0" shadow>
                                                <CellGroup>
                                                    <Cell title="Only show titles" />
                                                    <Cell title="Only show titles" />
                                                    <Cell title="Only show titles" />
                                                </CellGroup>
                                            </Card>
                                        </TabPane>
                                        <TabPane label="关注" name="name2">
                                            <Card :padding="0" shadow>
                                                <CellGroup>
                                                    <Cell title="Only show titles" />
                                                </CellGroup>
                                            </Card>
                                        </TabPane>
                                        <TabPane label="待办" name="name3">
                                            <Card :padding="0" shadow>
                                                <CellGroup>
                                                    <Cell title="Only show titles" />
                                                </CellGroup>
                                            </Card>
                                        </TabPane>
                                    </Tabs>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <!-- 用户信息 -->
                        <Col>
                            <Dropdown class="pointer" @on-click="userSetting">
                                <Avatar :src="userSrc" size="small"></Avatar>
                                admin
                                <DropdownMenu slot="list">
                                    <DropdownItem name="baseInfo">基本信息</DropdownItem>
                                    <DropdownItem name="editPass">修改密码</DropdownItem>
                                    <DropdownItem name="signOut">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <!-- 额外信息 -->
                        <Col>
                            <Dropdown class="pointer">
                                <Icon type="md-more" size="24"/>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="faq">FAQ</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
import { mapGetters } from 'vuex';
import ScreenFull from 'screenfull';
import Constants from '@/constants';
import { SET_LANG } from 'store/mutations-type';
export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            isFullScreen: false,
            srcList: [
                require('assets/img/logo-small.png'),
                require('assets/img/logo.png')
            ],
            userSrc: require('assets/img/user.jpg')
        };
    },
    computed: {
        ...mapGetters(['getIsCollapsed', 'getLang']),
        isCollapsed() {
            return this.getIsCollapsed;
        },
        logoClasses() {
            return ['logo', this.isCollapsed ? 'small' : ''];
        },
        logoSrc() {
            return this.isCollapsed ? this.srcList[0] : this.srcList[1];
        },
        fullIcon() {
            return this.isFullScreen ? 'md-contract' : 'md-expand';
        },
        lang() {
            return this.getLang;
        },
        languageList() {
            return Constants.languageList;
        }
    },
    watch: {},
    created() {
        this.createdInitEvent();
    },
    mounted() {
        this.mountedInitEvent();
    },
    destroyed() {},
    methods: {
        createdInitEvent() {},
        mountedInitEvent() {},
        toggleScreenFull() {
            if (!ScreenFull.isEnabled) {
                this.$Message.warning('不支持全屏');
                return false;
            }
            ScreenFull.toggle();
            ScreenFull.onchange(() => {
                this.isFullScreen = ScreenFull.isFullscreen;
            });
        },
        changleLang(lang) {
            if (this.lang === lang) {
                return false;
            }
            this.$store.commit(SET_LANG, lang);
            this.$i18n.locale = localStorage.getItem('lang');

            // 刷新当前路由，以获取相应的国际化数据
            const { $route: { name, params, query } } = this;
            this.$router.push({
                name,
                params,
                query
            });
        },
        userSetting(name) {
            switch (name) {
                case 'baseInfo': console.log(name); break;
                case 'editPass': console.log(name); break;
                case 'signOut': this.$router.push('/login'); break;
            }
        }
    }
};
</script>

<style lang="less" scoped></style>
