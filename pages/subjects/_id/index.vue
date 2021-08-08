<template>
  <div class="contentPage">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container>
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />

      <el-main>
        <div class="content">
          <h3>
            <div class="icon">
              <img :src="subject.photo" alt="" />
            </div>
            <p v-if="$i18n.locale == 'ar'">
              {{ subject.nameAr }}
            </p>
            <p v-if="$i18n.locale == 'en'">
              {{ subject.nameEn }}
            </p>
            
          </h3>
          <div class="container-fluid p-1">
            <div class="row padding">
              <b-tabs content-class="mt-3">
                <b-tab :title="$t('auth.Lessons')" active>
                  <div>
                    <el-collapse
                      accordion
                      class="wow fadeInUp"
                      data-wow-duration="0.2s"
                      :ref="`unit`"
                    >
                      <el-collapse-item
                        v-for="(unit, index) in Units"
                        :key="unit.id"
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
                            v-for="(Lesson, i) in Lessons"
                            :key="Lesson.id"
                            @click="
                              $router.push(`/lesson/${Lesson.id}`)
                            "
                          >
                            <span v-if="$i18n.locale == 'ar'" class="pointer"
                              >{{ i + 1 }}- {{ Lesson.nameAr }}</span
                            >

                            <span v-if="$i18n.locale == 'en'" class="pointer"
                              >{{ i + 1 }}- {{ Lesson.nameEn }}</span
                            >
                          </p>

                          <h4 class="mx-0">{{ $t("auth.Exams") }}</h4>
                          <p
                            class="displayFlex"
                            v-for="(exam, id) in exams"
                            :key="exam.id"
                          >
                            <span> {{ id + 1 }}-{{ exam.title }}</span>

                            <span
                              :class="
                                $i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto'
                              "
                            >
                              <p
                                class="bg-color pointer"
                                @click="
                                  StartExam(
                                    exam.id,
                                    'Material-content-unitExam-unit-id',
                                    $route.params.id
                                  )
                                "
                              >
                                {{ $t("auth.StartExam") }}
                                <span v-if="$i18n.locale === 'ar'" class="icon"
                                  ><i class="fas fa-arrow-left"></i
                                ></span>
                                <span
                                  v-else-if="$i18n.locale === 'en'"
                                  class="icon"
                                  ><i class="fas fa-arrow-right"></i>
                                </span>
                              </p>
                            </span>
                          </p>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </b-tab>
                <b-tab :title="$t('auth.Live')">
                  <div class="row files">
                    <div
                      class="col-lg-2 col-md-4 col-sm-4 col-xs-12 mb-md-2"
                      v-for="(Live) in lives"
                      :key="Live.id"
                    >
                      <div class="liveIcon">
                        <img :src="require('@/assets/imgs/live.jpeg')" alt="" />
                        <p>{{ Live.name }}</p>

                        <button
                          class="btn btn-org"
                          v-if="!Live.hasFinished"
                          @click="joinLive(Live.id)"
                        >
                          دخول
                        </button>
                        <button
                          class="btn btn-red"
                          v-else-if="Live.hasFinished"
                          @click="joinLive(Live.id)"
                          disabled
                        >
                          انتهى
                        </button>
                      </div>
                    </div>
                  </div>
                  <vs-dialog v-model="active">
                    <p>لم يبدا بعد</p>
                  </vs-dialog>
                </b-tab>
                <b-tab :title="$t('auth.Exams')">
                    <div class="row subjects-exams">
                        <div class="col-md-2" v-for="exam in subjectExams" :key="exam.id">
                          <div class="exam text-center"  @click="$router.push(`/exam/${exam.id}?type_id=${subject.id}`)">
                            <img src="@/assets/imgs/exam.svg" alt="">
                              <h6 class="text-center title"> {{exam.title}} </h6>
                              <h6 class="text-center"> {{exam.points}} </h6>

                              <h6 class="text-center examAllow" v-if="exam.isAllowed && !exam.isChecking && !exam.isPassed"> {{ $i18n.locale == 'ar' ? 'متاح' : 'Allow' }} </h6>
                              <h6 class="text-center passed" v-else-if="exam.isAllowed && !exam.isChecking && exam.isPassed"> {{ $i18n.locale == 'ar' ? 'تم بنجاح' : 'Passed' }}</h6>
                              <h6 class="text-center examNotAllow" v-else-if="!exam.isAllowed && !exam.isChecking"> {{ $i18n.locale == 'ar' ? 'غير متاح' : 'Not Allowed' }} </h6>
                              <h6 class="text-center examChecking" v-else-if="!exam.isPassed && exam.isChecking"> {{$i18n.locale == 'ar' ? 'بيتم تصحيحة من المعلم' : 'ًTeacher Will Correct It'}}  </h6>
                              <h6 class="exam-points text-center examPassed mt-3" v-if="exam.isPassed && exam.lastScore >= 0"> {{exam.lastScore}} <i style="color: #ffc107" class="fas fa-coins"></i> </h6>
                          </div>
                        </div>
                    </div>
                </b-tab>
              </b-tabs>
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
    this.getUnits();
    this.getSubject();
    this.getLive();
    this.getSubjectsExam()
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
      exams: [],
      lives: [],
      active: false,
      subjectExams: []
    };
  },
  methods: {
    getSubjectsExam(){
      const loading = this.$vs.loading();
      this.$axios.get(`/subjects/${this.$route.params.id}/exams`).then(res => {
        this.subjectExams = res.data;

      }).finally(() => loading.close())
    },
    getLive() {
      this.$axios
        .get(`/subjects/${this.$route.params.id}/live?paginate=false`)
        .then((res) => {
          this.lives = res.data;
          console.log("lives", this.lives);
        });
    },
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
    joinLive(id) {
      this.$axios
        .patch(`/live/${id}/join`)
        .then((res) => {
          window.open(res.data.url, "_blank");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.active = true;
          }
        });
    },
    getLessons(id) {
      // this.isLoading = true;
      let loading = this.$vs.loading({
        target: this.$refs[`unit`],
      })

      this.$axios
        .get(`/units/${id}/lessons?paginate=false`)
        .then((res) => {
          this.Lessons = res.data;
          console.log(this.Lessons);
        })
        .finally(() => (loading.close()));
    },
    getExam(id) {
      this.$axios.get(`/units/${id}/exams?paginate=false`).then((res) => {
        this.exams = res.data;
        console.log(this.Lessons);
      });
    },
    StartExam(id, name, unit) {
      this.$router.push(`/exam/${id}?exam_type=unit&type_id=${unit}`);
    },
    goTo(id, name) {
      this.$router.push({
        name: name,
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
.subjects-exams{
  .exam{
    background: #FFF;
    padding:10px;
    cursor: pointer;
    margin-bottom: 15px;
    position: relative;

    h6.title{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .exam-points{
      position: absolute;
      top: 0;
      left: 10px;
    }
    h6{
      :first-of-type{
        font-size: 20px;
      }
    }
    .examAllow{
      color: var(--bs-success);
    }

    .examNotAllow{
      color: var(--bs-danger);
    }

    .passed{
      color: var(--bs-purple);
    }

    .examChecking{
      color: var(--bs-warning);
    }

  }
}
</style>