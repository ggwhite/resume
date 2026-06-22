<template>
  <div class="md:mr-10 md:grid md:grid-cols-[1fr_200px] mb-2">
    <div class="font-bold">{{ name }}</div>
    <div class="font-bold mb-1 md:text-right">{{ start }} - {{ end }}</div>
    <Description :description="description" class="md:col-span-2" />
  </div>
</template>

<script>
import Description from './Description.vue'

export default {
  name: 'Project',
  components: { Description },
  props: {
    name: String,
    start: String,
    end: String,
    description: [String, Object, Array],
  },
}
</script>
