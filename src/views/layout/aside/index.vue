<template>
    <div class="layout-aside">
        <div class="menu-list"></div>
        <div class="collapsed-toggle">
            <Icon
                class="fa fa-fw pointer"
                :custom="isCollapsed ? 'fa-indent' : 'fa-dedent'"
                size="20"
                @click.native="collapsedSider"
            ></Icon>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'LayoutAside',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['getIsCollapsed']),
        isCollapsed() {
            return this.getIsCollapsed;
        }
    },
    destroyed() {},
    methods: {
        mountedInitEvent() {},
        collapsedSider() {
            this.$emit('collapsedSider');
        }
    }
};
</script>
