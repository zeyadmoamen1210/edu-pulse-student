<template>
  <div class="result">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container>
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
            <div class="col-md-7">
              <h3 class="parent mt-2">
                <span><i class="fas fa-book"></i></span
                >{{ $t("auth.Subjects") }}
              </h3>
            </div>
            <div class="col-md-5">
              <div :class="[$i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto']">
                <!-- <el-select
                  class="mt-2"
                  @change="changeStudent()"
                  v-model="name"
                  placeholder=""
                  value-key="id"
                  :class="[$i18n.locale === 'en' ? 'arrowEng' : '']"
                >
                  <el-option
                    v-for="item in students"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id"
                  >
                  </el-option>
                </el-select> -->
                <el-select
                  class="mt-2"
                  :placeholder="$t('auth.Subjects')"
                  @change="changeSubject()"
                  v-model="subject"
                  value-key="id"
                  :class="[$i18n.locale === 'en' ? 'arrowEng' : '']"
                >
                  <el-option
                    v-if="$i18n.locale === 'ar'"
                    v-for="item in Subjects"
                    :key="item.id"
                    :label="item.nameAr"
                    :value="item.id"
                  >
                  </el-option>
                  <el-option
                    v-if="$i18n.locale === 'en'"
                    v-for="item in Subjects"
                    :key="item.id"
                    :label="item.nameEn"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row">
              

              <b-tabs>

                <b-tab :title="$t('auth.Lesson')" active>
                  <b-card-text v-if="lessonResult.length > 0">
                    <div class="row">
                      <div
                        class="col-md-4"
                        v-for="(item, index) in lessonResult"
                        :key="index"
                      >
                        <div class="bg-result mx-auto">
                          <div class="row align">
                            <div class="col-md-6">
                              <p>{{ item.title }}</p>
                              <p class="markInPercentage">
                                <span>
                                  {{ $t("auth.mark") }}
                                </span>
                                {{ item.markInPercentage.toFixed(3) }}%
                              </p>
                            </div>
                            <div class="col-md-6">
                              <el-progress
                                type="circle"
                                class="justify"
                                :percentage="
                                  Number(item.markInPercentage.toFixed(3))
                                "
                                :color="colors"
                              ></el-progress>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-card-text>
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
                </b-tab>


                <b-tab :title="$t('auth.Lessons')" active>
                  <b-card-text v-if="unitResult.length > 0">
                    <div class="row">
                      <div
                        class="col-md-4"
                        v-for="(item, index) in unitResult"
                        :key="index"
                      >
                        <div class="bg-result mx-auto">
                          <div class="row align">
                            <div class="col-md-6">
                              <p>{{ item.title }}</p>
                              <p class="markInPercentage">
                                <span>
                                  {{ $t("auth.mark") }}
                                </span>
                                {{ item.markInPercentage.toFixed(3) }}%
                              </p>
                            </div>
                            <div class="col-md-6">
                              <el-progress
                                type="circle"
                                class="justify"
                                :percentage="
                                  Number(item.markInPercentage.toFixed(3))
                                "
                                :color="colors"
                              ></el-progress>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-card-text>
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
                </b-tab>
                
                <b-tab :title="$t('auth.Subjects')">
                  <b-card-text v-if="finalResult.length > 0" class="row">
                    <div
                      class="col-md-4"
                      v-for="(item, index) in finalResult"
                      :key="index"
                    >
                      <div class="bg-result">
                        <div class="row align">
                          <div class="col-md-6">
                            <p>{{ item.title }}</p>
                            <p class="markInPercentage">
                              <span>{{ $t("auth.mark") }}</span>
                              {{ item.markInPercentage.toFixed(3) }}%
                            </p>
                          </div>
                          <div class="col-md-6">
                            <el-progress
                              type="circle"
                              class="justify"
                              :percentage="
                                Number(item.markInPercentage.toFixed(3))
                              "
                              :color="colors"
                            ></el-progress>
                          </div>
                        </div>
                      </div></div
                  ></b-card-text>
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
    this.getStudent();
    this.getSubjects();
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
      subject: null,
      lessonResult: [],
      unitResult: [],
      finalResult: [],
      colors: [
        { color: "#F22424", percentage: 50 },
        { color: "#79C084", percentage: 60 },
      ],
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
              this.name = this.students[i];
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
    changeSubject() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get(
          `/parents-results/students/${this.$route.params.id}/subjects/${this.subject}?type=lesson`
        )
        .then((res) => {
          this.lessonResult = res.data;
          console.log("rr", this.lessonResult);
        });
      this.$axios
        .get(
          `/parents-results/students/${this.$route.params.id}/subjects/${this.subject}?type=unit`
        )
        .then((res) => {
          this.unitResult = res.data;
          console.log("rr", this.unitResult);
        });
      this.$axios
        .get(
          `/parents-results/students/${this.$route.params.id}/subjects/${this.subject}?type=subject`
        )
        .then((res) => {
          this.finalResult = res.data;
          console.log("rr", this.finalResult);
        })
        .finally(() => loading.close());
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/style/result.scss";
</style>
