<template>
    <div class="loading-wrap" :style="maskStyle" v-if="show">
        <div class="loading" :class="type">
            <div class="loading-shape">
                <div class="shape"></div>
                <div class="shape"></div>
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <div class="loading-text">{{ text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomLoading',
    props: {
        type: {
            type: String,
            default: 'animation4'
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        height: {
            type: [Number, String],
            default: '100%'
        },
        bgColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0.8)'
        },
        text: {
            type: String,
            default: 'Loading...'
        }
    },
    computed: {
        maskStyle() {
            const { width, height, bgColor, formattUnit } = this;
            let [w, h] = ['', ''];
            w = formattUnit(width);
            h = formattUnit(height);

            return {
                width: w,
                height: h,
                backgroundColor: bgColor
            };
        }
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        formattUnit(data) {
            let temp = '';
            if (typeof data === 'number') {
                temp = data + 'px';
            } else {
                if (data.indexOf('%') === '-1') {
                    temp = data + 'px';
                } else {
                    temp = data;
                }
            }
            return temp;
        }
    }
};
</script>
