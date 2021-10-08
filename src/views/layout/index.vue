<template>
    <Layout class="layout">
        <Header>
            <LayoutHeader></LayoutHeader>
        </Header>
        <Layout>
            <Sider ref="slider" v-model="isCollapsed" :width="220" :collapsed-width="60" collapsible hide-trigger>
                <LayoutAside @collapsedSider="collapsedSider"></LayoutAside>
            </Sider>
            <Layout>
                <Header class="layout-tabs">Tabs</Header>
                <Content>
                    <Layout>
                        <Header>PageHeader</Header>
                        <Content>
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    </Layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { SET_MENU_COLLAPSED } from 'store/mutations-type';

import LayoutHeader from './header';
import LayoutAside from './aside';
export default {
    name: 'CustomLayout',
    components: {
        LayoutHeader,
        LayoutAside
    },
    data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        ...mapGetters(['getIsCollapsed'])
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
        createdInitEvent() {
            this.isCollapsed = this.getIsCollapsed;
        },
        mountedInitEvent() {},
        collapsedSider() {
            this.$refs.slider.toggleCollapse();
            this.$store.commit(SET_MENU_COLLAPSED, this.isCollapsed);
        }
    }
};
</script>
