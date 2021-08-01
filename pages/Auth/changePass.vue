

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
                  <h4>{{ $t("auth.Reset") }}</h4>
                  <p>{{ $t("auth.ResetNote") }}</p>
                </div>

                <h6>{{ $t("auth.Password") }}</h6>

                <el-form-item
                  prop="password"
                  :rules="[
                    {
                      required: true,
                      message: $t('auth.ValidatePassword'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('auth.PasswordPlaceholder')"
                    :type="type"
                    v-model="loginForm.password"
                  >
                    <i
                      slot="suffix"
                      v-if="$i18n.locale === 'ar'"
                      :class="[
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="togglePassword"
                    ></i>
                    <i
                      slot="prefix"
                      v-else-if="$i18n.locale === 'en'"
                      :class="[
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="togglePassword"
                    ></i>
                  </el-input>
                </el-form-item>
                <h6>{{ $t("auth.ConPasswordPlaceholder") }}</h6>

                <el-form-item
                  prop="password"
                  :rules="[
                    {
                      required: true,
                      message: $t('auth.ValidatePassword'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('auth.ConPasswordPlaceholder')"
                    :type="typeOfConfirm"
                    v-model="loginForm.conPassword"
                  >
                    <i
                      slot="suffix"
                      v-if="$i18n.locale === 'ar'"
                      :class="[
                        showConPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="toggleConPassword"
                    ></i>
                    <i
                      slot="prefix"
                      v-else-if="$i18n.locale === 'en'"
                      :class="[
                        showConPassword ? 'fas fa-eye-slash' : 'fas fa-eye',
                      ]"
                      @click="toggleConPassword"
                    ></i>
                  </el-input>
                </el-form-item>
                <p v-if="arabicError != null || engError != null" class="error">
                  <span v-if="isArabic">{{ arabicError }}</span>
                  <span v-else-if="!isArabic">{{ engError }}</span>
                </p>
                <el-form-item>
                  <el-button
                    class="first-btn"
                    @click="submitForm('loginForm')"
                    type="primary"
                  >
                    {{ $t("auth.Verify") }}
                  </el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
    ...mapState(["code", "email"]),
  },
  data() {
    return {
      loginForm: {},
      checked: false,
      type: "password",
      typeOfConfirm: "password",
      showPassword: false,
      showConPassword: false,
      arabicError: null,
      engError: null,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginForm.password === this.loginForm.conPassword) {
            const loading = this.$vs.loading({
              type: "scale",
              color: "#F28227",
            });
            this.$axios
              .post("/reset-password", {
                email: this.email,
                code: this.code,
                password: this.loginForm.password,
              })
              .then(() => {
                this.$router.push({ path: "/login" });
              })
              .finally(() => loading.close());
          } else {
            this.arabicError = "يجب ان تتطابق كلمه المرور";
            this.engError = "Passwords Must be same";
          }
        }
      });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      if (this.showPassword == true) {
        this.type = "text";
      } else if (this.showPassword == false) {
        this.type = "password";
      }
    },
    toggleConPassword() {
      this.showConPassword = !this.showConPassword;
      if (this.showConPassword == true) {
        this.typeOfConfirm = "text";
      } else if (this.showConPassword == false) {
        this.typeOfConfirm = "password";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/login.scss";
</style>