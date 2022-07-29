<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Last name
        </th>
        <th class="text-left">
          Address
        </th>
        <th class="text-left">
          SSN
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in getItems"
          :key="item.ssn"
      >
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.ssn }}</td>

      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "MembersListComponent",
  props:{
    items:[]
  },
  computed:{
    getItems: function () {
      return this.items
    }
  }
}
</script>

