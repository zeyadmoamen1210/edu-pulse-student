

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
            <el-form :model="sendEmail" ref="sendEmail" class="loginForm">
              <div class="row">
                <div class="col-md-12 sub-title">
                  <h4>{{ $t("auth.Forget") }}</h4>
                  <p>{{ $t("auth.ForgetNote") }}</p>
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
                    v-model="sendEmail.email"
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

                <el-form-item>
                  <el-button
                    class="first-btn"
                    @click="submitForm('sendEmail')"
                    type="primary"
                  >
                    {{ $t("auth.Send") }}
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
import { mapActions } from "vuex";
export default {
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      sendEmail: {
        email: "",
      },
      checked: false,
    };
  },
  methods: {
    ...mapActions(["assignEmail"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$vs.loading({
            type: "scale",
            color: "#F28227",
          });

          this.$axios
            .post("/resend", { email: this.sendEmail.email })
            .then(() => {
              this.assignEmail(this.sendEmail.email);
              this.$router.push({ path: "/Auth/code" });
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                if (this.$i18n.locale === "en") {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-right",
                    text: `Not Found`,
                  });
                } else {
                  this.$vs.notification({
                    progress: "auto",
                    color: "#FFF3EA",
                    position: "top-left",
                    text: ` غير موجود`,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/login.scss";
</style>