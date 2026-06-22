<template>
  <div>
    <template v-if="typeof description === 'string'">{{ description }}</template>
    <ul v-else-if="Array.isArray(description)" class="pl-5 mb-2 list-disc">
      <li v-for="(item, i) in description" :key="i" class="mb-1">{{ item }}</li>
    </ul>
    <ul v-else-if="typeof description === 'object'" class="pl-2.5 md:pl-10 mb-2 list-none">
      <li v-for="(desc, title) in description" :key="title" class="mb-1">
        <label class="font-bold mb-0.5 block">{{ title }}</label>
        <Description :description="desc" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    description: [String, Object, Array],
  },
}
</script>
