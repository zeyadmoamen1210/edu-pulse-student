<template>
  <div class="Tasks">
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
        <div class="bg-white content">
          <div class="row">
            <div class="col-md-9">
              <h3 class="parent mt-2">
                <span><i class="fas fa-tasks"></i></span>{{ $t("auth.Tasks") }}
              </h3>
            </div>
            <div class="col-md-3">
              <div
                :class="[$i18n.locale === 'ar' ? 'mr-auto' : 'ml-auto']"
                class="mt-2"
              >
                <el-select
                  @change="changeStudent()"
                  v-model="name"
                  placeholder=""
                  :class="[$i18n.locale === 'en' ? 'arrowEng' : '']"
                >
                  <el-option :label="student" :value="studentID"> </el-option>
                  <el-option
                    v-for="item in students"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="conatiner-fluid p-0" v-if="tasks.length > 0">
            <div class="row mt-4" v-for="(item, index) in tasks" :key="index">
              <div class="col-md-12 bg-gray">
                <div class="boder"></div>
                <div class="content">
                  <span><i class="far fa-calendar-minus"></i></span>
                  <p v-if="$i18n.locale === 'ar'">
                    {{ item.dayName }} {{ item.date }}
                  </p>
                  <p v-if="$i18n.locale === 'en'">
                    {{ item.dayNameEng }} {{ item.dateEng }}
                  </p>
                </div>
              </div>
              <el-collapse
                accordion
                class="wow fadeInUp"
                data-wow-duration="0.2s"
              >
                <el-collapse-item
                  v-for="(task, index) in item.tasks"
                  :key="index"
                >
                  <template slot="title">
                    <div class="row rowStyle">
                      <p v-if="$i18n.locale === 'ar'">
                        {{ task.subject.nameAr }}
                      </p>
                      <p v-if="$i18n.locale === 'en'">
                        {{ task.subject.nameEn }}
                      </p>
                      <p>أ/ {{ task.addedBy.username }}</p>
                    </div>
                    <p class="show lang">{{ $t("auth.showDetails") }}</p>
                  </template>
                  <div class="details">
                    <p>
                      <span><i class="fas fa-circle"></i></span>
                      {{ task.notes }}
                    </p>
                  </div>
                </el-collapse-item>
              </el-collapse>
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
import { mapState } from "vuex";

export default {
  components: {
    Aside,
    SmallAside,
  },
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
    ...mapState(["studentName"]),
  },
  data() {
    return {
      tasks: [],
      allTasks: [],
      value: this.studentName,
      students: [],
      name: null,
      student: null,
      studentID: null,
    };
  },
  mounted() {
    this.getTasks();
    this.getStudent();
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
              this.name = this.students[i].id;
              this.studentID = this.students[i].id;
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
    changeStudent() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/todo?student=${this.name}`)
        .then((res) => {
          this.tasks = res.data;
          let len = this.tasks.length;

          var daysEng = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          var days = [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "جمعة",
            "السبت",
          ];

          for (let i = 0; i < len; i++) {
            let dEng = new Date(this.tasks[i]._id);
            this.tasks[i].dateEng = this.tasks[i]._id
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            // this.tasks[i].dateEng = this.tasks[i].dateEng.
            // dEng.getDay() + "/" + dEng.getMonth() + "/" + dEng.getFullYear();
            // console.log(this.tasks[i].date);
            this.tasks[i].dayNameEng = daysEng[dEng.getDay()];
            // console.log(this.tasks[i].dayName);
          }

          for (let i = 0; i < len; i++) {
            let d = new Date(this.tasks[i]._id);
            this.tasks[i].date = this.tasks[i]._id
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            console.log(this.tasks[i].date);
            this.tasks[i].dayName = days[d.getDay()];
            console.log(this.tasks[i].dayName);
          }
        })
        .finally(() => loading.close());
    },
    getTasks() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/todo?student=${this.$route.params.id}`)
        .then((res) => {
          this.tasks = res.data;
          let len = this.tasks.length;

          var daysEng = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          var days = [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "جمعة",
            "السبت",
          ];

          for (let i = 0; i < len; i++) {
            let dEng = new Date(this.tasks[i]._id);
            this.tasks[i].dateEng = this.tasks[i]._id
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            // this.tasks[i].dateEng = this.tasks[i].dateEng.
            // dEng.getDay() + "/" + dEng.getMonth() + "/" + dEng.getFullYear();
            // console.log(this.tasks[i].date);
            this.tasks[i].dayNameEng = daysEng[dEng.getDay()];
            // console.log(this.tasks[i].dayName);
          }

          for (let i = 0; i < len; i++) {
            let d = new Date(this.tasks[i]._id);
            this.tasks[i].date = this.tasks[i]._id
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-");
            console.log(this.tasks[i].date);
            this.tasks[i].dayName = days[d.getDay()];
            console.log(this.tasks[i].dayName);
          }
        })
        .finally(() => loading.close());
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/tasks.scss";
</style>