<template>
  <v-form
      @submit.prevent="submit"
      ref="form"
      v-model="valid"
  >
    <v-text-field
        v-model.trim="firstName"
        :rules="nameRules"
        label="First Name"
        required
    ></v-text-field>

    <v-text-field
        v-model.trim="lastName"
        :rules="lastNameRules"
        label="Last Name"
        required
    ></v-text-field>

    <v-text-field
        v-model.trim="address"
        :rules="addressRules"
        label="Address"
        required
    ></v-text-field>

    <v-text-field
        v-model="ssn"
        :rules="ssnRules"
        label="SSN"
        required
    ></v-text-field>

    <div class="d-flex justify-space-around">
    <v-btn @click="reset">Reset</v-btn>
    <v-btn  :disabled="!valid" type="submit"  color="success">Save</v-btn>
    </div>

    <v-alert  class="mt-7" type="error" dismissible dark v-model="alert">
      SSN must me unique
    </v-alert>



  </v-form>
</template>

<script>
import axios from 'axios'
export default {

  name: "FormComponent",
  data: () => ({
    valid: true,
    alert:false,
    firstName: '',
    nameRules: [
      v => !!v || 'First name is required',
      v => (v && v.length >= 1) || 'First Name must be more than 1 character',
    ],
    lastName: '',
    lastNameRules: [
      v => !!v || 'Last Name is required',
      v => (v && v.length >= 1) || 'Last Name must be more than 1 character',
    ],

    address : '',
    addressRules : [
      v => !!v || 'Address is required',
      v => (v && v.length >= 1) || 'Address must be more than 1 character',
    ],
    ssn : '',
    ssnRules: [
      v => !!v || 'SSN is required',
      v => /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/.test(v) || 'SSN must be valid',
    ],
  }),

  methods: {

    reset () {
      this.$refs.form.reset()
    },
    submit () {

      axios.post("/api/members",{
        firstName:this.firstName,
        lastName:this.lastName,
        address:this.address,
        ssn:this.ssn

      }).then(() => {
        this.$emit("memberInsertion")
        console.log("Creado con exito")
      })
      .catch(error=>{
        this.alert = true
        console.log(error)
      })
    }

  },
}
</script>

