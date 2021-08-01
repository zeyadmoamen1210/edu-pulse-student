<template>
  <div class="student">
    <div v-if="$i18n.locale == 'ar'" class="ddd-shadow-arabic"></div>
    <div v-else class="ddd-shadow-english"></div>

    <el-container :class="[$i18n.locale === 'en' ? 'leftDirection ' : '']">
      <Aside class="d-xl-block d-lg-block d-none" />

      <SmallAside class="d-xl-none d-lg-none d-md-block" />

      <el-main>
        <div class="bg-white">
          <h3>
            <p>
              <span><i class="fas fa-user-friends"></i></span>
              {{ $t("auth.sons") }}
            </p>
          </h3>
          <div class="container-fluid">
            <div class="row">
              <template>
                <el-table :data="students" style="width: 100%">
                  <el-table-column
                    prop="username"
                    :label="$t('auth.studentName')"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    v-if="$i18n.locale === 'ar'"
                    prop="class.nameAr"
                    :label="$t('auth.Classroom')"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    v-if="$i18n.locale === 'en'"
                    prop="class.nameEn"
                    :label="$t('auth.Classroom')"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column :label="$t('auth.dailyTasks')" width="180">
                    <template slot-scope="scope">
                      <p
                        to=""
                        class="btn"
                        @click="goTo('Parent-tasks-id-section', scope.row)"
                      >
                        {{ $t("auth.showTasks") }}
                        <span v-if="$i18n.locale === 'ar'"
                          ><i class="fas fa-arrow-left"></i
                        ></span>
                        <span v-else-if="$i18n.locale === 'en'"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('auth.Subjects')" width="180">
                    <template slot-scope="scope">
                      <p
                        class="btn"
                        @click="goTo('Parent-Subjects-id-section', scope.row)"
                      >
                        {{ $t("auth.showSubjects") }}
                        <span v-if="$i18n.locale === 'ar'"
                          ><i class="fas fa-arrow-left"></i
                        ></span>
                        <span v-else-if="$i18n.locale === 'en'"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('auth.Exams')" width="180">
                    <template slot-scope="scope">
                      <p
                        class="btn"
                        @click="goTo('Parent-Result-id-section', scope.row)"
                      >
                        {{ $t("auth.showExams") }}
                        <span v-if="$i18n.locale === 'ar'"
                          ><i class="fas fa-arrow-left"></i
                        ></span>
                        <span v-else-if="$i18n.locale === 'en'"
                          ><i class="fas fa-arrow-right"></i
                        ></span>
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/parentAside.vue";
import SmallAside from "@/components/parentSmallSide.vue";
import { mapActions } from "vuex";
export default {
  name: "material",
  middleware: ["auth"],
  components: {
    Aside,
    SmallAside,
  },
  mounted() {
    this.getStudent();
  },
  data() {
    return {
      students: [],
    };
  },
  methods: {
    ...mapActions(["assignName"]),
    getStudent() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .get("/parents-students")
        .then((res) => {
          this.students = res.data;
        })
        .finally(() => loading.close());
    },
    goTo(route, row) {
      console.log(row.section.id);
      console.log(route, row);
      this.assignName(row.section.id);
      this.$router.push({
        name: route,
        params: {
          id: row.id,
          section: row.section.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/students.scss";
</style>