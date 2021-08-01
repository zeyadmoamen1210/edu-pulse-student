

<template>
  <div class="login-page" :class="[$i18n.locale === 'en' ? 'BgEng' : '']">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-7 col-sm-12 image">
          <img
            v-if="$i18n.locale === 'ar'"
            src="@/assets/imgs/login.png"
            class="img-fluid"
            alt=""
          />
          <img
            v-else-if="$i18n.locale === 'en'"
            src="@/assets/imgs/EngLogin.png"
            class="img-fluid"
            alt=""
          />
        </div>
        <div
          class="col-lg-3 col-md-5 col-sm-12 loginForm"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div class="login-form-container">
            <el-form :model="loginForm" ref="loginForm" class="loginForm">
              <div class="row">
                <div class="col-md-12 sub-title">
                  <h4>{{ $t("auth.Code") }}</h4>
                  <p @click="getdata">{{ $t("auth.CodeNote") }}</p>
                  <div class="d-flex">
                    <input
                      maxlength="1"
                      id="index-1"
                      class="form-control"
                      type="text"
                      v-model="loginForm.code1"
                    />
                    <input
                      maxlength="1"
                      id="index-2"
                      class="form-control"
                      type="text"
                      v-model="loginForm.code2"
                    />
                    <input
                      maxlength="1"
                      id="index-3"
                      class="form-control"
                      type="text"
                      v-model="loginForm.code3"
                    />
                    <input
                      maxlength="1"
                      id="index-4"
                      class="form-control"
                      type="text"
                      v-model="loginForm.code4"
                    />
                    <input
                      maxlength="1"
                      id="index-5"
                      class="form-control"
                      type="text"
                      v-model="loginForm.code5"
                    />
                  </div>
                  <el-form-item>
                    <el-button
                      class="first-btn"
                      type="primary"
                      @click="submitForm('loginForm')"
                    >
                      {{ $t("auth.Verify") }}
                    </el-button>
                  </el-form-item>
                  <p
                    @click="resetCode"
                    class="subNote"
                    :class="[isArabic ? 'text-left' : 'text-right']"
                  >
                    {{ $t("auth.subNote") }}
                  </p>
                </div>
              </div>
            </el-form>

            <!-- Validated Login Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "code",
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
    ...mapState(["email"]),
    changeCode5() {
      return this.loginForm.code5;
    },
    changeCode4() {
      return this.loginForm.code4;
    },
    changeCode3() {
      return this.loginForm.code3;
    },
    changeCode2() {
      return this.loginForm.code2;
    },
    changeCode1() {
      return this.loginForm.code1;
    },
  },
  data() {
    return {
      loginForm: {
        code1: null,
        code2: null,
        code3: null,
        code4: null,
        code5: null,
      },
      checked: false,
      code: null,
    };
  },

  watch: {
    changeCode5() {
      console.log("hello");
      this.getdata();
    },
    changeCode4() {
      console.log("hello");
      this.getdata();
    },
    changeCode3() {
      console.log("hello");
      this.getdata();
    },
    changeCode2() {
      console.log("hello");
      this.getdata();
    },
    changeCode1() {
      console.log("hello");
      this.getdata();
    },
  },
  methods: {
    ...mapActions(["assignCode"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let num1 = this.loginForm.code1.toString();
          let num2 = this.loginForm.code2.toString();
          let num3 = this.loginForm.code3.toString();
          let num4 = this.loginForm.code4.toString();
          let num5 = this.loginForm.code5.toString();
          if (this.$i18n.locale === "en") {
            this.code = num1 + num2 + num3 + num4 + num5;
            console.log(this.code);
          } else if (this.$i18n.locale === "ar") {
            this.code = num5 + num4 + num3 + num2 + num1;
            console.log(this.code);
            console.log(this.email);
          }

          const loading = this.$vs.loading({
            type: "scale",
            color: "#F28227",
          });
          this.$axios
            .post("/check-code", {
              email: this.email,
              code: this.code,
            })
            .then(() => {
              this.assignCode(this.code);
              this.$router.push({ path: "/Auth/changePass" });
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                if (this.$i18n.locale === "en") {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-right",
                    text: `verification code is not correct`,
                  });
                } else {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-left",
                    text: ` رمز التحقق غير صحيح`,
                  });
                }
              } else {
                if (this.$i18n.locale === "en") {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-right",
                    text: `Error in internet`,
                  });
                } else {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-left",
                    text: `  خطا فى الانترنت`,
                  });
                }
              }
            })
            .finally(() => loading.close());
        }
      });
    },
    resetCode() {
      this.$axios
        .post("/resend", { email: this.email })
        .then()
        .catch((err) => {
          console.log(err);
        });
    },
    getdata() {
      console.log(document.getElementById("index-4"));
      if (this.$store.state.lang == "ar") {
        if (this.loginForm.code5 != null) {
          if (this.loginForm.code5.toString().length == 1) {
            document.getElementById("index-4").focus();
          }
        }
        if (this.loginForm.code4 != null) {
          if (this.loginForm.code4.toString().length == 1) {
            document.getElementById("index-3").focus();
          }
        }
        if (this.loginForm.code3 != null) {
          if (this.loginForm.code3.toString().length == 1) {
            document.getElementById("index-2").focus();
          }
        }
        if (this.loginForm.code2 != null) {
          if (this.loginForm.code2.toString().length == 1) {
            document.getElementById("index-1").focus();
          }
        }
      } else {
        if (this.loginForm.code1 != null) {
          if (this.loginForm.code1.toString().length == 1) {
            document.getElementById("index-2").focus();
          }
        }
        if (this.loginForm.code2 != null) {
          if (this.loginForm.code2.toString().length == 1) {
            document.getElementById("index-3").focus();
          }
        }
        if (this.loginForm.code3 != null) {
          if (this.loginForm.code3.toString().length == 1) {
            document.getElementById("index-4").focus();
          }
        }
        if (this.loginForm.code4 != null) {
          if (this.loginForm.code4.toString().length == 1) {
            document.getElementById("index-5").focus();
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/login.scss";
</style>