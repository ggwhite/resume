<template>
  <div class="main-head">
    <b class="name">{{ name }}</b>
    <b class="position">{{ position }}</b>
    <a :href="pdf" alt="Download PDF" class="download">
      <span class="fa fa-download"></span>
      PDF
    </a>
  </div>
</template>

<script>
export default {
    name: "main-head",
    props: {
      name: String,
      position: String,
      pdf: String,
    }
}
</script>

<style lang="less" scoped>

.main-head {
  position: relative;
  display: grid;

  @media (min-width: 768px) {
    display: block; 
  }

  b {
    margin-right: 20px;
  }

  .name {
    font-size: 150%;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 300%;
    }
  }

  .position {
    font-size: 130%;
    font-weight: bold;
    color: #888;
    @media (min-width: 768px) {
      font-size: 150%;
    }
  }

  .download {
    display: none;
    padding: 5px;

    .fa {
      margin-right: 5px;
    }

    @media print {
      display: none;
    }

    @media (min-width: 768px) {
      display: block;
      position: absolute;
      right: 30px;
      bottom: -40px;
    }
  }

}

</style>

