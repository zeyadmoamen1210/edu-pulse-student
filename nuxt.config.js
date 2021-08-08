export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'educational-platform-student',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'animate.css/animate.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui.js',
    '@/plugins/nuxt-i18n.js',
    '@/plugins/vue-moment.js',
    '@/plugins/fontawesome.js',
    '@/plugins/aos.client.js',
    '@/plugins/countdown.js',



  ],


  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token',
          },
          user: false,
          logout: false,
        },
        // tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    plugins: [{
      src: '~plugins/auth.js',
      ssr: false,
    }, ],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/moment',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', {
      defaultLocale: 'ar',
      seo: false,


      strategy: 'no_prefix',


      locales: [{
          code: 'en',
          name: 'English',
          dir: 'ltr'
        },
        {
          code: 'ar',
          name: 'العربية',
          dir: 'rtl'
        },

      ]
    }]

  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://educational-be.herokuapp.com/api/v1',
    common: {
      Accept: 'application/json',
      Authorization: '',
    },
  },


  i18n: {

    vueI18n: {
      defaultLocale: 'ar',
      fallbackLocale: 'en',
      messages: {
        en: {
          auth: {
            "notAllowedToSolve":"This Exam Time Is Finished",
            "examPoints": "Your Mark",
            "Login": "Login",
            "Email": "Email",
            "Password": "Password",
            "RememberMe": "Remember  Me",
            "UserName": "User Name",
            "UserNamePlaceholder": "Enter your User Name",
            "ForgetPassword": "Forget Password",
            "ValidateEmail2": "Invalid Email",
            "ValidateEmail": "Please Input Email ",
            "ValidatePassword": "Please Input Password ",
            "EmailPlaceholder": "Enter Email Address",
            "PasswordPlaceholder": "Enter Password",
            "Remember": "Remember Me",
            "Forget": "Forget your password?",
            "ForgetNote": "Enter your email to reset your password",
            "Send": "Send",
            "CodeNote": "Please enter the 5 numbers sent to your email",
            "Code": "verification code",
            "Verify": "Verify",
            "subNote": "Didn't get the code? Resend",
            "ConPasswordPlaceholder": "Confirm Password",
            "Reset": "Reset the password ",
            "ResetNote": "Please enter the new password, which should not be less than 6 digits",
            "error": " Passwords Must be same",
            "FirstName": "First Name",
            "LastName": "Last Name",
            "Email": "Email",
            "ProfileImg": "Personal Picture",
            "ChangePassword": "Change Password",
            "CurrentPassword": "Current",
            "NewPassword": "New",
            "ConfirmPassword": "Confirm Password",
            "SaveButton": "Save",
            "Cancel": "Cancel",
            "Information": "Basic information",
            "Update": "Update",
            "HomePage": "Home",
            "Material": "Material",
            "Profile": "Profile",
            "Logout": "Logout",
            "ShowContent": "View Content",
            "StartExam": "Start Exam",
            "Exams": "Exams",
            "Lessons": "Lessons",
            "Explain": "Expalain",
            "Files": "Files",
            "Similarexplanations": "Similar Explanations",
            "DiscussionsAndQuestions": "Discussions And Questions",
            "Addcomment": "Add a comment or question",
            "Exammodel": "Exam model",
            "NextQuestion": "Next Question",
            "preQuestion": "Previou Question",
            "SendExam": "Send Exam and exit",
            "TotalScore": "Total Score",
            "ExamNote": "   You can repeat the exam or find out the wrong questions ",
            "RepeatExam": "Repeat Exam ",
            "WrongAnswer": "Show Your Solutions And The ModelAnswer",
            "Reply": "Reply",
            "choose": "choose the true answer",
            "complete": "Complete here",
            "answerHere": " Write your answer here",
            "true": "True",
            "false": "False",
            "ShowReplies": "Show Replies",
            "Tasks": "Weekly Tasks ",
            "sons": "Sons",
            "studentName": "Student Name",
            "Classroom": "Classroom",
            "dailyTasks": "Daily Tasks",
            "Subjects": "Subjects",
            "Exams": "Exams",
            "showTasks": "Show Tasks",
            "showSubjects": "Show Subjects",
            "showExams": "Show Exams",
            "showDetails": "Show Details",
            "Lesson": "Lessons",
            "mark": "Success Rate",
            "Sure": "Are you Sure",

            "Cancel": "cancel",
            "Live": "Live ",
            'NotPassed': 'You Not Passed The Required Percentage In This Exam',
            "NoQuestionInExam": "No Questions In This Exam",

              "isCheckingByTeacher": "This Exam Is Checking By Your Teacher We Will Your Mark Will Be Displayed After Revision",



          }
        },
        ar: {
          auth: {
            "NoQuestionInExam": "لا توجد أسئلة في الامتحان",
            'NotPassed': 'لم تتجاوز النسبة المطلوبة للامتحان',
            "notAllowedToSolve":"انتهي وقت هذا الامتحان",
            "examPoints": "الدرجة",
            "Login": "تسجيل الدخول",
            "Email": "البريد الإلكتروني",
            "UserNamePlaceholder": "ادخل اسم المستخدم",
            "Password": "كلمة المرور",
            "UserName": "اسم المستخدم",
            "RememberMe": "تذكرني",
            "ForgetPassword": "هل نسيت كلمة المرور",
            "ValidateEmail": "البريد الإلكتروني مطلوب",
            "ValidateEmail2": "البريد الإلكتروني غير صحيح",
            "ValidatePassword": "كلمة المرور مطلوبة ",
            "EmailPlaceholder": "أدخل البريد الإلكتروني",
            "PasswordPlaceholder": "أدخل كلمة المرور",
            "Remember": "تذكرني",
            "Forget": "نسيت كلمة المرور ؟",
            "ForgetNote": "ادخل البريد الالكترونى الخاص بك  لاعادة  تعين كلمة المرور  ",
            "Send": "ارسال",
            "CodeNote": "من فضلك ادخل ال 5  ارقام التي أرسلت الى بريدك الالكترونى",
            "Code": "كود التأكيد",
            "Verify": "تاكيد",
            "subNote": "لم احصل على الكود؟ إعادة ارسال",
            "ConPasswordPlaceholder": "تأكيد كلمة المرور",
            "Reset": "اعادة تعين كلمة المرور ",
            "ResetNote": "من فضلك ادخل كلمة المرور الجديدة  بحيث لا تقل عن 6 ارقام ",
            "error": "يجب ان تتطابق كلمه المرور",
            "FirstName": "الاسم الأول ",
            "LastName": "الاسم الاخير",
            "Email": "الايميل ",
            "ProfileImg": "الصورة الشخصية",
            "ChangePassword": "تغيير كلمة المرور",
            "CurrentPassword": "الحالية",
            "NewPassword": "الجديدة",
            "ConfirmPassword": "Confirm Password",
            "SaveButton": "حفظ",
            "Cancel": "الغاء",
            "Information": "المعلومات الأساسية ",
            "Update": "تعديل",
            "HomePage": "الرئيسية",
            "Material": "المواد الدراسية",
            "Profile": "الحساب الشخصى",
            "Logout": "تسجيل الخروج",
            "ShowContent": "عرض المحتوى",
            "StartExam": "ابدا الاختبار",
            "Exams": "الامتحانات",
            "Lessons": "الوحدات",
            "Explain": "الشرح",
            "Files": "الملفات",
            "Similarexplanations": "شروحات مماثلة",
            "DiscussionsAndQuestions": "المناقشات والاسئلة",
            "Addcomment": "إضافة تعليق او سؤال",
            "SendExam": "تسليم الامتحان  والخروج",
            "Exammodel": "اختر نموذج امتحان ",
            "NextQuestion": "السؤال التالى ",
            "preQuestion": "السؤال السابق  ",
            "TotalScore": "مجموع درجاتك",
            "ExamNote": "يمكنك إعادة الاختبار او معرفة الأسئلة الخطأ",
            "RepeatExam": "إعادة الاختبار",
            "WrongAnswer": "معرفة إجابتك و الإجابات النموذجية",
            "Reply": "رد",
            "choose": "اختر الاجابه الصح",
            "complete": "اكمل هنا ",
            "answerHere": "اكتب الإجابة هنا ",
            "true": "صح",
            "false": "خطا",
            "ShowReplies": "عرض التعليقات",
            "Tasks": "المهام الاسبوعية",
            "sons": "الابناء",
            "studentName": "اسم الطالب",
            "Classroom": "الصف الدراسي",
            "dailyTasks": " المهام الاسبوعية",
            "Subjects": "المواد الدراسية",
            "Exams": "الامتحانات",
            "showTasks": "عرض المهام",
            "showSubjects": "عرض المواد",
            "showExams": "عرض الامتحانات",
            "showDetails": "عرض التفاصيل",
            "Lesson": "الدروس",
            "mark": "نسبة النجاح  ",
            "Sure": "هل انت متاكد من تسيلم الامتحان",
            "Cancel": "الغاء",
            "Live": "البث ",
            "isCheckingByTeacher": "الإمتحان قيد التصحيح من قبل المعلم سوف يتم إرسال لك الدرجة حين الإنتهاء  "



          }
        },
      }
    }
  },

}
//   // Build Configuration: https://go.nuxtjs.dev/config-build
//   build: {
//     transpile: [/^element-ui/],
//   }
// }