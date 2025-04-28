<template>
    <div>
        <h1>All Routes</h1>
        <ul>
            <router-link v-for="(item,i) in routes.slice(1)" :key="item.path" :to="item.path">游戏{{i+1}}</router-link>
        </ul>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'ViewAll',
    setup() {
        const router = useRouter();
        const routes = router.getRoutes();
        console.log(routes);
        return {
            routes
        };
    }
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 5px 0;
}
</style>