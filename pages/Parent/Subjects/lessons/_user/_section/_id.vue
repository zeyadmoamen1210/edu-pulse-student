<template>
  <div class="contentPage">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container>
      <Aside
        class="d-xl-block d-lg-block d-none"
        :id="$route.params.user"
        :section="$route.params.section"
      />

      <SmallAside
        :id="$route.params.user"
        :section="$route.params.section"
        class="d-xl-none d-lg-none d-md-block"
      />

      <el-main>
        <div class="content bg-white">
          <h3 class="parent">
            <span><i class="fas fa-book"></i></span>{{ $t("auth.Subjects") }}
          </h3>
          <div class="container-fluid p-1">
            <div class="row">
              <div>
                <el-collapse
                  accordion
                  class="wow fadeInUp"
                  data-wow-duration="0.2s"
                >
                  <el-collapse-item
                    v-for="(unit, index) in Units"
                    :key="index"
                    :name="index"
                  >
                    <template slot="title">
                      <div
                        class="row rowStyle"
                        @click="getLessons(unit.id), getExam(unit.id)"
                      >
                        <div class="col-md-1 id">
                          <div class="border-circle">
                            <p>{{ index + 1 }}</p>
                          </div>
                        </div>
                        <div class="col-md-10 p-0">
                          <p class="text" v-if="$i18n.locale == 'ar'">
                            {{ unit.nameAr }}
                          </p>
                          <p
                            class="text"
                            dir="ltr"
                            v-if="$i18n.locale == 'en'"
                            style="text-align: start"
                          >
                            {{ unit.nameEn }}
                          </p>
                        </div>
                      </div>
                    </template>
                    <div class="content">
                      <p
                        v-for="(Lesson, index) in Lessons"
                        :key="index"
                        @click="goTo(Lesson.id)"
                      >
                        <span v-if="$i18n.locale == 'ar'" class="pointer"
                          >{{ index + 1 }}- {{ Lesson.nameAr }}</span
                        >

                        <span v-if="$i18n.locale == 'en'" class="pointer"
                          >{{ index + 1 }}- {{ Lesson.nameEn }}</span
                        >
                      </p>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/secondParentAside.vue";
import SmallAside from "@/components/secondSmallParentAside.vue";
export default {
  name: "material",
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
  },
  mounted() {
    this.getUnits();
    this.getSubject();
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      activeName: "first",
      show: false,
      Lessons: [],
      Units: [],
      subject: {},
      isLoading: false,
      exams: {},
    };
  },
  methods: {
    getSubject() {
      console.log(this.$route.params.id);
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/subjects/${this.$route.params.id}`)
        .then((res) => {
          this.subject = res.data;
          console.log("sub");
          console.log(this.subject);
        })
        .catch((err) => {
          console.log("===error =", err);
        })
        .finally(() => loading.close());
    },
    getUnits() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/subjects/${this.$route.params.id}/units?paginate=false`)
        .then((res) => {
          this.Units = res.data;
          console.log(this.Lessons);
        })
        .finally(() => loading.close());
    },
    getLessons(id) {
      this.isLoading = true;
      this.$axios
        .get(`/units/${id}/lessons?paginate=false`)
        .then((res) => {
          this.Lessons = res.data;
          console.log(this.Lessons);
        })
        .finally(() => (this.isLoading = false));
    },
    getExam(id) {
      this.$axios.get(`/units/${id}/exams?paginate=false`).then((res) => {
        this.exams = res.data;
        console.log(this.Lessons);
      });
    },
    goTo(id) {
      this.$router.push({
        name: "Material-content-course-id",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/content.scss";
</style>