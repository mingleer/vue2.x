<template>
    <Alert v-if="show" class="alert-wrap" :type="type" :show-icon="showIcon" :closable="closable" @on-close="onClose">
        {{ $t(title) }}
        <template v-if="desc" slot="desc">
            {{ $t(desc) }}
        </template>
    </Alert>
</template>
<script>
export default {
    name: 'CustomAlert',
    props: {
        type: {
            type: String,
            default: 'error'
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        closable: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 1500
        }
    },
    data() {
        return {
            show: false,
            timer: null
        };
    },
    mounted() {
        this.timer = setTimeout(() => {
            this.show = false;
            this.clearTimer();
        }, this.duration);
    },
    watch: {
        show(val) {
            if (val && this.duration) {
                this.timer = setTimeout(() => {
                    this.show = false;
                    this.clearTimer();
                }, this.duration);
            }
        }
    },
    destroyed() {
        this.clearTimer();
    },
    methods: {
        onClose(event) {
            console.log(event);
            this.$emit('on-close', event);
        },
        clearTimer() {
            this.timer && clearTimeout(this.timer);
            this.timer = null;
        }
    }
};
</script>

<style lang="less" scoped>
.alert-wrap {
    position: fixed;
    top: 30px;
    left: 50%;
    z-index: 99999;
    transform: translateX(-50%);
}
</style>
