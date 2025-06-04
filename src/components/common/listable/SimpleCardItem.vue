<template>
    <div class="card-container">
        <div class="card-content">
            <h3>{{ title }}</h3>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        body: String
    },
    setup(props) {
        name: 'SimpleItem'
        const title = props.title;
        return {
            title
        }
    }
});
</script>

<style>
.card-content{
    height: 100%;
    width: 100%;
    padding: 3rem, 0;
    border: solid black 1px;
    background-color: #fff;
}
.card-container {
    padding: 0 0 0 1rem;
    background-color: red;
}
</style>