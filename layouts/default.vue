<template>
  <div>
    <Nuxt
      :class="[$store.state.lang == 'ar' ? 'arabicFont' : 'engFont']"
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      // user: {},
    };
  },
  mounted() {
    if (document.children) {
      if (this.$i18n.locale == "ar") {
        this.$moment.locale("ar");
        console.log("arabic ");
        var all = document.getElementsByTagName("*");
        var i;
        for (i = 0; i < all.length; i++) {
          console.log("child ", all[i]);
          all[i].style.direction = "rtl";
          // all[i].style.textAlign = "right";
        }
      } else {
        this.$moment.locale("en");
        console.log("english ");
        var all = document.getElementsByTagName("*");
        var i;
        for (i = 0; i < all.length; i++) {
          console.log("child ", all[i]);
          all[i].style.direction = "ltr";
          // all[i].style.textAlign = "left";
        }
      }
    }

  
  },
  mounted() {
    // console.log("user====", this.$auth.user);
    if (this.$auth.loggedIn && Object.keys(this.$auth.user).length == 0) {
      this.getMe();
    }
  },
  methods: {
    getMe() {
      this.$axios.get("/profile").then((res) => {
        this.user = res.data;
        this.$auth.setUser(res.data);
        console.log("user===hello", Object.keys(this.$auth.user));
      });
    },
  },
};
</script>
<style lang="scss">

// @font-face {
//   font-family: "boldCairo";
//   src: url('../assets/Cairo/Cairo-Bold.ttf');
// }

@font-face {
  font-family: "cairo";
  src: url('../assets/Cairo/Cairo-Regular.ttf');
}

@font-face {
  font-family: "STV";
  src: url('../assets/fonts/STVBold/STV-Bold.ttf');
}


@import "@/assets/style/override.scss";
* {
  padding: 0;
  margin: 0;
}
</style>
