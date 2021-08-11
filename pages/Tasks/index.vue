<template>
  <div class="Tasks">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />

      <el-main>
        <div class="bg-white">
          <h3>
            <span><i class="fas fa-tasks"></i></span>{{ $t("auth.Tasks") }}
          </h3>
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
                    <p class="show" style="    font-size: 16px;padding-top: 5px;">عرض التفاصيل</p>
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
import Aside from "@/components/aside.vue";
import SmallAside from "@/components/asideSmallScreen.vue";

export default {
  components: {
    Aside,
    SmallAside,
  },
  middleware:['auth'],
  computed: {
    isArabic() {
      return this.$store.state.lang == "ar";
    },
  },
  data() {
    return {
      tasks: [],
      allTasks: [],
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      this.$axios
        .get(`/todo?student=${this.$auth.user.id}`)
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
            this.tasks[i].dateEng =
              dEng.getFullYear() + "/" + dEng.getMonth() + "/" + dEng.getDay();
            // console.log(this.tasks[i].date);
            this.tasks[i].dayNameEng = daysEng[dEng.getDay()];
            // console.log(this.tasks[i].dayName);
          }

          for (let i = 0; i < len; i++) {
            let d = new Date(this.tasks[i]._id);
            this.tasks[i].date =
              d.getFullYear() + "/" + d.getMonth() + "/" + d.getDay();
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