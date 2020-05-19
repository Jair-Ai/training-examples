const tableManager = {
  methods: {
    editedRow(e, item) {
      let aKey = item.field.key;
      let aIndex = item.index;
      if (this.show == "incorrects") {
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
      if (validator == "corrects") {
        this.fields[0].variant = "success";
        this.fields[1].variant = "success";
        this.fields[2].variant = "success";
        this.toTableCP = this.corrects;
        this.show = "corrects";
      } else if (validator == "incorrects") {
        this.fields[0].variant = "danger";
        this.fields[1].variant = "danger";
        this.fields[2].variant = "danger";
        //this.fields.Nome.variant = "danger";
        this.toTableCP = this.incorrects;

        this.show = "incorrects";
      } else {
        this.fields[0].variant = "warning";
        this.fields[1].variant = "warning";
        this.fields[2].variant = "warning";
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
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
