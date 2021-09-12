<template>
    <article class="login-wrap">
        <Row type="flex" justify="end">
            <Col>
                <Dropdown @on-click="changleLang">
                    <span class="login-lang">
                        {{$t('common.langList')[lang]}}
                        <Icon type="ios-arrow-down"></Icon>
                    </span>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(lang, index) in languageList" :key="index" :name="lang">{{$t('common.langList')[lang]}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
        <section class="login">
            <div class="login-form">
                <Divider>{{$t('login.title')}}</Divider>
                <Form ref="loginForm" :model="loginForm">
                    <FormItem>
                        <Input v-model="loginForm.username" prefix="ios-contact-outline" :placeholder="$t('common.form.username')"></Input>
                    </FormItem>
                    <FormItem>
                        <Input v-model="loginForm.password" type="password" prefix="ios-lock-outline" :placeholder="$t('common.form.password')" password></Input>
                    </FormItem>
                    <Row type="flex" justify="space-between" style="margin-bottom: 0.24rem;">
                        <Col span="10">
                            <Input v-model="loginForm.validCode" prefix="ios-keypad-outline" :placeholder="$t('common.form.validCode')"></Input>
                        </Col>
                        <Col span="8" id="validCode" :title="$t('common.form.refreshValidCode')"></Col>
                    </Row>
                    <Row type="flex" justify="space-between" style="margin-bottom: 0.24rem;">
                        <Col>
                            <Checkbox v-model="loginForm.isRememberPass">{{$t('login.rememberPass')}}</Checkbox>
                        </Col>
                    </Row>
                    <FormItem>
                        <Button type="primary" long @click="validLoginInfo">{{$t('common.text.btn.loginIn')}}</Button>
                    </FormItem>
                </Form>
                <Divider plain style="margin-top: 0.4rem;">{{$t('login.thirdParty')}}</Divider>
                <Row type="flex" justify="space-around">
                    <Col v-for="(item, index) in partnerList" :key="index">
                        <Avatar :src="item.icon" :title="item.desc" size="22" shape="square"/>
                    </Col>
                </Row>
            </div>
        </section>
    </article>
</template>

<script>
import GVerify from 'assets/js/gVerify.js';
import { mapGetters } from 'vuex';
import Constants from '@/constants';
import { SET_LANG } from 'store/mutations-type';
import * as Interface from './interface';
export default {
    name: 'Login',
    components: {},
    props: {},
    data() {
        return {
            isFullScreen: false,
            loginForm: {
                username: '',
                password: '',
                validCode: '',
                isRememberPass: false
            },
            codeCanvas: null
        };
    },
    computed: {
        ...mapGetters(['getLang']),
        partnerList() {
            return Constants.partnerList;
        },
        lang() {
            return this.getLang;
        },
        languageList() {
            return Constants.languageList;
        }
    },
    created() {
        this.createdInitEvent();
    },
    mounted() {
        this.mountedInitEvent();
    },
    beforeDestroy() {
        const { shortcutSubmit } = this;
        window.removeEventListener('keydown', shortcutSubmit);
    },
    methods: {
        createdInitEvent() {},
        mountedInitEvent() {
            const { createCodeCanvas, shortcutSubmit } = this;
            createCodeCanvas();
            window.addEventListener('keydown', shortcutSubmit);
            let userInfo = localStorage.getItem(window.btoa('userInfo'));
            if (userInfo) {
                this.loginForm.isRememberPass = true;
                this.loginForm.username = window.atob(userInfo).split('&')[0].split('=')[1];
                this.loginForm.password = window.atob(userInfo).split('&')[1].split('=')[1];
            }
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
        // 记住密码功能
        changeRememberStatus(isRememberPass) {
            if (isRememberPass) {
                const { loginForm: { username, password } } = this;
                let userInfo = `US=${username}&PS=${password}`;
                localStorage.setItem(window.btoa('userInfo'), window.btoa(userInfo));
            } else {
                localStorage.removeItem(window.btoa('userInfo'));
            }
        },
        createCodeCanvas() {
            this.codeCanvas = new GVerify({
                id: 'validCode'
            });
        },
        validLoginInfo() {
            const { codeCanvas, loginForm: { validCode } } = this;
            let result = codeCanvas.validate(validCode);
            if (!result) {
                this.$Message.error({
                    content: `${this.$t('common.form.validatorInfo.validCode')}`,
                    duration: 1.5,
                    background: true
                });
                return false;
            }
            this.submitLoginInfo();
        },
        submitLoginInfo() {
            const { loginForm: { username, password, isRememberPass }, changeRememberStatus } = this;
            let params = {
                username: username,
                password: password
            };
            Interface.getAdminInfo(params).then(data => {
                if (data) {
                    const { token, accountInfo, systemInfo } = data;
                    changeRememberStatus(isRememberPass);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('accountInfo', JSON.stringify(accountInfo));
                    sessionStorage.setItem('systemInfo', JSON.stringify(systemInfo));
                    this.$router.push('/');
                }
            });
        },
        shortcutSubmit(e) {
            if (e.keyCode === 13) {
                this.validLoginInfo();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;

    &-wrap {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: url('../../assets/img/login-bg.jpg') no-repeat center;
        background-size: cover;
        position: relative;
    }

    &-form {
        align-self: center;
        width: 360px;
        padding: .2rem .5rem .3rem;
        background-color: #fff;
        box-shadow: 0 0 0.2rem .02rem rgba(255, 255, 255, .6);
        border-radius: 0.04rem;
    }

    &-lang {
        display: inline-block;
        margin: 0.2rem 0.4rem 0;
        color: #fff;
    }
}
</style>
