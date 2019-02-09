<template>
  <div class="experience">
    <div class="position">{{ position }}</div>
    <div class="company">{{ company }}</div>
    <div class="period">{{ start }} - {{ end }}</div>
    <description :description="description"></description>
  </div>
</template>

<script>
import Description from '@/components/Description.vue'

export default {
    name: "experience",
    props: {
      company: String,
      position: String,
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

.experience {

  @media (min-width: 768px) {
    display: grid;
    grid-template-areas: "position period"
                        "company company"
                        "desc desc";
    grid-template-columns: 1fr 200px;
  }

  .position {
    font-size: 120%;
    font-weight: bold;
    text-align: left;

    @media (min-width: 768px) {
      // font-size: 130%;
      grid-area: position;
    }

  }

  .company {
    
    @media (min-width: 768px) {
      grid-area: company;
    }
    
    font-weight: bold;
  }

  .period {
    font-weight: bold;
    text-align: left;

    @media (min-width: 768px) {
      grid-area: period;
      text-align: right;
    }

  }

  .description {
    @media (min-width: 768px) {
      grid-area: desc;
    }
    margin-top: 5px;
  }

}

</style>

