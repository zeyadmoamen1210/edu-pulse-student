<template>
  <div class="course">
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
          <div ref="target" id="target" class="center exam">
            <div class="row">
              <div class="col-lg-7 col-md-12 p-0 mb-3">
                <h3></h3>
              </div>
              <div
                class="col-lg-5 col-md-12 d-flex mb-3 justify-content-end p-0"
              >
                <p class="text">{{ exam.title }}</p>
              </div>
            </div>
            <div class="row largeScreen" ref="content">
              <div class="bg-gray">
                <div class="row">
                  <div
                    class="col-lg-1"
                    :class="[$i18n.locale === 'en' ? 'eng' : '']"
                  >
                    <div class="mt-2 scroll" v-if="showResult == false">
                      <div
                        v-for="(item, index) in exam.questions"
                        :key="index"
                        class="border"
                        :class="[currentIndex == index ? 'active' : '']"
                      >
                        <p @click="getquestion(index)">
                          {{ index + 1 }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-11">
                    <div class="bg-white">
                      <div v-if="exam.questions.length > 0">
                        <Question 
                          :question="exam.questions[currentIndex]"
                          :showResult="false"
                          :exam="exam"
                        />
                        <div class="absolute">
                          <div class="row align-items-end">
                            <div class="col-md-6">
                              <p
                                v-if="
                                  currentIndex < exam.questions.length - 1 &&
                                  currentIndex != 0
                                "
                                @click="getPreQuestion"
                                class="next"
                                :class="[currentIndex == 0 ? 'disable' : '']"
                              >
                                <span><i class="fas fa-arrow-right"></i></span>
                                السؤال السابق
                              </p>
                            </div>
                            <div
                              v-if="currentIndex < exam.questions.length - 1"
                              class="
                                col-md-6
                                d-flex
                                justify-content-end
                                align-items-center
                              "
                            >
                              <p @click="getNextQuestion" class="next">
                                فى السوال التالى
                                <span><i class="fas fa-arrow-left"></i></span>
                              </p>
                            </div>
                            <div
                              v-if="currentIndex == exam.questions.length - 1"
                              class="
                                col-md-6
                                d-flex
                                justify-content-end
                                align-items-center
                              "
                            >
                              <p
                                class="next"
                                @click="getPoint"
                                v-if="showResult == false"
                              >
                                تسليم الامتحان والخروج
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
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Aside from "@/components/aside.vue";
import SmallAside from "@/components/asideSmallScreen.vue";
import Question from "@/components/question.vue";
export default {
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
    Question,
  },

  data() {
    return {
      exam: {},
      subject: {},
      unitId: {},
      questions: [],
      currentIndex: 0,
      showResult: false,
    };
  },
  mounted() {
    this.getSubject();
    this.fetchExam();
  },
  methods: {
    getSubject() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/subjects/${this.$route.params.unit}`)
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
    fetchExam() {
      this.$axios.get(`/exams/${this.$route.params.id}`).then((res) => {
        this.exam = res.data;
        console.log(this.exams);
      });
    },
    getPoint() {
      console.log("here");
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.active = false;
      this.showResult = true;
      this.$axios

        .patch(`/exams-done/${this.exam.id}`)
        .then((res) => {
          this.points = res.data;
          console.log("k", res.data);
        })
        .finally(() => loading.close());
    },
    getquestion(index) {
      this.currentIndex = index;
    },
    getNextQuestion() {
      this.currentIndex += 1;
    },
    getPreQuestion() {
      this.currentIndex -= 1;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/course.scss";
</style>