<template>
  <div class="profile">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />
      <el-main>
        <div class="bg-white">
          <h3>{{ $t("auth.Information") }}</h3>
          <div class="container-fluid">
            <div class="row data">
              <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div class="text">
                  <div class="profileImg">
                    <el-avatar size="large" :src="url"></el-avatar>
                    <label for="myimg" class="update">
                      <div>
                        <p>{{ $t("auth.Update") }}</p>
                      </div>
                    </label>

                    <input
                      type="file"
                      @change="onFileChange"
                      id="myimg"
                      accept="image/*"
                      class="d-none"
                    />
                  </div>
                  <p>{{ $t("auth.ProfileImg") }}</p>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9">
                <div class="row form">
                  <div class="col-md-4">
                    <label for="firstName">{{ $t("auth.username") }} </label>
                    <input
                      id="firstName"
                      type="text"
                      class="form-control"
                      
                      v-model="userInfo.username"
                    />
                  </div>

                  <div class="col-md-4">
                    <label for="bio">{{ $t("auth.bio") }} </label>
                    <input
                      id="bio"
                      type="text"
                      class="form-control"
                      
                      v-model="userInfo.bio"
                    />
                  </div>

                  
                  <div class="col-md-4 align" v-if="!show">
                    <button class="btn btn-orange" @click="updateProfile">
                      {{ $t("auth.SaveButton") }}
                    </button>
                    <button class="btn btn-white">
                      {{ $t("auth.Cancel") }}
                    </button>
                  </div>
                </div>
                <div class="row form">
                  <div class="col-md-8 email">
                    <label for="email"> {{ $t("auth.Email") }} </label>
                    <input
                      id="email "
                      type="email"
                      class="form-control"
                      
                      v-model="userInfo.email"
                    />
                  </div>
                </div>
                <div class="row form">
                  <div class="col-md-12">
                    <p class="change" @click="show = !show">
                      {{ $t("auth.ChangePassword") }}
                      <span><i class="fas fa-pen"></i></span>
                    </p>
                  </div>
                </div>
                <div v-if="show" data-aos="slide-down">
                  <div class="row form">
                    <div class="col-md-8 email">
                      <label for="password">
                        {{ $t("auth.CurrentPassword") }}
                      </label>
                      <input
                        id="password "
                        type="password"
                        class="form-control"
                        v-model="userInfo.password"
                      />
                    </div>
                  </div>
                  <div class="row form">
                    <div class="col-md-8 email">
                      <label for="newPassword">
                        {{ $t("auth.NewPassword") }}
                      </label>
                      <input
                        id="newPassword "
                        type="password"
                        class="form-control"
                        v-model="userInfo.newPassword"
                      />
                    </div>
                  </div>
                  <div class="row form">
                    <div class="col-md-8 email">
                      <label for="verify">
                        {{ $t("auth.ConfirmPassword") }}
                      </label>
                      <input
                        id="verify "
                        type="password"
                        class="form-control"
                        v-model="userInfo.verify"
                      />
                    </div>
                  </div>
                  <div class="row form">
                    <div class="col-md-8"></div>
                    <div class="col-md-4 align mt-2">
                      <button class="btn btn-orange" @click="updatePass">
                        {{ $t("auth.SaveButton") }}
                      </button>
                      <button class="btn btn-white">
                        {{ $t("auth.Cancel") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/aside.vue";
import SmallAside from "@/components/asideSmallScreen.vue";
export default {
  components: {
    Aside,
    SmallAside,
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  created() {
      this.getMe();
    
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

      url: "",
      photo: "",

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
        this.url = res.data.photo;
        this.photo = res.data.photo;
        this.userInfo.username = res.data.username;
        this.userInfo.bio = res.data.bio;

        this.userInfo.email = res.data.email;
        console.log("user===hello", Object.keys(this.$auth.user));
      });
    },
    onFileChange(e) {
      this.photo = e.target.files[0];
      this.url = URL.createObjectURL(this.photo);
    },
    updateProfile() {
      let formData = new FormData();
      if(this.photo){
        formData.append("photo", this.photo);
      }
      formData.append("email", this.userInfo.email);

      formData.append("bio",this.userInfo.bio);
      formData.append("username", this.userInfo.username);

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

      if(!this.userInfo.password){
        this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-right",
              text: this.$i18n.locale == 'ar' ? 'كلمة المرور القديمة مطلوبة' : 'Old Password Is Required',
        });

        return;
      }

      if(!this.userInfo.newPassword){
          this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-right",
              text: this.$i18n.locale == 'ar' ? 'كلمة المرور الجديد مطلوبة' : 'New Password Is Required',
        });
      }


      if(!this.userInfo.verify){
          this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-right",
              text: this.$i18n.locale == 'ar' ? 'تأكيد كلمة المرور مطلوبة' : 'Verify Old Password Is Required',
        });
      }

      if(!(this.userInfo.password && this.userInfo.newPassword && this.userInfo.verify && (this.userInfo.verify === this.userInfo.password))){
        this.$vs.notification({
              progress: "auto",
              color: "#FFF3EA",
              position: "top-right",
              text: this.$i18n.locale == 'ar' ? 'كلمة المرور القديمة و تأكيدها غير متطابقين' : 'Verify Password and Old Password Not Identical',
        });
        return;
      }
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

          this.userInfo.password = this.userInfo.newPassword = this.userInfo.verify = "";
          this.show = false;

          
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