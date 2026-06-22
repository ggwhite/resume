<template>
  <div class="md:mr-10 md:grid md:grid-cols-[1fr_200px]">
    <div class="font-bold">{{ degree }}</div>
    <div class="font-bold mb-1 md:text-right">{{ start }} - {{ end }}</div>
    <div class="md:col-span-2">{{ school }}</div>
  </div>
</template>

<script>
export default {
  name: 'Education',
  props: {
    degree: String,
    school: String,
    start: String,
    end: String,
  },
}
</script>
