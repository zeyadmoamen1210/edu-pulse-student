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



            <div>


                <div
                        class="live-time live-exam"
                        v-for="(x, index) in 5"
                        v-if="index == 1 &&exam &&exam.remainingTime &&exam.remainingTime > 0"
                        :key="index"
                      >
                        <no-ssr>
                          <vac
                            @finish="endExam"
                            :end-time="
                              new Date().getTime() + exam.remainingTime * 1000
                            "
                          >
                            <template v-slot:process="{ timeObj }">
                             <div class="d-flex justify-content-end"> 


                                  <!-- <span></span> -->
                              <div class="time-div mr ml">
                                <!-- <img
                                  src="@/assets/imgs/live-timer.png"
                                  alt=""
                                /> -->
                                <h6>ثانية</h6>
                                <span>{{ ` ${timeObj.s}` }}</span>
                              </div>

                              <div class="time-div mr ml">
                                <!-- <img
                                  src="@/assets/imgs/live-timer.png"
                                  alt=""
                                /> -->
                                <h6>دقيقة</h6>
                                <span>{{ ` ${timeObj.m}` }}</span>
                              </div>

                              <div class="time-div mr ml">
                                <!-- <img
                                  src="@/assets/imgs/live-timer.png"
                                  alt=""
                                /> -->
                                <h6>ساعة</h6>
                                <span>{{ ` ${timeObj.h}` }}</span>
                              </div>


                             </div>
                            </template>
                            <span
                              slot="finish"
                              style="font-family:'CustomFontRegular'"
                            >
                              تم إنتهاء الوقت
                            </span>
                          </vac>
                        </no-ssr>
                      </div>


            </div>
            <div class="row largeScreen" ref="content">
              <div class="bg-gray">
                <div class="row">
                  <div
                    v-if="
                      !(
                        teacherWillCorrectIt ||
                        (isCorrected && !showModelAnswer)
                      )
                      &&
                      !repeatTheExam
                    "
                    class="col-lg-1"
                    :class="[$i18n.locale === 'en' ? 'eng' : '']"
                  >
                    <div class="mt-2 scroll">
                      <div
                        v-for="(item, index) in questions"
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
                    <section>
                      

                      <div class="bg-white">
                        <vs-button
                          v-if="isCorrected && showModelAnswer"
                          @click="showModelAnswer = false"
                          >عرض نتيجة الامتحان</vs-button
                        >
                        <div v-if="questions.length > 0 && !teacherWillCorrectIt && !repeatTheExam">
                          <Question
                            :question="questions[currentIndex]"
                            :showModelAnswer="isCorrected && showModelAnswer"
                            :exam="exam"
                            v-if="isCorrected && showModelAnswer"
                          />

                          <Question
                            :question="questions[currentIndex]"
                            :showModelAnswer="isCorrected && showModelAnswer"
                            :exam="exam"
                            v-else-if="!exam.totalMarks"
                          />

                          <div class="absolute" v-if="!isCorrected">
                            <div class="row align-items-end">
                              <div class="col-md-6">
                                <p
                                  v-if="
                                    currentIndex < questions.length - 1 &&
                                      currentIndex != 0
                                  "
                                  @click="getPreQuestion"
                                  class="next"
                                  :class="[currentIndex == 0 ? 'disable' : '']"
                                >
                                  <span
                                    ><i class="fas fa-arrow-right"></i
                                  ></span>
                                  السؤال السابق
                                </p>
                              </div>
                              <div
                                v-if="currentIndex < questions.length - 1"
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
                                v-if="
                                  currentIndex == questions.length - 1 &&
                                    !failedAndAllowToRepeat
                                "
                                class="
                                col-md-6
                                d-flex
                                justify-content-end
                                align-items-center
                              "
                              >
                                <p class="next" @click="doneYourExam">
                                  تسليم الامتحان والخروج
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-else-if="teacherWillCorrectIt && !repeatTheExam">
                          {{ $t("auth.isCheckingByTeacher") }}
                        </div>

                        <div v-if="isCorrected && !showModelAnswer && !repeatTheExam">
                          <div class="container-fluid result">
                            <div class="row">
                              <div class="col-md-6 alginItem">
                                <div class="content">
                                  <div class="row">
                                    <p>
                                      {{ $t("auth.TotalScore") }}
                                    </p>
                                    <p>{{ allMarks }}/{{ allPoints }}</p>
                                    <div class="row">
                                      <div class="col-md-3">
                                        <p class="num">
                                          {{
                                            `${(
                                              (allMarks / allPoints) *
                                              100
                                            ).toFixed(2)}%`
                                          }}
                                        </p>
                                      </div>
                                      <div class="col-md-9">
                                        <b-progress
                                          :value="exam.totalMarks"
                                          :max="exam.points"
                                          class=""
                                        ></b-progress>
                                      </div>
                                    </div>
                                    <div v-if="allMarks < allPoints / 2">
                                      <p class="note">
                                        {{ $t("auth.ExamNote") }}
                                      </p>
                                      <button class="btn" @click="startExam()">
                                        {{ $t("auth.RepeatExam") }}
                                      </button>
                                    </div>
                                    <p
                                      class="wrongAnswer"
                                      @click="showModelAnswer = true"
                                    >
                                      {{ $t("auth.WrongAnswer") }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 alginItem">
                                <img
                                  :src="require('@/assets/imgs/result.png')"
                                  class="img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>







                        <div v-else-if="repeatTheExam">
                          <div class="container-fluid result">
                            <div class="row">
                              <div class="col-md-6 alginItem">
                                <div class="content">
                                  <div class="row">
                                    <p>
                                      {{ $t("auth.TotalScore") }}
                                    </p>
                                    <p>{{ allMarks }}/{{ allPoints }}</p>
                                    <div class="row">
                                      <div class="col-md-3">
                                        <p class="num">
                                          {{
                                            `${(
                                              (allMarks / allPoints) *
                                              100
                                            ).toFixed(2)}%`
                                          }}
                                        </p>
                                      </div>
                                      <div class="col-md-9">
                                        <b-progress
                                          :value="exam.totalMarks"
                                          :max="exam.points"
                                          class=""
                                        ></b-progress>
                                      </div>
                                    </div>
                                    <div v-if="allMarks < allPoints / 2">
                                      
                                      <button class="btn" @click="startExam()">
                                        {{ $t("auth.RepeatExam") }}
                                      </button>
                                    </div>
                                   
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 alginItem">
                                <img
                                  :src="require('@/assets/imgs/result.png')"
                                  class="img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>





                        <div v-if="notAllowedToSeeExam">
                            <h6>{{ $t("auth.notAllowedToSolve") }}</h6>
                        </div>
                      </div>
                    </section>
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
      points: null,
      questions: [],
      currentIndex: 0,
      showResult: false,
      teacherWillCorrectIt: false,
      showQuestionWithAnswers: false,
      failedAndAllowToRepeat: false,
      showModelAnswer: false,
      examTotalMark: "",
      examPoints: "",

      allPoints: 0,
      allMarks: 0,
      isCorrected: false,
      notAllowedToSeeExam: false,
      repeatTheExam: false
    };
  },
  computed: {},
  mounted() {
    this.startExam();
    this.getSubject();
  },
  created() {},
  methods: {

    endExam(str = null){
    
        this.doneYourExam();

    },


    startExam() {
      this.currentIndex = 0;
      this.failedAndAllowToRepeat = false;
      this.isCorrected = false;
      this.repeatTheExam = false;
      this.showModelAnswer = false;
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .post(`/exams/${this.$route.params.id}/start`)
        .then(() => {
          this.fetchExam();
        })
        .catch((error) => {
          this.fetchExam();
          //   if (error.response.status === 403) {
          // this.isExamCheckingNow = true;
          // this.$message({
          //     message: this.$i18n.locale == 'ar' ? "أمتحانك قيد التصحيح من قبل المعلم" : "Your Exam Is Checking By Your Teacher"
          // })
          //   }
          //   this.fetchExam();
        })
        .finally(() => loading.close());
    },
    getSubject() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/subjects/${this.$route.query.type_id}`)
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
      this.$axios
        .get(`/exams/${this.$route.params.id}`)
        .then((res) => {
          this.allPoints = res.data.points;


          if(res.data.remainingTime <= 0){
              this.notAllowedToSeeExam = true;
              return;
          }

          if (res.data.totalMarks > -1) {
            this.allMarks = res.data.totalMarks;
            this.isCorrected = true;
          }

          res.data.questions.map((ele) => {
            if (ele.question.type == "complete" && ele.answer == null) {
              ele.answer = [];
            }
            if (ele.question.type == "choose") {
              ele.question.active = null;
            }

            if (ele.question.type == "group") {
              ele.childrenQuestions.map((ele2) => {
                if (ele2.child.type == "complete" && ele2.answer == null) {
                  ele2.answer = [];
                }

                if (ele2.child.type == "choose") {
                  ele2.child.active = null;
                }
              });
            }
          });
          this.exam = res.data;
          this.questions = res.data.questions || [];

          console.log(this.exam);
        })
        .catch((error) => {
            console.log(error.response.data.message.flag)
          if (error.response.status === 403 && error.response.data.message.flag === 2) {
            this.teacherWillCorrectIt = true;
          } else if (error.response.status === 403 && error.response.data.message.flag === 1){
            this.repeatTheExam = true;
          }
        });
    },
    doneYourExam() {
      console.log("here");
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.active = false;
      this.exam.remainingTime = 0;
      this.showResult = true;
      this.$axios.patch(`/exams-done/${this.exam.id}`)
        .then((res) => {
          this.$message({
            message:
              this.$i18n.locale == "ar"
                ? "تم تسلييم الامتحان بنجاح"
                : "Your Exam Is Submited",
          });

          if (res.status == 204) {
            this.teacherWillCorrectIt = true;
            return;
          }

          if (res.data) {
            this.examTotalMark = res.data.points;
            this.examPoints = res.data.mark;
          }

          this.fetchExam();
          console.log("k", res.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$message.error({
              message: "غير مسموح لك بإعادة حل الامتحان",
            });
            return;
          }

          if (error.response.status === 403 && error.response.data.message.flag === 1){
            this.repeatTheExam = true;
          }

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
.mr{
    margin: 0 10px;
}

.ml{
    margin: 0 10px;
}
.time-div{
    text-align: center;
    background: #FFF;
    padding: 7px 13px;
}
@import "@/assets/style/course.scss";
</style>
