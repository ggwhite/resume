<template>
  <div class="text-left">
    <div v-if="typeof summary === 'string'">{{ summary }}</div>
    <ul v-if="Array.isArray(summary)" class="pl-5 mb-2 list-disc">
      <li v-for="row in summary" :key="row">{{ row }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SummaryQualification',
  props: {
    summary: [String, Array],
  },
}
</script>
