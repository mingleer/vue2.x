<template>
    <div class="operate-wrap">
        <a
            v-if="showView"
            class="operate operate-view"
            :title="this.$t('common.text.btn.view')"
            @click="viewCallback"
        >
            <i class="fa fa-fw fa-eye"></i>
        </a>
        <a
            v-if="showEdit"
            class="operate operate-edit"
            :title="this.$t('common.text.btn.edit')"
            @click="editCallback"
        >
            <i class="fa fa-fw fa-edit"></i>
        </a>
        <a
            v-if="showDelete"
            class="operate operate-delete"
            :title="this.$t('common.text.btn.delete')"
            @click="deleteCallback"
        >
            <i class="fa fa-fw fa-trash"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Operate',
    props: {
        showView: {
            type: Boolean,
            default: true
        },
        viewCallback: {
            type: Function,
            default: () => {}
        },
        showEdit: {
            type: Boolean,
            default: true
        },
        editCallback: {
            type: Function,
            default: () => {}
        },
        showDelete: {
            type: Boolean,
            default: true
        },
        deleteCallback: {
            type: Function,
            default: () => {}
        }
    }
};
</script>
<style lang="less" scoped>
.operate-wrap {
    .operate {
        color: #515a6e;
        margin-right: 8px;

        &-view {
            &:hover,
            &:visited {
                color: #0bffb1;
            }
        }

        &-edit {
            &:hover,
            &:visited {
                color: #029be8;
            }
        }

        &-delete {
            &:hover,
            &:visited {
                color: #fa4230;
            }
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
