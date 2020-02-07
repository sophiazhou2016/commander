<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive" />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true,
        };
    },
    created() {
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
    }
};
</script>
