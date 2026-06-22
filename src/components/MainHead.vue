<template>
  <div class="relative mb-2.5 md:grid md:block">
    <b class="text-2xl md:text-5xl font-bold mr-5">{{ name }}</b>
    <b class="text-xl md:text-2xl font-bold text-gray-400">{{ position }}</b>
  </div>
</template>

<script>
export default {
  name: 'MainHead',
  props: {
    name: String,
    position: String,
  },
}
</script>
