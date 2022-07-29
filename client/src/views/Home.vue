<template>
  <div>
  <v-container>
    <v-row>
      <v-col cols="5">
        <FormComponent @memberInsertion="reloadData"/>
      </v-col>
      <v-col cols="7">
        <MembersListComponent :items="items"/>
      </v-col>

    </v-row>
  </v-container>
  </div>

</template>

<script>
import FormComponent from "@/components/FormComponent";
import MembersListComponent from "@/components/MembersListComponent";
import axios from 'axios'
export default {
  name:"Home",
  components: {MembersListComponent, FormComponent},
  methods:{
    reloadData() {
      axios.get("/api/members").then(r=>{
        this.items = r.data
      })
          .catch(error => {
            console.log(error)
          })
    }
  },
  mounted() {
    this.reloadData()
  },
  data (){
    return {
        items: []
    }
  }
}
</script>
