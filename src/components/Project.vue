<template>
  <div class="project">
    <div class="name">{{ name }}</div>
    <div class="period">{{ start }} - {{ end }}</div>
    <description :description="description"></description>
  </div>
</template>

<script>
import Description from '@/components/Description.vue'

export default {
    name: "project",
    props: {
      name: String,
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

.project {

  @media (min-width: 768px) {
    display: grid;
    grid-template-areas: "name period"
                         "desc desc";
    grid-template-columns: 1fr 200px;
  }

  .name {
    font-weight: bold;

    @media (min-width: 768px) {
      grid-area: name;
    }
  }

  .period {
    font-weight: bold;
    margin-bottom: 5px;

    @media (min-width: 768px) {
      grid-area: period;
      text-align: right;
    }
  }

  .description {
    @media (min-width: 768px) {
      grid-area: desc;
    }
  }

}

</style>

