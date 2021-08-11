export default function ({redirect, app}) {
         
         if(app.$auth.loggedIn && app.$auth.user && app.$auth.user.role == 'student'){
            redirect('/subjects');
         }else{
            redirect('/Parent/student');
         }
    
}