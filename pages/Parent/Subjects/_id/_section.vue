<template>
  <div class="material">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside
        class="d-xl-block d-lg-block d-none"
        :id="$route.params.id"
        :section="$route.params.section"
      />

      <SmallAside
        :id="$route.params.id"
        :section="$route.params.section"
        class="d-xl-none d-lg-none d-md-block"
      />

      <el-main>
        <div class="content bg-white">
          <div class="row">
            <div class="col-md-9">
              <h3 class="parent">
                <span><i class="fas fa-book"></i></span
                >{{ $t("auth.Subjects") }}
              </h3>
            </div>
            <!-- <div class="col-md-3">
              <div :class="[$i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto']">
                <el-select
                  @change="changeStudent()"
                  v-model="name"
                  placeholder=""
                  value-key="item.id"
                  :class="[$i18n.locale === 'en' ? 'arrowEng' : '']"
                >
                  <el-option :label="student" :value="studentID"> </el-option>
                  <el-option
                    v-for="item in students"
                    :key="item.id"
                    :label="item.username"
                    :value="item.section.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div> -->
          </div>
          <div class="container-fluid" v-if="Subjects.length > 0">
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
          <div v-else class="no-questions-available" style="">
                    <div class="no-questions-container">
                      <div class="no-files" style="">
                        <img
                          style="text-align: center;display: block;margin: auto;max-width: 100%"
                          src="@/assets/imgs/Nerd-cuate.png"
                          alt=""
                        />
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
// import { mapState } from "vuex";
export default {
  name: "material",
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
  },
  mounted() {
    this.getSubjects();
    this.getStudent();
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
    // ...mapState(["sectionID"]),
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
      students: [],
      name: null,
      student: null,
      studentID: null,
    };
  },
  methods: {
    getStudent() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get("/parents-students")
        .then((res) => {
          this.students = res.data;
          console.log(this.students);
          let len = this.students.length;
          console.log(len);
          let index;
          for (let i = 0; i < len; i++) {
            let first = this.students[i].id;

            if (first == this.$route.params.id) {
              this.name = this.students[i].section.id;
              this.studentID = this.students[i].section.id;
              this.student = this.students[i].username;
              index = i;
            }
          }
          this.students.splice(index, 1);
          console.log(this.students);
          console.log(this.name);
        })
        .finally(() => loading.close());
    },
    getSubjects() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/sections/${this.$route.params.section}/subjects?paginate=false`)
        .then((res) => {
          this.Subjects = res.data;
          console.log(res.data);
        })
        .finally(() => loading.close());
    },
    changeStudent() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(`/sections/${this.name}/subjects?paginate=false`)
        .then((res) => {
          this.Subjects = res.data;
          console.log(res.data);
        })
        .finally(() => loading.close());
    },
    goTo(subject) {
      console.log();
      this.$router.push({
        name: "Parent-Subjects-lessons-user-section-id",
        params: {
          user: this.$route.params.id,
          section: this.$route.params.section,
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