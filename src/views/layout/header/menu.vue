<template>
    <Menu
        class="first-menu"
        mode="horizontal"
        :theme="'light'"
        :active-name="currentMenu"
        @on-select="changeCurrentMenu"
    >
        <MenuItem
            v-for="menuItem in menuList"
            :key="menuItem.name"
            :name="menuItem.name"
        >
            <Icon :type="menuItem.icon" />
            {{ menuItem.name }}
        </MenuItem>
    </Menu>
</template>

<script>
export default {
    name: 'FirstMenu',
    data() {
        return {
            menuList: [],
            currentMenu: ''
        };
    },
    created() {
        let routes = this.$router.options.routes;
        routes.forEach((route) => {
            if (route.name === 'layout') {
                this.menuList = route.children;
                this.currentMenu = this.menuList[0].name;
            }
        });
        console.log(this.menuList);
    },
    methods: {
        changeCurrentMenu(name) {
            this.$router.push({ name });
        }
    }
};
</script>

<style lang="less" scoped>
</style>
