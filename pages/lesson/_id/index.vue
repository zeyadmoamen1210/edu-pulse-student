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
                        
                            <section
                              class="videoComments"
                             
                            >
                              <div
                                v-for="comment in videoComments"
                                :key="comment.id"
                                class="comment d-flex"
                              >
                                <div v-if="comment.author">
                                  <img
                                    class="photo"
                                    :src="comment.author.photo"
                                    alt=""
                                  />
                                </div>

                                <div>
                                  <h6>{{ comment.author.username }}</h6>
                                  <p>{{ comment.content }}</p>
                                  <span>
                                    {{ $moment(comment.createdAt).fromNow() }}
                                  </span>

                                  <el-collapse
                                    :ref="`replyCollapse${comment.id}`"
                                    @change="getReplies(comment)"
                                  >
                                    <el-collapse-item
                                      name="1"
                                     
                                    >
                                    <template slot="title">
                                        {{ $i18n.locale == 'ar' ? 'الردود' : 'Replies' }} <i class="header-icon el-icon-info"></i>
                                    </template>
                                      <div
                                        v-for="reply in commentReplies"
                                        :key="reply.id"
                                        class="comment d-flex"
                                      >
                                        <div v-if="reply.author">
                                          <img
                                            class="photo"
                                            :src="reply.author.photo"
                                            alt=""
                                          />
                                        </div>

                                        <div>
                                          <h6>{{ reply.author.username }}</h6>
                                          <p>{{ reply.content }}</p>
                                          <span>
                                            {{
                                              $moment(reply.createdAt).fromNow()
                                            }}
                                          </span>
                                        </div>

                                        <div>
                                          <el-popconfirm
                                            :confirm-button-text="
                                              $t('Validation.delete')
                                            "
                                            :cancel-button-text="
                                              $t('Validation.close')
                                            "
                                            @confirm="
                                              deleteReply(reply, comment)
                                            "
                                            icon="el-icon-info"
                                            icon-color="red"
                                            :title="$t('Validation.AreYouSure')"
                                          >
                                            <button
                                              slot="reference"
                                              style="box-shadow: none;"
                                              class="btn"
                                            >
                                              <!-- <img
                                                style=" width: 15px;height: auto;border: none;border-radius: 0;"
                                                src="@/assets/imgs/Icon-material-delete.svg"
                                                alt=""
                                              /> -->
                                            </button>
                                          </el-popconfirm>
                                        </div>
                                      </div>

                                      <div>
                                        <el-input
                                          type="text"
                                          @keydown.enter.native="
                                            postReply(comment)
                                          "
                                          v-model="repleyValue"
                                          name=""
                                          id=""
                                        ></el-input>
                                      </div>
                                    </el-collapse-item>
                                  </el-collapse>
                                </div>

                                <div>
                                  <div>
                                    <el-popconfirm
                                      :confirm-button-text="
                                        $t('Validation.delete')
                                      "
                                      :cancel-button-text="
                                        $t('Validation.close')
                                      "
                                      @confirm="deleteComment(comment, video)"
                                      icon="el-icon-info"
                                      icon-color="red"
                                      :title="$t('Validation.AreYouSure')"
                                    >
                                      <button
                                        slot="reference"
                                        style="box-shadow: none;"
                                        class="btn"
                                      >
                                        <!-- <img
                                          style=" width: 15px;height: auto;border: none;border-radius: 0;"
                                          src="@/assets/imgs/Icon-material-delete.svg"
                                          alt=""
                                        /> -->
                                      </button>
                                    </el-popconfirm>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <el-input
                                  type="text"
                                  v-model="commentValue"
                                  @keydown.enter.native="postComment(video)"
                                  name=""
                                  id=""
                                ></el-input>
                              </div>
                            </section>
                    
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
                  <b-tab :title="$t('auth.Exams')">
                    <div class="row lessons-exams">
                      <div
                        class="col-md-2"
                        v-for="exam in lessonsExams"
                        :key="exam.id"
                      >
                        <div
                          class="exam text-center"
                          @click="
                            $router.push(
                              `/exam/${exam.id}?type_id=${subject.id}`
                            )
                          "
                        >
                          <img src="@/assets/imgs/exam.svg" alt="" />
                          <h6 class="text-center title">{{ exam.title }}</h6>
                          <h6 class="text-center">{{ exam.points }}</h6>

                          <h6
                            class="text-center examAllow"
                            v-if="
                              exam.isAllowed &&
                                !exam.isChecking &&
                                !exam.isPassed
                            "
                          >
                            {{ $i18n.locale == "ar" ? "متاح" : "Allow" }}
                          </h6>
                          <h6
                            class="text-center passed"
                            v-else-if="
                              exam.isAllowed &&
                                !exam.isChecking &&
                                exam.isPassed
                            "
                          >
                            {{ $i18n.locale == "ar" ? "تم بنجاح" : "Passed" }}
                          </h6>
                          <h6
                            class="text-center examNotAllow"
                            v-else-if="!exam.isAllowed && !exam.isChecking"
                          >
                            {{
                              $i18n.locale == "ar" ? "غير متاح" : "Not Allowed"
                            }}
                          </h6>
                          <h6
                            class="text-center examChecking"
                            v-else-if="!exam.isPassed && exam.isChecking"
                          >
                            {{
                              $i18n.locale == "ar"
                                ? "بيتم تصحيحة من المعلم"
                                : "ًTeacher Will Correct It"
                            }}
                          </h6>
                          <h6
                            class="exam-points text-center examPassed mt-3"
                            v-if="exam.isPassed && exam.lastScore >= 0"
                          >
                            {{ exam.lastScore }}
                            <i style="color: #ffc107" class="fas fa-coins"></i>
                          </h6>
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
        commentValue:"",
        repleyValue:"",
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
      lessonsExams: [],
      videoComments: [],
      commentsPage: 1, 
      commentReplies: [],
      commentsTotalPages: 1
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
  
  },
  methods: {

      postReply(comment){
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios.post(`/comments/${comment.id}/replies`, {content: this.repleyValue}).then(res => {
        this.$vs.notification({
            color: "warn",
            position: "top-center",
            text: this.$i18n.locale == 'ar' ? `تم إضافة الرد علي التعليق` : 'Reply Added Successfully',
        });
        this.getReplies(comment)
      }).finally(() => loading.close())
    },


    postComment(video){
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios.post(`/material/${video.id}/comments`, {content: this.commentValue}).then(res => {
        this.$vs.notification({
            color: "warn",
            position: "top-center",
            text: this.$i18n.locale == 'ar' ? `تم إضافة التعليق` : 'Comment Added Successfully',
        });
        this.getVideoComments(video)
      }).finally(() => loading.close())
    },

    deleteReply(reply, comment){
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios.delete(`/posts/${reply.id}`).then(res => {
        this.$vs.notification({
            color: "warn",
            position: "top-center",
            text: this.$i18n.locale == 'ar' ? `تم حذف الرد` : 'Reply Deleted Successfully',
        });
        this.getReplies(comment)
      }).finally(() => loading.close())
    },


    deleteComment(comment, video){
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios.delete(`/posts/${comment.id}`).then(res => {
        this.$vs.notification({
            color: "warn",
            position: "top-center",
            text: this.$i18n.locale == 'ar' ? `تم حذف التعليق` : 'Comments Deleted Successfully',
        });
        this.getVideoComments(video)
      }).finally(() => loading.close())
    },

    getReplies(comment){

      this.repleyValue = "";
      
      this.commentReplies = []


      this.videoComments.map(ele => {
       
          if(ele.id !== comment.id){
            this.$refs['replyCollapse'+ele.id][0].activeNames = []
          }
        
      })
      
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });


      let x = this.$axios.get(`posts/${comment.id}/replies?paginate=false`).then(res => {
        this.commentReplies = res.data;
        console.log(comment)
      }).finally(() => loading.close());

      

    },
  
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
          this.handleYoutubeAndVimeo();
          console.log("videos", this.videos);
          this.video = this.videos[this.i].link;
          this.videoTitle = this.videos[this.i].title;
          this.videoId = this.videos[this.i].id;

          this.getVideoComments();
        })
        .finally(() => loading.close());
    },
    handleYoutubeAndVimeo() {
      this.videos.map((ele) => {
        if (ele.link.includes("youtube.com")) {
          ele.link = ele.link.replace("watch?v=", "embed/");
          if (ele.link.includes("&")) {
            let index = ele.link.indexOf("&");
            ele.link = ele.link.substring(0, index);
          }
        } else if (
          ele.link.includes("vimeo.com") &&
          !ele.link.includes("player")
        ) {
          ele.link = ele.link.replace("vimeo.com/", "player.vimeo.com/video/");
        }

        console.log(ele.link);
      });
    },
    getVideoComments() {

        

        this.commentValue = '';
      this.videoComments = [];


      



    //   this.$refs[`video_comment_${this.video.id}`][0].activeNames = ['1']


      this.$axios
        .get(`/material/${this.videos && this.videos.length > 0 && this.videos[this.i].id}/comments?paginate=false`)
        .then((res) => {
          this.comments = res.data;

          res.data.forEach((ele) => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
            ele.replies = [];
          });

          this.videoComments = res.data;
 


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
    showReplies(comment = null) {
      const loading = this.$vs.loading({
        target: this.$refs.content,
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/posts/${this.commentId}/replies?paginate=false`)
        .then((res) => {
          if (comment) {
            comment.replies = res.data;
          }
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
      this.$axios
        .get(`/lessons/${this.$route.params.id}/exams`)
        .then((res) => {
          this.lessonsExams = res.data;
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
.lessons-exams {
  .exam {
    background: #fff;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 15px;
    position: relative;

    h6.title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .exam-points {
      position: absolute;
      top: 0;
      left: 10px;
    }
    h6 {
      :first-of-type {
        font-size: 20px;
      }
    }
    .examAllow {
      color: var(--bs-success);
    }

    .examNotAllow {
      color: var(--bs-danger);
    }

    .passed {
      color: var(--bs-purple);
    }

    .examChecking {
      color: var(--bs-warning);
    }
  }




  



}
@import "@/assets/style/course.scss";


.videoComments{
      .comment{
        margin-bottom: 10px;
        border-bottom: 1px solid #dddddd80;
        padding-bottom: 10px;

        img{
          width: 60px;
          border-radius: 50%;
          height: 60px;
          padding: 1px;
          border: 1px solid #d4d3df;
        }
        

        div{
          &:nth-of-type(2){
            flex: 1 1 0%;
            padding: 0 10px;

            span{
              color: #717171;
              font-size: 12px;
            }

            p{
              margin-bottom: 0;
            }
            h6{
              margin-bottom: 0;
              font-weight: bold;
            }


          }
        }
        
      }
    }


</style>
