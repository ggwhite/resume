<template>
  <div class="description">
    <div v-if="typeof description === 'string'">
      {{ description }}
    </div>
    <ul v-if="typeof description === 'object' && Array.isArray(description)">
      <li v-for="(desc, idx) in description" :key="idx">
        {{ desc }}
      </li>
    </ul>
    <ul v-if="typeof description === 'object' && !Array.isArray(description)">
      <li v-for="(desc, main) in description" :key="main">
        <label>{{ main }}</label>
        <description :description="desc"></description>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "description",
    props: {
      description: String | Object
    },
}
</script>

<style lang="less" scoped>

.description {
  
  @media (min-width: 768px) {

  }

  ul {
    margin-bottom: 0.5rem;
    padding-left: 10px;
    
    @media (min-width: 768px) {
      padding-left: 40px;
    }

    li {
      margin-bottom: 5px;
    }
  }

  label {
    font-weight: bold;
    margin-bottom: 0.1rem;
  }

}

</style>

