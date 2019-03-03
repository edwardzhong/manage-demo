<template>
  <form class="sign-form form form-aligned">
    <div class="alert alert-danger" v-show="show">{{text}}</div>
    <fieldset>
      <div class="control-group">
        <input
          type="text"
          class="input-1"
          placeholder="Username"
          v-model="user.name"
          v-bind:class="{invalid:nameInvalid}"
          v-focus="nameInvalid"
        >
      </div>
      <div class="control-group">
        <input
          type="password"
          class="input-1"
          placeholder="Password"
          v-model="user.pass"
          v-bind:class="{invalid:passInvalid}"
          v-focus="nameInvalid"
        >
      </div>
    </fieldset>
    <button type="button" class="button input-1 button-info" @click="submit">Sign in</button>
    <div class="alert alert-info">Username is admin, Password is 8888</div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      nameInvalid: false,
      passInvalid: false,
      text: "",
      user: {
        name: "",
        pass: ""
      }
    };
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        console.log(value);
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    submit() {
      this.show = false;
      this.text = "";
      this.nameInvalid = false;
      this.passInvalid = false;
      if (!this.user.name) {
        this.showError("the user name is null");
        this.nameInvalid = true;
        return false;
      }
      if (!this.user.pass) {
        this.showError("this user password is null");
        this.passInvalid = true;
        return false;
      }
      if (this.user.name !== "admin") {
        this.showError("this user name is not exist");
        this.nameInvalid = true;
        return false;
      }
      if (this.user.pass !== "8888") {
        this.showError("this user password is wrong");
        this.passInvalid = true;
        return false;
      }
      location.href = "./index.html";
    },
    showError(text) {
      this.show = true;
      this.text = text;
    }
  }
};
</script>