<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>name</th>
                    <th>amount</th>
                    <th>operate</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" v-bind:key="itme.id">
                    <td>{{item.name}}</td>
                    <td>{{item.num}}</td>
                    <td>
                        <button class="button button-primary" @click="update(item)">edit</button>
                        <button class="button button-success" @click="remove(item.id)">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <edit-dialog></edit-dialog>
        <tip></tip>
    </div>
</template>
<script>
import dialog from "../common/dialog.vue";
import tip from "../common/tip.vue";

export default {
    computed: {
        list: function() {
            return this.$store.getters.list;
        }
    },
    components: {
        "edit-dialog": dialog,
        tip
    },
    created() {
        this.$store.commit("init", [
            {
                id: 1,
                name: "Chuck Norris",
                num: 10000
            },
            {
                id: 2,
                name: "Bruce Lee",
                num: 9000
            },
            {
                id: 3,
                name: "Jackie Chan",
                num: 7000
            },
            {
                id: 4,
                name: "Jet Li",
                num: 8000
            }
        ]);
    },
    methods: {
        update(obj) {
            this.$store.commit("openDialog", obj);
        },
        remove(id) {
            let self = this;
            this.$store.commit("openTip", {
                text: "确定删除该项 ？",
                callback: function() {
                    self.$store.commit("remove", id);
                    self.$store.commit("closeTip");
                }
            });
        }
    },
    filters: {
        uperCase(value) {
            return value.toUpperCase();
        }
    }
};
</script>