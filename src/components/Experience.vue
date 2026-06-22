<template>
  <div class="border-b-2 border-dashed border-gray-300 mx-2.5 mb-2.5 pb-2.5 last:border-b-0
              md:mx-0 md:mr-10 md:grid md:grid-cols-[1fr_200px]">
    <div class="text-lg font-bold">{{ position }}</div>
    <div class="font-bold md:text-right">{{ start }} - {{ end }}</div>
    <div class="font-bold md:col-span-2">{{ company }}</div>
    <Description :description="description" class="mt-1 md:col-span-2" />
  </div>
</template>

<script>
import Description from './Description.vue'

export default {
  name: 'Experience',
  components: { Description },
  props: {
    company: String,
    position: String,
    start: String,
    end: String,
    description: [String, Object],
  },
}
</script>
