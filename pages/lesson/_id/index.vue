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
                          height="350"
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

                    <section v-if="openUpdateCommentModel" class="mb-3">
                      <h6> {{$i18n.locale == 'ar' ? 'تعديل التعليق' : 'Update Comment'}} </h6>
                      <el-form
                        :model="updateComment"
                        ref="updateComment"
                        class="for-add-or-update mt-1"
                      >
                        <div class="row">
                          <div class="col-md-8">
                            <div>
                              <el-form-item
                                prop="content"
                                :rules="[
                                  {
                                    required: true,
                                    message: $t('auth.nameEn'),
                                    trigger: 'blur',
                                  },
                                ]"
                              >
                                <el-input
                                  :placeholder="$t('auth.nameEn')"
                                  v-model="updateComment.content"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="d-flex flex-row-reverse">
                              <el-form-item>
                                <el-button
                                  class="btn btn-org"
                                  @click="submitForm('updateComment')"
                                  type="warning"
                                >
                                  {{ $t("auth.save") }}
                                </el-button>
                                <el-button
                                  class="btn btn-white"
                                  @click="openUpdateCommentModel = false"
                                  type="info"
                                >
                                  {{ $t("auth.close") }}
                                </el-button>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                      </el-form>
                    </section>

                    <div class="question">
                      <h4>{{ $t("auth.DiscussionsAndQuestions") }}</h4>

                      <div class="sendMsg">
                        <div class="row">
                          <div
                            class="col-md-1 pic p-0"
                            style="text-align: end; margin-top: 0.2rem"
                          >
                            <el-avatar
                              v-if="
                                $auth.user.photo && $auth.user.photo != 'null'
                              "
                              size="large"
                              :src="$auth.user.photo"
                            ></el-avatar>

                            <el-avatar
                              v-else
                              size="large"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXU1NT////Y2Nj7+/va2trm5ubz8/Pf39/29vbe3t7j4+P8/Pzt7e3Z2dn09PTp6enlgXfuAAAEj0lEQVR4nO2dCZarOgxEMVPCkGT/u31N8+mEEIIHVUmf47sC6ghNRhZFkclkMplMJpPJZDKZTCaTyWQymUwmk8lsKLuu75sf+r7rSu2niaNrxrZyK6p2bDrt5wqibtrB7TC0Ta39fH6Uj+ueiIXrw/5r1rdHKmbaXvtJv9JUxxL+PKbRfto9yhAZsxSTb1gfKONXir0XrPb0jXdaYyHssRtujxge2s/+wu0w4H7jetN+/oU+2hz/GcWIp4xpMiZGbQ0TkV6+ptVWUZR3CR3O3ZVTSpnk5q9cVZWUEUlwj0pRiZw9JhRtIuQfC3ctHSLx6hWl2PWQ1uGcSrlykdfh3IWvQzJgPVEIXeIOMkN3kwajwzlyA1wmFrz7DNyXS6Di3YNaCXc4Hc4xDyNFS5N3rjwdPVKHc7yGEWoQokkgOf0VVn4HG4RmEmjImuEELmAOWeDkEki1uKZi6ADH3hlGBAaVvWsYRTCsXHxlwOuAJ5EZfCoBdOqfwHfv8Gw4A8+JJUeHc+j+iuQieCeB9ervoHt3Qn0yg65SKOlwAp0SCYXWDLrcYulwDquDFn3R8bfmCcGORBC6wwVsl3gaIbTEjk7tlPZwBtsknsYip/GR0wg5TR45TYlynqKR1LLjm/bT9COk0yD8edBpDh9OcxzEClv4DwukYxT8px5S/Yv/QEJyEsJECiUlMr7rUg5NGcNOlHeLMutEqFI4c3SEuEUaq4HnRMpn9oLg7qy5RtxA4wxvrBFcy/PmsTHDywvMIWaol1Anf4F1CnE2s4Ae1JGv7sPaEvZNPpS/868r1JBkMijcQYaUXCqXXQFuonTVVTwGcyPvE2mH17tS2Yk6/KC4/KWTvOKqusSmFlNSKS9/kFKiraMobiJKKgN7HySuUOteZv8jOTOaWPkwcUl6vSqFC7p7lAmHdq2N12ohdjeKlZ0oT25RnjIaiFYbuuDwdbW6ke4S5CqtISff0Hi7ymB24VlR9mNQGK7G3lbA+qVsonaL3I1tb/PdBfgJO/sB67A3aks1qpe+P1xE1tXctSPYRW6bk6aUXnYJkpazyFnjT4qGVW6Qr9QtvfaKX8z4HfLaxph1n74Q14KmtFE+sFqttMbWB07zSxmhwx9H1KxLx+CqJXVtqT/YZp42vjwBDMS0i7ozKEeRXS/pA+YkVe4Lgj+IM3oNHQglOjrklWjpkFYi+a0wWIngcaSePX6ViNkEOzDnoUQoCvPzxztC+YR2P2wfkclscl3yGYFqhbbR5TvJZ/fEW8bfSQzC2gHrSWLoMuDoC0kOb8RBZhLcBDOAGUvC4KZ6JlwTPSlI7dB9iOzibb1YE5Evl6GItRAVuYi7XPyJOOyykwpfiUiLJmrFLcHVI/pCWCzBF8mMGiTYJFYNEmwSswYJNMnNrEF+TBLy4dewQYJMYtdDJgK8xFy1uMa/djSZ1J943xInLpqLw/frtcGyd41nEUzcVxqLn7sbd/UJP3c31ql/wqt7Jy7+i8en5zV1lrWHzxmX8E8OMXj8OvF/ELMmjuOWyTOHLcenEOaz4cxxTjRd+D7Z/KDkH+MbT03dnEr6AAAAAElFTkSuQmCC"
                            ></el-avatar>
                          </div>
                          <div class="col-md-6">
                            <el-input
                              v-model="commentValue"
                              class="comment-input"
                              @keydown.enter.native="postComment()"
                              :placeholder="$t('auth.Addcomment')"
                            ></el-input>
                          </div>
                          <div class="col-md-1 p-0">
                            <div class="icon">
                              <i
                                class="fas fa-location-arrow pointer"
                                @click="postComment()"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="msg mt-3">
                        <section class="videoComments">
                          <div
                            v-for="comment in videoComments"
                            :key="comment.id"
                            class="comment row"
                          >
                            <div
                              class="comment-author-photo col-md-1"
                              v-if="comment.author"
                            >
                              <span
                                v-if="comment.author.role == 'admin'"
                                class=""
                              >
                                <i class="fas fa-user-lock admin"></i>
                              </span>
                              <span
                                v-else-if="comment.author.role == 'teacher'"
                                class=""
                              >
                                <i class="fas fa-user-tie teacher"></i>
                              </span>
                              <img
                                v-if="
                                  comment.author.photo &&
                                    comment.author.photo != 'null'
                                "
                                class="photo"
                                :src="comment.author.photo"
                                alt=""
                              />

                              <img
                                v-else
                                class="photo"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXU1NT////Y2Nj7+/va2trm5ubz8/Pf39/29vbe3t7j4+P8/Pzt7e3Z2dn09PTp6enlgXfuAAAEj0lEQVR4nO2dCZarOgxEMVPCkGT/u31N8+mEEIIHVUmf47sC6ghNRhZFkclkMplMJpPJZDKZTCaTyWQymUwmk8lsKLuu75sf+r7rSu2niaNrxrZyK6p2bDrt5wqibtrB7TC0Ta39fH6Uj+ueiIXrw/5r1rdHKmbaXvtJv9JUxxL+PKbRfto9yhAZsxSTb1gfKONXir0XrPb0jXdaYyHssRtujxge2s/+wu0w4H7jetN+/oU+2hz/GcWIp4xpMiZGbQ0TkV6+ptVWUZR3CR3O3ZVTSpnk5q9cVZWUEUlwj0pRiZw9JhRtIuQfC3ctHSLx6hWl2PWQ1uGcSrlykdfh3IWvQzJgPVEIXeIOMkN3kwajwzlyA1wmFrz7DNyXS6Di3YNaCXc4Hc4xDyNFS5N3rjwdPVKHc7yGEWoQokkgOf0VVn4HG4RmEmjImuEELmAOWeDkEki1uKZi6ADH3hlGBAaVvWsYRTCsXHxlwOuAJ5EZfCoBdOqfwHfv8Gw4A8+JJUeHc+j+iuQieCeB9ervoHt3Qn0yg65SKOlwAp0SCYXWDLrcYulwDquDFn3R8bfmCcGORBC6wwVsl3gaIbTEjk7tlPZwBtsknsYip/GR0wg5TR45TYlynqKR1LLjm/bT9COk0yD8edBpDh9OcxzEClv4DwukYxT8px5S/Yv/QEJyEsJECiUlMr7rUg5NGcNOlHeLMutEqFI4c3SEuEUaq4HnRMpn9oLg7qy5RtxA4wxvrBFcy/PmsTHDywvMIWaol1Anf4F1CnE2s4Ae1JGv7sPaEvZNPpS/868r1JBkMijcQYaUXCqXXQFuonTVVTwGcyPvE2mH17tS2Yk6/KC4/KWTvOKqusSmFlNSKS9/kFKiraMobiJKKgN7HySuUOteZv8jOTOaWPkwcUl6vSqFC7p7lAmHdq2N12ohdjeKlZ0oT25RnjIaiFYbuuDwdbW6ke4S5CqtISff0Hi7ymB24VlR9mNQGK7G3lbA+qVsonaL3I1tb/PdBfgJO/sB67A3aks1qpe+P1xE1tXctSPYRW6bk6aUXnYJkpazyFnjT4qGVW6Qr9QtvfaKX8z4HfLaxph1n74Q14KmtFE+sFqttMbWB07zSxmhwx9H1KxLx+CqJXVtqT/YZp42vjwBDMS0i7ozKEeRXS/pA+YkVe4Lgj+IM3oNHQglOjrklWjpkFYi+a0wWIngcaSePX6ViNkEOzDnoUQoCvPzxztC+YR2P2wfkclscl3yGYFqhbbR5TvJZ/fEW8bfSQzC2gHrSWLoMuDoC0kOb8RBZhLcBDOAGUvC4KZ6JlwTPSlI7dB9iOzibb1YE5Evl6GItRAVuYi7XPyJOOyykwpfiUiLJmrFLcHVI/pCWCzBF8mMGiTYJFYNEmwSswYJNMnNrEF+TBLy4dewQYJMYtdDJgK8xFy1uMa/djSZ1J943xInLpqLw/frtcGyd41nEUzcVxqLn7sbd/UJP3c31ql/wqt7Jy7+i8en5zV1lrWHzxmX8E8OMXj8OvF/ELMmjuOWyTOHLcenEOaz4cxxTjRd+D7Z/KDkH+MbT03dnEr6AAAAAElFTkSuQmCC"
                                alt=""
                              />
                            </div>

                            <div class="col-md-11" v-if="comment.author">
                              <div class="d-flex">
                                <div>
                                  <h6 style="flex: 1;mb-2">
                                    {{ comment.author.username }}
                                  </h6>
                                  <p>{{ comment.content }}</p>
                                </div>
                                <div
                                  style="display: flex;justify-content: flex-end;"
                                >
                                  <h6
                                    style="font-size: 13px;color: #545185;text-align: center;"
                                  >
                                    <h6>{{ comment.createdAt }}</h6>

                                    <span
                                      @click="openEditComment(comment)"
                                      v-if="comment.author.id === $auth.user.id"
                                      class="edit  mr-1 ml-1"
                                      style="color: #6f42c1;cursor: pointer"
                                    >
                                      <i
                                        class="fas fa-edit"
                                        style="font-size: 20px;margin:0 3px"
                                      ></i
                                    ></span>

                                    <el-popconfirm
                                      v-if="comment.author.id === $auth.user.id"
                                      :confirm-button-text="$t('auth.delete')"
                                      :cancel-button-text="$t('auth.close')"
                                      @confirm="deleteComment(comment)"
                                      icon="el-icon-info"
                                      icon-color="red"
                                      class="mr-1 ml-1"
                                      :title="$t('auth.AreYouSure')"
                                    >
                                      <i
                                        style="font-size: 20px;color:var(--bs-danger);cursor:pointer;margin:0 3px"
                                        slot="reference"
                                        class="fas fa-trash-alt mr-1 ml-1"
                                      ></i>
                                    </el-popconfirm>
                                  </h6>
                                </div>
                              </div>

                              <el-collapse
                                :ref="`replyCollapse${comment.id}`"
                                @change="getReplies(comment)"
                              >
                                <el-collapse-item name="1">
                                  <template slot="title">
                                    <img
                                      style="width: 17px;"
                                      src="@/assets/imgs/comments-2.png"
                                      alt=""
                                    />
                                  </template>
                                  <div
                                    v-for="reply in commentReplies"
                                    :key="reply.id"
                                    class="comment d-flex"
                                  >
                                    <div v-if="reply.author">
                                      <img
                                        v-if="
                                          reply.author.photo &&
                                            reply.author.photo != 'null'
                                        "
                                        class="photo"
                                        :src="reply.author.photo"
                                        alt=""
                                      />

                                      <img
                                        v-else
                                        class="photo"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXU1NT////Y2Nj7+/va2trm5ubz8/Pf39/29vbe3t7j4+P8/Pzt7e3Z2dn09PTp6enlgXfuAAAEj0lEQVR4nO2dCZarOgxEMVPCkGT/u31N8+mEEIIHVUmf47sC6ghNRhZFkclkMplMJpPJZDKZTCaTyWQymUwmk8lsKLuu75sf+r7rSu2niaNrxrZyK6p2bDrt5wqibtrB7TC0Ta39fH6Uj+ueiIXrw/5r1rdHKmbaXvtJv9JUxxL+PKbRfto9yhAZsxSTb1gfKONXir0XrPb0jXdaYyHssRtujxge2s/+wu0w4H7jetN+/oU+2hz/GcWIp4xpMiZGbQ0TkV6+ptVWUZR3CR3O3ZVTSpnk5q9cVZWUEUlwj0pRiZw9JhRtIuQfC3ctHSLx6hWl2PWQ1uGcSrlykdfh3IWvQzJgPVEIXeIOMkN3kwajwzlyA1wmFrz7DNyXS6Di3YNaCXc4Hc4xDyNFS5N3rjwdPVKHc7yGEWoQokkgOf0VVn4HG4RmEmjImuEELmAOWeDkEki1uKZi6ADH3hlGBAaVvWsYRTCsXHxlwOuAJ5EZfCoBdOqfwHfv8Gw4A8+JJUeHc+j+iuQieCeB9ervoHt3Qn0yg65SKOlwAp0SCYXWDLrcYulwDquDFn3R8bfmCcGORBC6wwVsl3gaIbTEjk7tlPZwBtsknsYip/GR0wg5TR45TYlynqKR1LLjm/bT9COk0yD8edBpDh9OcxzEClv4DwukYxT8px5S/Yv/QEJyEsJECiUlMr7rUg5NGcNOlHeLMutEqFI4c3SEuEUaq4HnRMpn9oLg7qy5RtxA4wxvrBFcy/PmsTHDywvMIWaol1Anf4F1CnE2s4Ae1JGv7sPaEvZNPpS/868r1JBkMijcQYaUXCqXXQFuonTVVTwGcyPvE2mH17tS2Yk6/KC4/KWTvOKqusSmFlNSKS9/kFKiraMobiJKKgN7HySuUOteZv8jOTOaWPkwcUl6vSqFC7p7lAmHdq2N12ohdjeKlZ0oT25RnjIaiFYbuuDwdbW6ke4S5CqtISff0Hi7ymB24VlR9mNQGK7G3lbA+qVsonaL3I1tb/PdBfgJO/sB67A3aks1qpe+P1xE1tXctSPYRW6bk6aUXnYJkpazyFnjT4qGVW6Qr9QtvfaKX8z4HfLaxph1n74Q14KmtFE+sFqttMbWB07zSxmhwx9H1KxLx+CqJXVtqT/YZp42vjwBDMS0i7ozKEeRXS/pA+YkVe4Lgj+IM3oNHQglOjrklWjpkFYi+a0wWIngcaSePX6ViNkEOzDnoUQoCvPzxztC+YR2P2wfkclscl3yGYFqhbbR5TvJZ/fEW8bfSQzC2gHrSWLoMuDoC0kOb8RBZhLcBDOAGUvC4KZ6JlwTPSlI7dB9iOzibb1YE5Evl6GItRAVuYi7XPyJOOyykwpfiUiLJmrFLcHVI/pCWCzBF8mMGiTYJFYNEmwSswYJNMnNrEF+TBLy4dewQYJMYtdDJgK8xFy1uMa/djSZ1J943xInLpqLw/frtcGyd41nEUzcVxqLn7sbd/UJP3c31ql/wqt7Jy7+i8en5zV1lrWHzxmX8E8OMXj8OvF/ELMmjuOWyTOHLcenEOaz4cxxTjRd+D7Z/KDkH+MbT03dnEr6AAAAAElFTkSuQmCC"
                                        alt=""
                                      />
                                    </div>

                                    <div>
                                      <h6>{{ reply.author.username }}</h6>
                                      <p>{{ reply.content }}</p>
                                      <span
                                        style="font-size: 13px;color: #545185;"
                                      >
                                        {{ $moment(reply.createdAt).fromNow() }}
                                      </span>
                                    </div>


                                    <span
                                      @click="openEditComment(reply)"
                                      v-if="reply.author.id === $auth.user.id"
                                      class="edit  mr-1 ml-1"
                                      style="color: #6f42c1;cursor: pointer"
                                    >
                                      <i
                                        class="fas fa-edit"
                                        style="font-size: 20px;margin:0 3px"
                                      ></i
                                    ></span>

                                    <el-popconfirm
                                      v-if="reply.author.id === $auth.user.id"
                                      :confirm-button-text="$t('auth.delete')"
                                      :cancel-button-text="$t('auth.close')"
                                      @confirm="deleteComment(reply)"
                                      icon="el-icon-info"
                                      icon-color="red"
                                      class="mr-1 ml-1"
                                      :title="$t('auth.AreYouSure')"
                                    >
                                      <i
                                        style="font-size: 20px;color:var(--bs-danger);cursor:pointer;margin:0 3px"
                                        slot="reference"
                                        class="fas fa-trash-alt mr-1 ml-1"
                                      ></i>
                                    </el-popconfirm>


                                    

                                    <!-- <div>
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
                                            
                                            </button>
                                          </el-popconfirm>
                                        </div> -->
                                  </div>

                                  <div>
                                    <h6>
                                      {{
                                        $i18n.locale == "ar"
                                          ? "أكتب رد"
                                          : "Post Reply"
                                      }}
                                    </h6>
                                    <div class="d-flex">
                                      <el-input
                                        type="text"
                                        @keydown.enter.native="
                                          postReply(comment)
                                        "
                                        :placeholder="
                                          $i18n.locale == 'ar'
                                            ? 'أكتب رد'
                                            : 'Post Reply'
                                        "
                                        v-model="repleyValue"
                                        name=""
                                        class="comment-input mt-3"
                                        id=""
                                      ></el-input>

                                      <div class="icon postthereply mt-2">
                                        <i
                                          class="fas fa-location-arrow pointer"
                                          @click="postReply(comment)"
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                </el-collapse-item>
                              </el-collapse>
                            </div>
                            <!-- 
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
                                       
                                      </button>
                                    </el-popconfirm>
                                  </div>
                                </div> -->
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
                            <p class="d-block" style="text-align:center !important">{{ pdf.title }}</p>
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
                            openExam(exam)
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
      commentValue: "",
      repleyValue: "",
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
      updateComment: {},
      commentsTotalPages: 1,
      openUpdateCommentModel: false,
    };
  },
  watch: {},
  mounted() {
    this.getSubject();
    this.getVideo();
    this.getPdf();
    this.getExams();
  },
  methods: {

    openExam(exam){
      this.$router.push(
        `/exam/${exam.id}?type_id=${this.subject.id}`
      )
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveComment();
        }
      });
    },


    saveComment(){
      const loading = this.$vs.loading();
      this.$axios.patch(`/posts/${this.updateComment.id}`, {content: this.updateComment.content}).then(() => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم تعديل التعليق`
                : "Comments Updated Successfully",
          });
          this.updateComment = {};
          this.openUpdateCommentModel = false;

          this.getVideoComments();
      }).catch((err) => {
        this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `حدث خطأ`
                : "There Are Something Wrong",
          });
      })
      .finally(() => loading.close())
    },

    openEditComment(comment) {
      this.updateComment = { ...comment };
      this.openUpdateCommentModel = true;

      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    deleteComment(comment) {
      const loading = this.$vs.loading();
      this.$axios
        .delete(`/posts/${comment.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم حذف التعليق`
                : "Comments Deleted Successfully",
          });
          this.getVideoComments();
        })
        .finally(() => loading.close());
    },

    postReply(comment) {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .post(`/comments/${comment.id}/replies`, { content: this.repleyValue })
        .then((res) => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم إضافة الرد علي التعليق`
                : "Reply Added Successfully",
          });
          this.getReplies(comment);
        })
        .finally(() => loading.close());
    },

    postComment() {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .post(`/material/${this.videoId}/comments`, {
          content: this.commentValue,
        })
        .then((res) => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم إضافة التعليق`
                : "Comment Added Successfully",
          });
          this.getVideoComments();
        })
        .finally(() => loading.close());
    },

    deleteReply(reply, comment) {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .delete(`/posts/${reply.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم حذف الرد`
                : "Reply Deleted Successfully",
          });
          this.getReplies(comment);
        })
        .finally(() => loading.close());
    },

    deleteComment(comment, video) {
      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });
      this.$axios
        .delete(`/posts/${comment.id}`)
        .then((res) => {
          this.$vs.notification({
            color: "#FFF3EA",
            position: "top-center",
            text:
              this.$i18n.locale == "ar"
                ? `تم حذف التعليق`
                : "Comments Deleted Successfully",
          });
          this.getVideoComments(video);
        })
        .finally(() => loading.close());
    },

    getReplies(comment) {
      this.repleyValue = "";

      this.commentReplies = [];

      this.videoComments.map((ele) => {
        if (ele.id !== comment.id) {
          this.$refs["replyCollapse" + ele.id][0].activeNames = [];
        }
      });

      const loading = this.$vs.loading({
        type: "scale",
        color: "#F28227",
      });

      let x = this.$axios
        .get(`posts/${comment.id}/replies?paginate=false`)
        .then((res) => {
          this.commentReplies = res.data;
          console.log(comment);
        })
        .finally(() => loading.close());
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
      this.commentValue = "";
      this.videoComments = [];

      //   this.$refs[`video_comment_${this.video.id}`][0].activeNames = ['1']

      const loading = this.$vs.loading();
      this.$axios
        .get(
          `/material/${this.videos &&
            this.videos.length > 0 &&
            this.videos[this.i].id}/comments?paginate=false`
        )
        .then((res) => {
          this.comments = res.data;

          res.data.forEach((ele) => {
            ele.createdAt = this.$moment(ele.createdAt).fromNow();
            ele.replies = [];
          });

          this.videoComments = res.data;
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
      this.getVideoComments();
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

.videoComments {
  .comment {
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(221, 221, 221, 0.50196);
    padding: 20px 10px;
    background: #fff;

    img.photo {
      width: 60px;
      border-radius: 50%;
      height: 60px;
      padding: 1px;
      border: 1px solid #d4d3df;
    }

    div {
      &:nth-of-type(2) {
        flex: 1 1 0%;
        padding: 0 10px;

        span {
          color: #717171;
          font-size: 12px;
        }

        p {
          margin-bottom: 0;
        }
        h6 {
          margin-bottom: 0;
          font-weight: bold;
        }
      }
    }
  }

  .el-collapse-item__header {
    border: none !important;
  }

  .el-collapse-item {
    div {
      &:first-of-type {
      }
    }
  }
}

.comment-input {
  input {
    background: none;
    border: none;
    border-bottom: 1px solid #545185;
    border-radius: 0;
    margin-top: -7px;
    height: 39px;
  }
}
.postthereply {
  background: #a5a5a5;
  margin: 8px;
  cursor: pointer;
  border-radius: 6px !important;
}

.comment-author-photo {
  position: relative;
  span {
    i {
      bottom: 8px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 19px;
      &.teacher {
        color: #f28227;
      }
      &.admin {
        color: #f56c6c;
      }
    }
  }
}

.btn.el-popover__reference {
  color: var(--bs-danger);
}

:root {
  --yellow: #ffa400;
  // #f28325;
  --blue: #7c77c7;
  --danger: #f56c6c;
}

// Override Element Pop Confirm
.el-popconfirm {
  .el-popconfirm__main {
    color: var(--blue);
  }

  .el-popconfirm__icon {
    color: var(--yellow) !important;
    margin-left: 5px;
  }

  .el-popconfirm__action {
    text-align: center;
    margin: 0;

    .el-button.el-button--text.el-button--mini {
      background: #fff !important;
      border-color: #fff !important;
      color: var(--yellow);
      padding: 7px 9px;
    }

    .el-button.el-button--primary.el-button--mini {
      background: var(--yellow) !important;
      border-color: var(--yellow) !important;
      color: #fff;
      border-radius: 10px;
    }
  }
}

// Override element form add / update
.el-form.for-add-or-update {
  padding: 10px;
  background: #f9f9f9;

  .col-md-4 {
    .d-flex.flex-row-reverse {
      .el-form-item {
        margin-bottom: 0 !important;
      }
    }
  }

  .upload-demo {
    display: flex;
  }

  .el-form-item {
    margin-bottom: 0 !important;

    .el-button {
      padding: 7px 7px;
      margin: 0 3px !important;
    }
  }

  .el-button.attach-img {
    padding: 7px 9px !important;
  }
}







// Override warning color button
.el-button--warning:focus,
.el-button--warning:hover {
  background: var(--yellow) !important;
  border-color: var(--yellow) !important;
  color: #FFF;

}

.el-button--warning:not(.is-plain) {
  background: var(--yellow) !important;
  border-color: var(--yellow) !important;
  color: #FFF;
  border-radius: 10px;
}


.el-button--warning.is-plain {
  background: #fdf6ec !important;
  border-color: #f5dab1 !important;
  color: #E6A23C !important;

}

.el-button--danger {
  background: #fff !important;
  border-color: #fff !important;
  color: var(--danger);
  border-radius: 10px;
  border: 1px solid var(--danger) !important;

  &:hover {
    color: var(--danger) !important;
  }
}
.btn {
  font-size: 12px !important;
  font-family: 'Cairo', sans-serif !important;
  font-weight: 600 !important;
  border-radius: 6px !important;


  &.btn-white {
    border: none !important;
    background: var(--danger);
  }
}
</style>
