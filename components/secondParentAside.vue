<template>
  <el-aside width="260px" class="d-xl-block d-lg-block d-none">
    <div class="aside">
      <div class="img">
        <el-avatar size="large" :src="$auth.user.photo"></el-avatar>
      </div>
      <p class="name">{{ $auth.user.username }}</p>
      <div v-if="!show">
        <NuxtLink to="/Parent/student" class="return" @click="show = !show">
          <span><i class="fas fa-chevron-right"></i></span>
          {{ $t("auth.sons") }}
        </NuxtLink>
        <div
          class="list first"
          :class="[path().name == 'Parent-tasks-id-section' ? 'active' : '']"
        >
          <NuxtLink :to="`/Parent/tasks/${id}/${section}`">
            <span><i class="fas fa-tasks"></i></span>
            <p>{{ $t("auth.Tasks") }}</p>
          </NuxtLink>
        </div>
        <div
          class="list"
          :class="[path().name == 'Parent-Result-id-section' ? 'active' : '']"
        >
          <NuxtLink :to="`/Parent/Result/${id}/${section}`">
            <span><i class="fas fa-stream"></i></span>
            <p>{{ $t("auth.Exams") }}</p>
          </NuxtLink>
        </div>

        <div
          class="list"
          :class="[
            path().name == 'Parent-Subjects-id-section' ||
            path().name == 'Parent-Subjects-lessons-user-section-id'
              ? 'active'
              : '',
          ]"
        >
          <NuxtLink :to="`/Parent/Subjects/${id}/${section}`">
            <span><i class="fas fa-book"></i></span>
            <p>{{ $t("auth.Subjects") }}</p>
          </NuxtLink>
        </div>
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
  props: ["id", "section"],
  data() {
    return {
      show: false,
    };
  },
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