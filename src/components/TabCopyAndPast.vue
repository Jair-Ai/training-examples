<template>
  <b-container fluid>
    <b-row>
      <textarea
        class="form-control"
        id="textarea"
        v-model="text"
        placeholder="É simples, é só copiar do excell e colar aqui!"
        rows="3"
        max-rows="6"
        @input="print"
      ></textarea>
    </b-row>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Type to Search"
        ></b-form-input>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-pagination
          v-if="rows >= perPage"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        v-if="tableone"
        striped
        hover
        :items="toTable"
        small
        primary-key="a"
        :tbody-transition-props="transProps"
        :per-page="perPage"
        :current-page="currentPage"
      ></b-table>
      <b-button v-if="tableone" type="submit" variant="primary"
        >Salvar e avançar</b-button
      >
    </b-row>
  </b-container>
</template>

<script>
export default {
    name: 'TabCopyAndPast',
    data () {
        text: "",
        
    }

};
</script>

<style></style>
