export default {
    created() {
        this.getUserList();
    },
data() {
      return {
        tableData: [],
      }
    },
    methods: {
        async getUserList(){
        const res=await this.$http.get("/rights/list")
        const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
}
    }
}