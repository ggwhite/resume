<template>
  <div class="summary-qualification">
    <div v-if="typeof summary === 'string'">
        {{ summary }}
    </div>
    <ul v-if="Array.isArray(summary)">
        <li v-for="row in summary" :key="row">{{ row }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "summary-qualification",
    props: {
        summary: String | Array
    },
}
</script>

<style lang="less" scoped>

.summary-qualification {
    text-align: left;

    ul {
        margin-bottom: 0.5rem;
        padding-left: 20px;
        
        @media (min-width: 768px) {

        }
    }
    
}

</style>

