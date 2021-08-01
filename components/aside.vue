<template>
  <el-aside width="260px" class="d-xl-block d-lg-block d-none">
    <div class="aside">
      <div class="img">
        <el-avatar size="large" :src="$auth.user.photo"></el-avatar>
      </div>
      <p class="name">{{ $auth.user.username }}</p>
      <!-- <div class="list first">
        <NuxtLink to="/">
          <span><i class="fas fa-home"></i></span>
          <p>{{ $t("auth.HomePage") }}</p>
        </NuxtLink>
      </div> -->
      <div
        class="list"
        :class="[
          path().path == '/Material/material' ||
          path().name == 'Material-content-id' ||
          path().name == 'Material-content-course-id'
            ? 'active'
            : '',
        ]"
      >
        <NuxtLink to="/Material/material">
          <span><i class="fas fa-book"></i></span>
          <p>{{ $t("auth.Material") }}</p>
        </NuxtLink>
      </div>
      <div class="list" :class="[path().path == '/profile' ? 'active' : '']">
        <NuxtLink to="/profile">
          <span><i class="fas fa-user-circle"></i></span>
          <p>{{ $t("auth.Profile") }}</p>
        </NuxtLink>
      </div>
      <div class="list" :class="[path().path == '/Tasks' ? 'active' : '']">
        <NuxtLink to="/Tasks">
          <span><i class="fas fa-tasks"></i></span>
          <p>{{ $t("auth.Tasks") }}</p>
        </NuxtLink>
      </div>
      <div class="list logout pointer" @click="logout()">
        <span><i class="fas fa-sign-out-alt"></i></span>
        <p>{{ $t("auth.Logout") }}</p>
      </div>
      <div class="arabic" v-if="$i18n.locale === 'en'">
        <button class="langBtn mx-2 mt-3" @click="changeLocale('ar')">
          <span class="mx-1 mt-1"> العربيه</span>
        </button>
      </div>
      <div class="eng" v-if="$i18n.locale === 'ar'">
        <button
          class="langBtn mx-2 mt-3"
          style="float: left"
          @click="changeLocale('en')"
        >
          <span class="mx-1 mt-1"> English </span>
        </button>
      </div>
    </div>
  </el-aside>
</template>
<script>
export default {
  methods: {
    path() {
      return this.$route;
    },
    logout() {
      this.$router.push(`/login`);
      this.$auth.logout();
    },
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
      console.log("hi");

      if (document.children) {
        if (this.$i18n.locale == "ar") {
          this.$moment.locale("ar");
          console.log("arabic ");
          var all = document.getElementsByTagName("*");
          var i;
          for (i = 0; i < all.length; i++) {
            console.log("child ", all[i]);
            all[i].style.direction = "rtl";
          }
        } else {
          this.$moment.locale("en");
          console.log("english ");
          var all = document.getElementsByTagName("*");
          var i;
          for (i = 0; i < all.length; i++) {
            console.log("child ", all[i]);
            all[i].style.direction = "ltr";
          }
        }
      }

      location.reload();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/aside.scss";
</style>