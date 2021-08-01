<template>
  <el-aside width=" 50px">
    <div class="hidden arabicSide" v-if="$i18n.locale == 'ar'">
      <vs-sidebar right reduce open hover-expand>
        <div class="img">
          <el-avatar :src="$auth.user.photo"></el-avatar>
        </div>
        <span>
          <vs-sidebar-item :class="[path().path == '/home' ? 'active' : '']">
            <template #icon>
              <i class="fas fa-home"></i>
            </template>
            {{ $t("auth.HomePage") }}
          </vs-sidebar-item></span
        >

        <span @click="routerLink('/Parent/student')">
          <vs-sidebar-item
            :class="[
              path().path == '/Parent/student' ||
              path().name == 'Parent-tasks' ||
              path().name == 'Material-content-course-id'
                ? 'active'
                : '',
            ]"
          >
            <template #icon>
              <i class="fas fa-user-friends"></i>
            </template>
            {{ $t("auth.sons") }}
          </vs-sidebar-item></span
        >

        <span @click="routerLink('/parentProfile')"
          ><vs-sidebar-item
            :class="[path().path == '/parentProfile' ? 'active' : '']"
          >
            <template #icon>
              <i class="fas fa-user-circle"></i>
            </template>
            {{ $t("auth.Profile") }}
          </vs-sidebar-item></span
        >
        <span @click="routerLink('/login')" class="logout"
          ><vs-sidebar-item>
            <template #icon>
              <i class="fas fa-sign-out-alt"></i>
            </template>
            {{ $t("auth.Logout") }}
          </vs-sidebar-item></span
        >
        <div class="arabicSmall" v-if="$i18n.locale === 'en'">
          <button class="langBtn mx-2 mt-3" @click="$i18n.setLocale('ar')">
            <span class="mx-1 mt-1"> ع</span>
          </button>
        </div>
        <div class="engSmall" v-if="$i18n.locale === 'ar'">
          <p>
            <button
              class="langBtn mx-2 mt-3"
              style="float: left"
              @click="$i18n.setLocale('en')"
            >
              <span class="mx-1 mt-1"> En </span>
            </button>
          </p>
        </div>
      </vs-sidebar>
    </div>
    <div class="hidden" v-if="$i18n.locale !== 'ar'" style="direction: ltr">
      <vs-sidebar reduce open hover-expand>
        <div class="img">
          <el-avatar :src="$auth.user.photo"></el-avatar>
        </div>
        <span>
          <vs-sidebar-item :class="[path().path == '/home' ? 'active' : '']">
            <template #icon>
              <i class="fas fa-home"></i>
            </template>
            {{ $t("auth.HomePage") }}
          </vs-sidebar-item></span
        >

        <span @click="routerLink('/Parent/student')">
          <vs-sidebar-item
            :class="[
              path().path == '/Parent/student' ||
              path().name == 'Parent-tasks' ||
              path().name == 'Material-content-course-id'
                ? 'active'
                : '',
            ]"
          >
            <template #icon>
              <i class="fas fa-user-friends"></i>
            </template>
            {{ $t("auth.sons") }}
          </vs-sidebar-item></span
        >

        <span @click="routerLink('/parentProfile')"
          ><vs-sidebar-item
            :class="[path().path == '/parentProfile' ? 'active' : '']"
          >
            <template #icon>
              <i class="fas fa-user-circle"></i>
            </template>
            {{ $t("auth.Profile") }}
          </vs-sidebar-item></span
        >

        <span @click="routerLink('/login')" class="logout pointer"
          ><vs-sidebar-item>
            <template #icon>
              <i class="fas fa-sign-out-alt"></i>
            </template>
            {{ $t("auth.Logout") }}
          </vs-sidebar-item></span
        >
        <div class="arabicSmall" v-if="$i18n.locale === 'en'">
          <button class="langBtn mx-2 mt-3" @click="$i18n.setLocale('ar')">
            <span class="mx-1 mt-1">ع</span>
          </button>
        </div>
        <div class="engSmall" v-if="$i18n.locale === 'ar'">
          <button
            class="langBtn mx-2 mt-3"
            style="float: left"
            @click="$i18n.setLocale('en')"
          >
            <span class="mx-1 mt-1"> En </span>
          </button>
        </div>
      </vs-sidebar>
    </div>
  </el-aside>
</template>
<script>
export default {
  methods: {
    path() {
      return this.$route;
    },
    routerLink(router) {
      this.$router.push({ path: router });
    },
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/aside.scss";
</style>