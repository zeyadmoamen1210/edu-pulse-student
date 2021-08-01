<template>
  <div class="profile">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />
      
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/parentAside.vue";
import SmallAside from "@/components/parentSmallSide.vue";
export default {
  components: {
    Aside,
    SmallAside,
  },
  middleware: ['auth', 'goToHome'],
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  created() {
    if (this.$auth.loggedIn && Object.keys(this.$auth.user).length == 0) {
      this.getMe();
    }
    if (Object.keys(this.$auth.user).length != 0) {
      this.userInfo.img = this.$auth.user.photo;
      this.userInfo.firstName = this.$auth.user.username.split(" ")[0];
      this.userInfo.secondName = this.$auth.user.username.split(" ")[1];
      this.userInfo.email = this.$auth.user.email;
    }
  },
  mounted() {},
  data() {
    return {
      userInfo: {
        firstName: "",
        secondName: "",
        password: "",
        verify: "",
        newPassword: "",
        email: "",
        img: null,
      },

      show: false,
      img: null,
      fullName: "",
    };
  },
  methods: {
    path() {
      return this.$route;
    },
    getMe() {
      this.$axios.get("/profile").then((res) => {
        // this.user = res.data;
        this.$auth.setUser(res.data);
        this.userInfo.img = res.data.photo;
        this.userInfo.firstName = res.data.username.split(" ")[0];
        this.userInfo.secondName = res.data.username.split(" ")[1];
        this.userInfo.email = res.data.email;
        console.log("user===hello", Object.keys(this.$auth.user));
      });
    },
    onFileChange(e) {
      this.img = e.target.files[0];
      this.userInfo.img = URL.createObjectURL(this.img);
    },
    updateProfile() {
      let formData = new FormData();
      formData.append("photo", this.img);
      this.fullName = this.userInfo.firstName + " " + this.userInfo.secondName;
      formData.append("bio", "THIS IS STUDENT");

      // const common = {
      //   Accept: "application/json",
      //   Authorization: "",
      // };
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .patch("/profile", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => loading.close());
    },
    updatePass() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .put("/change-password", {
          oldpassword: this.userInfo.password,
          newpassword: this.userInfo.newPassword,
        })
        .then(() => {
          if (this.$i18n.locale === "en") {
            this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-right",
              text: `Password is Updated`,
            });
          } else {
            this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-left",
              text: `تم تحديث كلمة المرور`,
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (this.$i18n.locale === "en") {
              this.$vs.notification({
                progress: "auto",
                color: "#FFF3EA",
                position: "top-right",
                text: `oldpassword is incorrect`,
              });
            } else {
              this.$vs.notification({
                progress: "auto",
                color: "#FFF3EA",
                position: "top-left",
                text: `كلمة سر قديمة ليست صحيحة`,
              });
            }
          }
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/profile.scss";
</style>