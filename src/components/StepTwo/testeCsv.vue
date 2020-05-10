<template>
  <div>
    <div class="form">
      <div>
        <div class="form-check form-group csv-import-checkbox" v-if="headers === null">
          <slot name="hasHeaders" :headers="hasHeaders" :toggle="toggleHasHeaders">
            <input
              :class="checkboxClass"
              type="checkbox"
              :id="makeId('hasHeaders')"
              :value="hasHeaders"
              @change="toggleHasHeaders"
            />
            <label class="form-check-label" :for="makeId('hasHeaders')">File Has Headers</label>
          </slot>
        </div>
        <div class="form-group csv-import-file">
          <b-form-file
            ref="csv"
            accept=".csv"
            type="file"
            @change.prevent="load"
            :class="inputClass"
            name="csv"
          />
          <slot name="error" v-if="showErrorMessage">
            <div class="invalid-feedback d-block">File type is invalid</div>
          </slot>
        </div>
        <div class="leftButton form-group" v-if="loadbutton">
          <slot name="next" :load="load">
            <button
              type="submit"
              :disabled="disabledNextButton"
              :class="buttonClass"
              @click.prevent="load"
            >{{ loadBtnText }}</button>
          </slot>
        </div>
      </div>
      <div class="vue-csv-uploader-part-two">
        <div class="vue-csv-mapping" v-if="sample">
          <table :class="tableClass">
            <slot name="thead">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>CSV Column</th>
                </tr>
              </thead>
            </slot>
            <tbody>
              <tr v-for="(field, key) in fieldsToMap" :key="key">
                <td>{{ field.label }}</td>
                <td>
                  <select
                    class="form-control"
                    :name="`csv_uploader_map_${key}`"
                    v-model="map[field.key]"
                  >
                    <option v-for="(column, key) in firstRow" :key="key" :value="key">{{ column }}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="leftButton form-group" v-if="url">
            <slot name="submit" :submit="submit">
              <input
                type="submit"
                :class="buttonClass"
                @click.prevent="submit"
                :value="submitBtnText"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { drop, every, forEach, get, isArray, map, set } from "lodash";
import axios from "axios";
import Papa from "papaparse";
import mimeTypes from "mime-types";
import { EventBus } from "../../main";

export default {
  props: {
    value: String,
    url: {
      type: String
    },
    mapFields: {
      required: true
    },
    callback: {
      type: Function,
      default: () => ({})
    },
    catch: {
      type: Function,
      default: () => ({})
    },
    finally: {
      type: Function,
      default: () => ({})
    },
    parseConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    headers: {
      default: null
    },
    loadBtnText: {
      type: String,
      default: "Next"
    },
    loadbutton: {
      type: Boolean,
      default: false
    },
    submitBtnText: {
      type: String,
      default: "Submit"
    },
    tableClass: {
      type: String,
      default: "table"
    },
    checkboxClass: {
      type: String,
      default: "form-check-input"
    },
    buttonClass: {
      type: String,
      default: "btn btn-primary"
    },
    inputClass: {
      type: String,
      default: "form-control-file"
    },
    validation: {
      type: Boolean,
      default: true
    },
    fileMimeTypes: {
      type: Array,
      default: () => {
        return [
          "text/csv",
          "text/x-csv",
          "application/vnd.ms-excel",
          "text/plain"
        ];
      }
    }
  },

  data: () => ({
    form: {
      csv: null
    },
    fieldsToMap: [],
    map: {},
    hasHeaders: true,
    csv: null,
    sample: null,
    isValidFileMimeType: false,
    fileSelected: false
  }),

  created() {
    this.hasHeaders = this.headers;

    if (isArray(this.mapFields)) {
      this.fieldsToMap = map(this.mapFields, item => {
        return {
          key: item,
          label: item
        };
      });
    } else {
      this.fieldsToMap = map(this.mapFields, (label, key) => {
        return {
          key: key,
          label: label
        };
      });
    }
  },

  methods: {
    submit() {
      const _this = this;
      this.form.csv = this.buildMappedCsv();
      EventBus.$emit("inputCsv", this.form.csv);
      if (this.url) {
        axios
          .post(this.url, this.form)
          .then(response => {
            _this.callback(response);
          })
          .catch(response => {
            _this.catch(response);
          })
          .finally(response => {
            _this.finally(response);
          });
      } else {
        _this.callback(this.form.csv);
      }
    },
    buildMappedCsv() {
      const _this = this;

      let csv = this.hasHeaders ? drop(this.csv) : this.csv;
      console.log(csv);

      return map(csv, row => {
        let newRow = {};

        forEach(_this.map, (column, field) => {
          set(newRow, field, get(row, column));
        });

        return newRow;
      });
    },

    validFileMimeType() {
      let file = this.$refs.csv.selectedFile;
      const mimeType =
        file.type === "" ? mimeTypes.lookup(file.name) : file.type;

      if (file) {
        this.fileSelected = true;
        this.isValidFileMimeType = this.validation
          ? this.validateMimeType(mimeType)
          : true;
      } else {
        this.isValidFileMimeType = !this.validation;
        this.fileSelected = false;
      }
    },
    validateMimeType(type) {
      return this.fileMimeTypes.indexOf(type) > -1;
    },
    onFileChange() {
      var _this = this;
      console.log(_this.$refs.csv["$refs"]["input"].files[0]);
    },

    load() {
      const _this = this;
      console.log(_this);
      this.readFile(output => {
        _this.sample = get(
          Papa.parse(output, { preview: 2, skipEmptyLines: true }),
          "data"
        );
        _this.csv = get(Papa.parse(output, { skipEmptyLines: true }), "data");
      });
    },
    readFile(callback) {
      let file = this.$refs.csv["$refs"]["input"].files[0];

      if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
          callback(evt.target.result);
        };
        reader.onerror = function() {};
      }
    },
    toggleHasHeaders() {
      this.hasHeaders = !this.hasHeaders;
    },
    makeId(id) {
      return `${id}${this._uid}`;
    }
  },
  watch: {
    map: {
      deep: true,
      handler: function(newVal) {
        if (!this.url) {
          let hasAllKeys = Array.isArray(this.mapFields)
            ? every(this.mapFields, function(item) {
                return newVal(item);
              })
            : every(this.mapFields, function(item, key) {
                return newVal(key);
              });
          console.log("chamou a função map");
          if (hasAllKeys) {
            this.submit();
          }
        }
      }
    }
  },
  computed: {
    firstRow() {
      return get(this, "sample.0");
    },
    showErrorMessage() {
      return this.fileSelected && !this.isValidFileMimeType;
    },
    disabledNextButton() {
      return !this.isValidFileMimeType;
    }
  }
};
</script>
<style scoped>
.leftButton {
  margin-left: 0;
  float: right;
}
</style>
