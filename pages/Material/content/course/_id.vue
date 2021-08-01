<template>
  <div class="course">
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
            <p v-if="$i18n.locale == 'ar'">{{ subject.nameAr }}</p>
            <p v-if="$i18n.locale == 'en'">{{ subject.nameEn }}</p>
          </h3>
          <div class="container-fluid p-1">
            <div class="row padding">
              <div>
                <!-- {{ points }} -->
                <b-tabs content-class="mt-3">
                  <b-tab :title="$t('auth.Explain')" active>
                    <div class="row">
                      <div class="col-lg-7 col-md-6 col-sm-12">
                        <iframe
                          width="100%"
                          height="294"
                          frameborder="0"
                          :src="video"
                          allowfullscreen=""
                          controls="0"
                          autoplay="0"
                          scrolling="no"
                        >
                        </iframe>
                        <p class="videoHeader">
                          {{ videoTitle }}
                        </p>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-12">
                        <h4>{{ $t("auth.Similarexplanations") }}</h4>
                        <div class="otherVideos">
                          <div
                            v-if="videos.length > 1"
                            class="icon"
                            v-for="(img, index) in videos"
                            :key="index"
                          >
                            <div class="bg" @click="showVideo(img, index)">
                              <img
                                :src="require('@/assets/imgs/icon.png')"
                                alt=""
                              />
                            </div>
                            <img :src="img.videoPhoto" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="question">
                      <h4>{{ $t("auth.DiscussionsAndQuestions") }}</h4>

                      <div class="sendMsg">
                        <div class="row">
                          <div
                            class="col-md-1 pic p-0"
                            style="text-align: end; margin-top: 0.2rem"
                          >
                            <el-avatar
                              size="large"
                              :src="$auth.user.photo"
                            ></el-avatar>
                          </div>
                          <div class="col-md-6">
                            <textarea
                              v-model="comment"
                              class="form-control"
                              :placeholder="$t('auth.Addcomment')"
                            ></textarea>
                          </div>
                          <div class="col-md-1 p-0">
                            <div class="icon">
                              <i
                                class="fas fa-location-arrow pointer"
                                @click="postComment"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="msg">
                        <div class="row mt-5">
                          <div class="col-lg-12 col-md-12 p-0">
                            <div
                              class="row bg-w"
                              v-for="(comment, index) in comments"
                              :key="index"
                            >
                              <div class="col-md-1 pic col-sm-12">
                                <el-avatar
                                  size="large"
                                  :src="comment.author.photo"
                                ></el-avatar>
                              </div>
                              <div class="col-lg-8 col-md-8 col-sm-12">
                                <h5>{{ comment.author.username }}</h5>
                                <p class="mt-2">
                                  {{ comment.content }}
                                </p>
                              </div>
                              <div class="col-lg-2 col-md-2 subhead">
                                <p>{{ comment.createdAt }}</p>

                                <div class="icon">
                                  <div>
                                    <div v-if="comment.kind == 'comment'">
                                      <p
                                        class="pointer"
                                        @click="
                                          (commentId = comment.id),
                                            (comment.kind = 'open')
                                        "
                                        @click.self="showReplies"
                                      >
                                        {{ $t("auth.ShowReplies") }}
                                      </p>
                                    </div>
                                    <div v-else-if="comment.kind == 'open'">
                                      <p
                                        class="pointer"
                                        @click="
                                          (commentId = comment.id),
                                            (comment.kind = 'comment')
                                        "
                                      >
                                        {{ $t("auth.ShowReplies") }}
                                      </p>
                                    </div>
                                  </div>

                                  <span class="mr-auto"
                                    ><i
                                      class="fas fa-comment-dots pointer"
                                      @click="commentId = comment.id"
                                      @click.self="showreply"
                                    ></i
                                  ></span>
                                </div>
                              </div>
                              <div
                                class="sendMsg none col-12 mt-4"
                                :id="'reply-' + index"
                              >
                                <div class="row">
                                  <div
                                    class="col-lg-1 col-md-1 pic p-0"
                                    style="text-align: end; margin-top: 0.6rem"
                                  >
                                    <el-avatar
                                      size="large"
                                      style="width: 30px; height: 30px"
                                      :src="$auth.user.photo"
                                    ></el-avatar>
                                  </div>
                                  <div class="col-lg-9 col-md-6">
                                    <textarea
                                      v-model="replyText"
                                      class="form-control"
                                      :placeholder="$t('auth.Addcomment')"
                                    ></textarea>
                                  </div>
                                  <div class="col-lg-1 col-md-1 p-0">
                                    <div class="icon">
                                      <i
                                        class="fas fa-location-arrow pointer"
                                        @click="postReply"
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="replies row px-5 mt-3"
                                :class="[
                                  comment.kind == 'open'
                                    ? 'block'
                                    : 'diplayNone',
                                ]"
                                v-for="(reply, index) in replies"
                                :key="index"
                              >
                                <div
                                  class="col-md-1 pic col-sm-12 p-0"
                                  style="text-align: end"
                                >
                                  <el-avatar
                                    style="width: 30px; height: 30px"
                                    size="large"
                                    :src="reply.author.photo"
                                  ></el-avatar>
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-12">
                                  <h5>{{ reply.author.username }}</h5>
                                  <p class="mt-2">
                                    {{ reply.content }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab :title="$t('auth.Files')"
                    ><div class="row files">
                      <div
                        class="col-lg-2 col-md-4 col-sm-4 col-xs-12 mb-md-2"
                        v-for="(pdf, index) in Pdf"
                        :key="index"
                      >
                        <a :href="pdf.link" target="_blank"
                          ><div class="pdfIcon">
                            <img
                              :src="require('@/assets/imgs/pdf.png')"
                              alt=""
                            />
                            <p>{{ pdf.title }}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab :title="$t('auth.Exams')" class="exam">
                    <div ref="target" id="target" class="center">
                      <div class="row">
                        <div class="col-lg-7 col-md-12 p-0 mb-3">
                          <h3>
                            <span v-if="$i18n.locale === 'ar'"
                              >{{ titleUnit.nameAr }}/
                              {{ lessons.nameAr }}</span
                            >
                            <span v-if="$i18n.locale === 'en'"
                              >{{ titleUnit.nameEn }} /
                              {{ lessons.nameEn }}</span
                            >
                          </h3>
                        </div>
                        <div
                          class="
                            col-lg-5 col-md-12
                            d-flex
                            mb-3
                            justify-content-end
                            p-0
                          "
                        >
                          <div class="row">
                            <div class="col-md-5 col-sm-12">
                              <p class="text">{{ $t("auth.Exammodel") }}</p>
                            </div>

                            <div class="col-md-6 col-sm-12">
                              <el-select
                                @change="startExam()"
                                v-model="value"
                                placeholder=""
                                :class="[
                                  $i18n.locale === 'en' ? 'arrowEng' : '',
                                ]"
                              >
                                <el-option
                                  v-for="(option, index) in models"
                                  :key="index"
                                  :label="option.title"
                                  :value="option.id"
                                >
                                </el-option>
                              </el-select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row largeScreen" ref="content">
                        <div class="bg-gray">
                          <div class="row">
                            <div
                              class="col-lg-1"
                              :class="[$i18n.locale === 'en' ? 'eng' : '']"
                            >
                              <div
                                class="mt-2 scroll"
                                v-if="showResult == false"
                              >
                                <div
                                  v-for="(item, index) in questions"
                                  :key="index"
                                  class="border"
                                  :class="[
                                    currentIndex == index ? 'active' : '',
                                  ]"
                                >
                                  <p @click="getquestion(index)">
                                    {{ index + 1 }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-11">
                              <div class="bg-white">
                                <div v-if="questions.length > 0">
                                  <Question
                                    :index="currentIndex"
                                    :questions="questions"
                                    :showResult="showResult"
                                    :val="value"
                                    :points="points"
                                  />
                                  <div class="absolute">
                                    <div class="row align-items-end">
                                      <div class="col-md-6">
                                        <p
                                          v-if="
                                            currentIndex <
                                              questions.length - 1 &&
                                            currentIndex != 0
                                          "
                                          @click="getPreQuestion"
                                          class="next"
                                          :class="[
                                            currentIndex == 0 ? 'disable' : '',
                                          ]"
                                        >
                                          <span
                                            ><i class="fas fa-arrow-right"></i
                                          ></span>
                                          السؤال السابق
                                        </p>
                                      </div>
                                      <div
                                        v-if="
                                          currentIndex < questions.length - 1
                                        "
                                        class="
                                          col-md-6
                                          d-flex
                                          justify-content-end
                                          align-items-center
                                        "
                                      >
                                        <p
                                          @click="getNextQuestion"
                                          class="next"
                                        >
                                          فى السوال التالى
                                          <span
                                            ><i class="fas fa-arrow-left"></i
                                          ></span>
                                        </p>
                                      </div>
                                      <div
                                        v-if="
                                          currentIndex == questions.length - 1
                                        "
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
                      <div class="row smallScreen">
                        <div class="bg-gray">
                          <div class="row">
                            <div class="col-12">
                              <div
                                class="mt-2 scroll d-flex"
                                v-if="showResult == false"
                              >
                                <div
                                  v-for="(item, index) in questions"
                                  :key="index"
                                  class="border"
                                  :class="[
                                    currentIndex == index ? 'active' : '',
                                  ]"
                                >
                                  <p @click="getquestion(index)">
                                    {{ index + 1 }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-12 p-1">
                              <div class="bg-white">
                                <div v-if="questions.length">
                                  <Question
                                    :index="currentIndex"
                                    :questions="questions"
                                    :showResult="showResult"
                                    :val="value"
                                    :points="points"
                                  />
                                  <div class="absolute">
                                    <div class="row align-items-end">
                                      <div class="col-md-6">
                                        <p
                                          v-if="
                                            currentIndex <
                                              questions.length - 1 &&
                                            currentIndex != 0
                                          "
                                          @click="getPreQuestion"
                                          class="next"
                                          :class="[
                                            currentIndex == 0 ? 'disable' : '',
                                          ]"
                                        >
                                          <span
                                            ><i class="fas fa-arrow-right"></i
                                          ></span>
                                          السؤال السابق
                                        </p>
                                      </div>
                                      <div
                                        v-if="
                                          currentIndex < questions.length - 1
                                        "
                                        class="
                                          col-md-6
                                          d-flex
                                          justify-content-end
                                          align-items-center
                                        "
                                      >
                                        <p
                                          @click="getNextQuestion"
                                          class="next"
                                        >
                                          فى السوال التالى
                                          <span
                                            ><i class="fas fa-arrow-left"></i
                                          ></span>
                                        </p>
                                      </div>
                                      <div
                                        v-if="
                                          currentIndex == questions.length - 1
                                        "
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
                  </b-tab>
                </b-tabs>
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
  name: "material",
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
    Question,
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      value: null,
      isSolving: false,
      video: "",
      videoTitle: "",
      currentIndex: 0,
      showResult: false,
      videos: [],
      questions: [],

      subject: {},
      Pdf: [],
      titleUnit: {},
      lessons: {},
      videoId: null,
      comments: [],
      models: [],
      replyActive: "",
      comment: "",
      commentId: null,
      replyText: "",
      replies: [],
      i: 0,
      points: {},
      model: {},
      active: false,
    };
  },
  watch: {
    i() {
      this.getComments();
    },
  },
  mounted() {
    this.getSubject();
    this.getVideo();
    this.getPdf();
    this.getExams();
    if (this.commentId) {
      this.showReplies();
    }
  },
  methods: {
    close() {
      this.active = false;
    },
    getSubject() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/lessons/${this.$route.params.id}`)
        .then((res) => {
          this.subject = res.data.unit.subject;
          this.titleUnit = res.data.unit;
          this.lessons = res.data;
          console.log("sub");
          console.log(this.subject);
        })
        .finally(() => loading.close());
    },
    getVideo() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/lessons/${this.$route.params.id}/material?type=video`)
        .then((res) => {
          this.videos = res.data.docs;
          console.log("videos", this.videos);
          this.video = this.videos[this.i].link;
          this.videoTitle = this.videos[this.i].title;
          this.videoId = this.videos[this.i].id;
          this.getComments();
        })
        .finally(() => loading.close());
    },
    getComments() {
      this.$axios
        .get(`/material/${this.videos[this.i].id}/comments?paginate=false`)
        .then((res) => {
          this.comments = res.data;

          res.data.forEach((ele) => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
          });
        });
    },
    postComment() {
      console.log("comment", this.videoId);
      const loading = this.$vs.loading({
        target: this.$refs.content,
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .post(`material/${this.videos[this.i].id}/comments`, {
          content: this.comment,
        })
        .then((res) => {
          console.log(res.data);
          this.comment = "";
          this.getComments();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => loading.close());
    },
    postReply() {
      const loading = this.$vs.loading({
        target: this.$refs.content,
        type: "scale",
        color: "#F28227",
      });

      this.$axios

        .post(`comments/${this.commentId}/replies`, {
          content: this.replyText,
        })
        .then((res) => {
          console.log(res.data);
          this.replyText = "";
          this.getComments();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => loading.close());
    },
    showReplies() {
      const loading = this.$vs.loading({
        target: this.$refs.content,
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/posts/${this.commentId}/replies?paginate=false`)
        .then((res) => {
          this.replies = res.data;
          console.log(this.replies);
        })
        .finally(() => loading.close());
    },

    getPdf() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/lessons/${this.$route.params.id}/material?type=pdf`)
        .then((res) => {
          this.Pdf = res.data.docs;
          console.log(this.Pdf);
        })
        .finally(() => loading.close());
    },
    showVideo(img, index) {
      this.video = img.link;
      this.videoTitle = img.title;
      this.i = index;
    },
    startExam() {
      const loading = this.$vs.loading({
        target: this.$refs.content,
        type: "scale",
        color: "#F28227",
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
      console.log(this.models[this.value]);
      for (let i = 0; i < this.models.length; i++) {
        if (this.models[i].id == this.value) {
          this.model = this.models[i];
          this.points = {
            mark: this.model.highestScore,
            points: this.model.points,
          };
        }
      }
      console.log(this.points.points);
      // if (!this.model.highestScore) {
      this.$axios.post(`/exams/${this.value}/start`).then(() => {
        this.$axios.get(`/exams/${this.value}`).then((res) => {
          this.currentIndex = 0;
          this.questions = res.data.questions;

          this.questions.forEach((ele) => {
            if (ele.answer != null && ele.question.type == "complete") {
              ele.answer = ele.answer[0].split(",");
            }
          });
          console.log("question ", this.questions);
        });
      });
      // } else {
      //   console.log("hello");

      //   this.showResult = true;
      // }
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

        .patch(`/exams-done/${this.value}`)
        .then((res) => {
          this.points = res.data;
          console.log("k", res.data);
        })
        .finally(() => loading.close());
    },
    getAllQuestions() {},
    getExams() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      console.log("hello", this.$route.params.id);
      this.$axios
        .get(`/lessons/${this.$route.params.id}/exams?paginate=false`)
        .then((res) => {
          this.models = res.data;

          console.log("===", res.data);
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
    showreply(e) {
      console.log("hello");
      console.log(e.target);
      console.log(
        e.target.parentElement.parentElement.parentElement.nextElementSibling
      );

      const selectedReply =
        e.target.parentElement.parentElement.parentElement.nextElementSibling;
      selectedReply.classList.toggle("activeReply");
      if (selectedReply.classList.contains("activeReply")) {
        selectedReply.style.display = "block";
      } else {
        selectedReply.style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/course.scss";
</style>