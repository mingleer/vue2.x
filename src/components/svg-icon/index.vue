<template>
    <svg
        :class="classes"
        :style="styleSheets"
        aria-hidden="true"
        v-on="$listeners"
    >
        <use :xlink:href="iconId" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 2
        },
        color: {
            type: String,
            default: '#2b85e4'
        },
        customClass: {
            type: String,
            default: ''
        },
        bgColor: {
            type: String,
            default: 'transparent'
        }
    },
    computed: {
        iconId() {
            return `#icon-${this.type}`;
        },
        classes() {
            if (this.customClass) {
                return 'svg-icon ' + this.customClass;
            } else {
                return 'svg-icon';
            }
        },
        styleSheets() {
            return {
                width:
                    typeof this.size === 'number'
                        ? this.size + 'em'
                        : /^(\d|.\d|\d.\d)+(px|rem)$/.test(this.size)
                            ? this.size
                            : /^(\d|.\d|\d.\d)+$/.test(this.size)
                                ? this.size + 'em'
                                : '2em',
                height:
                    typeof this.size === 'number'
                        ? this.size + 'em'
                        : /^(\d|.\d|\d.\d)+(px|rem)$/.test(this.size)
                            ? this.size
                            : /^(\d|.\d|\d.\d)+$/.test(this.size)
                                ? this.size + 'em'
                                : '2em',
                fill: this.color,
                backgroundColor: this.bgColor
            };
        }
    }
};
</script>

<style lang="less" scoped>
.svg-icon {
    // vertical-align: -0.15em;
    vertical-align: middle;
    overflow: hidden;
}
</style>
