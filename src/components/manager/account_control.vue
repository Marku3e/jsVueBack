<template>
  <div id="account_control">
    <comTable></comTable>
  </div>
</template>

<script>
  import comTable from '../common/com_table'

  export default {
    name: "account_control",
    components: {
      comTable
    },
    data() {
      return {
        logoMsg: '111222333'
      }
    },
    created() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
