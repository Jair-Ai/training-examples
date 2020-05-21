import { get } from "lodash";
import {
  emailValidator,
  emailValidatorNot,
  rowEmailValidator,
  takeDupl
} from "../main";
const tableManager = {
  data() {
    return {
      toTableCP: [],
      currentPage: 1,
      corrects: {},
      incorrects: {},
      duplicates: {},
      loadedInput: {},
      row: {},
      show: "duplicates",
      showCorrects: true,
      notCorrect: false,
      testConcat: [],
      map: {},
      sample: {},
      rowColor: "warning"
    };
  },
  props: {
    transProps: {},
    perPage: { default: 20, required: true },
    fields: { type: Array, required: true }
  },
  computed: {
    firstRow() {
      return get(this, "sample.0");
    }
  },
  watch: {
    show: function() {
      if (this.show == "corrects") {
        this.rowColor = "primary";
      } else if (this.show == "incorrects") {
        this.rowColor = "danger";
      } else {
        this.rowColor = "warning";
      }
    }
  },
  mounted() {
    // Set the initial number of items
    this.rows = this.toTableCP.length;
    this.show = "incorrects";
  },
  methods: {
    editedRow(e, item) {
      let aKey = item.field.key;
      let aIndex = item.index;
      console.log(this.incorrects);
      if (this.show == "incorrects") {
        console.log(this.incorrects);
        this.incorrects[aIndex][aKey] = e;
      } else if (this.show == "duplicates") {
        this.duplicates[aIndex][aKey] = e;
      }
      this.testConcat = [
        ...this.corrects,
        ...this.incorrects,
        ...this.duplicates
      ];
      //this.loadedInput[aIndex][aKey] = e;
      let validReg = rowEmailValidator.isValidSync(e);
      if (validReg) {
        this.separateIncorrectsFromCorrects(this.testConcat);
      }
    },
    deleteRow(event) {
      console.log("Disparado deleteRow");
      if (this.show == "incorrects") {
        console.log(this.incorrects);
        console.log(event);
        this.incorrects.splice(event.index, 1);
      } else {
        this.duplicates.splice(event.index, 1);
      }
      console.log(this.incorrects);
    },
    checkMapPosition() {
      let colNome = this.sample[0].indexOf(this.map.name);
      let colEmail = this.sample[0].indexOf(this.map.email);
      let colTelefone = this.sample[0].indexOf(this.map.telefone);
      var objectToTable = [];
      for (let i = 0; i < this.sample.length; i++) {
        var item = {};
        item[this.fields[0].key] = this.sample[i][colNome];
        item[this.fields[1].key] = this.sample[i][colEmail];
        item[this.fields[2].key] = this.sample[i][colTelefone];
        objectToTable.push(item);
      }
      this.separateIncorrectsFromCorrects(objectToTable);
    },
    change(validator) {
      console.log("mudou para corrects");
      if (validator == "corrects") {
        this.toTableCP = this.corrects;
        this.show = "corrects";
      } else if (validator == "incorrects") {
        this.toTableCP = this.incorrects;
        this.show = "incorrects";
      } else {
        this.toTableCP = this.duplicates;
        this.show = "duplicates";
      }
    },
    async separateIncorrectsFromCorrects(file) {
      this.tableone = true;
      this.incorrects = await emailValidatorNot(file);
      this.corrects = await emailValidator(file);
      let dupl = takeDupl(this.corrects, "email");
      this.corrects = dupl[0];
      this.duplicates = dupl[1];
      if (this.incorrects.length > 0) {
        this.show = "incorrects";
        this.toTableCP = this.incorrects;
        this.coloredIncorrects;
      } else {
        this.toTableCP = this.corrects;
        this.show = "corrects";
      }
    }
  }
};

export { tableManager };
