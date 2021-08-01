
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
        <div class="col-lg-3 col-md-5 col-sm-12 loginForm">
          <div class="login-form-container">
            <el-form :model="loginForm" ref="loginForm" class="loginForm">
              <div class="row">
                <div class="col-md-12">
                  <h4>{{ $t("auth.Login") }}</h4>
                </div>
                <h6>{{ $t("auth.Email") }}</h6>
                <el-form-item
                  prop="email"
                  :rules="[
                    {
                      required: true,
                      message: $t('auth.ValidateEmail'),
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: $t('auth.ValidateEmail2'),
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input
                    :placeholder="$t('auth.EmailPlaceholder')"
                    type="email"
                    v-model="loginForm.email"
                  >
                    <i
                      slot="suffix"
                      v-if="$i18n.locale === 'ar'"
                      class="fas fa-envelope"
                    ></i>
                    <i
                      slot="prefix"
                      v-else-if="$i18n.locale === 'en'"
                      class="fas fa-envelope"
                    ></i>
                  </el-input>
                </el-form-item>
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
                <div class="d-flex">
                  <p>
                    <el-checkbox v-model="checked">
                      {{ $t("auth.Remember") }}
                    </el-checkbox>
                  </p>
                  <p :class="[isArabic ? 'mr-auto' : 'ml-auto']">
                    <NuxtLink to="/Auth/sendEmail">
                      {{ $t("auth.Forget") }}
                    </NuxtLink>
                  </p>
                </div>
                <el-form-item>
                  <el-button
                    class="first-btn"
                    type="primary"
                    @click="submitForm('loginForm')"
                  >
                    {{ $t("auth.Login") }}
                  </el-button>
                </el-form-item>
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
export default {
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      loginForm: {},
      checked: false,
      type: "password",
      showPassword: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        }
      });
    },
    async login() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginForm,
        });
        loading.close();

        this.$auth.setUser(response.data.user);
        localStorage.setItem("userDataStudent", JSON.stringify(response.data.user));
        // localStorage.setItem("token", res.data.token);
        if (this.$i18n.locale === "en") {
          this.$vs.notification({
            progress: "auto",
            color: "#FFF3EA",
            position: "top-center",
            text: `Welcome Back ${response.data.user.username}`,
          });
        } else {
          this.$vs.notification({
            progress: "auto",
            color: "#FFF3EA",
            position: "top-center",
            text: ` ${response.data.user.username} اهلا وسهلا `,
          });
        }
        if (
          response.data &&
          response.data.user &&
          response.data.user.role == "student"
        ) {
          this.$router.push(`/Material/material`);
        } else if (
          response.data &&
          response.data.user &&
          response.data.user.role == "parent"
        ) {
          this.$router.push(`/Parent/student`);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        loading.close();

        console.log("====error=", err);
        this.$message.error(`Invalid Email Or Password `);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
      if (this.showPassword == true) {
        this.type = "text";
      } else if (this.showPassword == false) {
        this.type = "password";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/login.scss";
</style>