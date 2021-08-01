<template>
  <div class="material">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />

      <el-main>
        <div class="content">
          <h3 v-if="$i18n.locale === 'ar'">
            {{ StudentClass && StudentClass.nameAr }}
            <img :src="require('@/assets/imgs/nextArabic.png')" alt="" />

            الفصل الدراسي الأول
          </h3>
          <h3 v-if="$i18n.locale === 'en'">
            {{ StudentClass && StudentClass.nameEn }}

            <img :src="require('@/assets/imgs/nextEng.png')" alt="" />

            First semester
          </h3>
          <div class="container-fluid">
            <div class="row">
              <div
                class="col-lg-6 col-md-12 col-sm-12 mt-sm-3"
                v-for="(subject, index) in Subjects"
                :key="index"
              >
                <div class="bg-color">
                  <div class="row">
                    <div class="col-md-2 align">
                      <div class="icon">
                        <b-img
                          v-bind="mainProps"
                          rounded="circle"
                          alt="Circle image"
                        >
                        </b-img>
                        <img
                          :src="subject.photo"
                          class="img"
                          :class="[$i18n.locale === 'ar' ? 'left' : 'right']"
                          alt=""
                        />
                      </div>
                    </div>

                    <div class="col-md-10 text">
                      <div class="row">
                        <h4 v-if="$i18n.locale === 'ar'">
                          {{ subject.nameAr }}
                        </h4>
                        <h4 v-if="$i18n.locale === 'en'">
                          {{ subject.nameEn }}
                        </h4>
                        <p>{{ subject.description }}</p>
                        <div
                          class="
                            d-xl-flex d-lg-flex d-md-flex
                            dis-flex
                            d-sm-block
                            bottomSec
                          "
                        >
                          <span class="right"
                            >أ / {{ subject.teacher.username }}</span
                          >
                          <p
                            class="left"
                            :class="[
                              $i18n.locale === 'en' ? 'ml-auto ' : 'mr-auto',
                            ]"
                          >
                            <!-- <NuxtLink :to=`/Material/content/${subject.id}`> -->
                            <button
                              @click="goTo(subject)"
                              :class="[$i18n.locale === 'ar' ? 'pb-2' : '']"
                            >
                              {{ $t("auth.ShowContent") }}
                              <span v-if="$i18n.locale === 'ar'"
                                ><i class="fas fa-arrow-left"></i
                              ></span>
                              <span
                                v-else-if="$i18n.locale === 'en'"
                                class="pb-1"
                                ><i class="fas fa-arrow-right"></i>
                              </span>
                            </button>
                          </p>
                        </div>
                      </div>
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
  name: "material",
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
  },
  mounted() {
    this.getProfile();
    this.getSubjects();
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#FFF3EA",
        width: 55,
        height: 55,
        class: "m1",
      },
      StudentClass: {},
      Subjects: [],
    };
  },
  methods: {
    getProfile() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get("/profile")
        .then((res) => {
          this.StudentClass = (res.data && res.data.class);
          console.log(this.StudentClass);
        })
        .finally(() => loading.close());
    },
    getSubjects() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get("/student-subjects?paginate=false")
        .then((res) => {
          this.Subjects = res.data;
          console.log(res.data);
        })
        .finally(() => loading.close());
    },
    goTo(subject) {
      console.log();
      this.$router.push({
        name: "Material-content-id",
        params: {
          id: subject.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/material.scss";
</style>