<template>
  <div class="education">
    <div class="degree">{{ degree }}</div>
    <div class="period">{{ start }} - {{ end }}</div>
    {{ school }}
  </div>
</template>

<script>
import Description from '@/components/Description.vue'

export default {
    name: "education",
    props: {
      degree: String,
      school: String,
      start: String,
      end: String,
      description: String | Object
    },
    components: {
      Description
    }
}
</script>

<style lang="less" scoped>

.education {

  @media (min-width: 768px) {
    display: grid;
    grid-template-areas: "degree period"
                         "school school";
    grid-template-columns: 1fr 200px;
  }

  .degree {
    font-weight: bold;
  }

  .period {
    font-weight: bold;
    margin-bottom: 5px;

    @media (min-width: 768px) {
      grid-area: period;
      text-align: right;
    }
  }

}

</style>

