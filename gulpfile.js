/// <binding AfterBuild='default' />
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('_layout-bundle', [], function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-validation/dist/jquery.validate.js',
        'bower_components/what-input/what-input.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/foundation-sites/dist/foundation.js',
        'bower_components/angular-foundation-6/dist/angular-foundation.js',
        'Assets/js/_layout/*.js'
    ])
        .pipe($.concat('_layout-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-externalloginconfirmation-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/externalloginconfirmation-*.js'
    ])
        .pipe($.concat('account-externalloginconfirmation-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-forgotpassword-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/forgotpassword-*.js'
    ])
        .pipe($.concat('account-forgotpassword-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-login-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/login-*.js'
    ])
        .pipe($.concat('account-login-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-register-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/register-*.js'
    ])
        .pipe($.concat('account-register-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-resetpassword-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/resetpassword-*.js'
    ])
        .pipe($.concat('account-resetpassword-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-sendcode-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/sendcode-*.js'
    ])
        .pipe($.concat('account-sendcode-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('account-verifycode-bundle', [], function () {
    return gulp.src([
        'Assets/js/account/verifycode-*.js'
    ])
        .pipe($.concat('account-verifycode-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('home-index-bundle', [], function () {
    return gulp.src([
        'Assets/js/home/index-*.js'
    ])
        .pipe($.concat('home-index-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('home-index-templates', [], function () {
    return gulp.src(['Assets/js/home/index-*.html'])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            prefix: 'views/',
            moduleName: 'app',
            declareModule: false
        }))
        .pipe($.concat("home-index-templates.js"))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('manage-addphonenumber-bundle', [], function () {
    return gulp.src([
        'Assets/js/manage/addphonenumber-*.js'
    ])
        .pipe($.concat('manage-addphonenumber-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('manage-changepassword-bundle', [], function () {
    return gulp.src([
        'Assets/js/manage/changepassword-*.js'
    ])
        .pipe($.concat('manage-changepassword-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('manage-setpassword-bundle', [], function () {
    return gulp.src([
        'Assets/js/manage/setpassword-*.js'
    ])
        .pipe($.concat('manage-setpassword-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('manage-verifyphonenumber-bundle', [], function () {
    return gulp.src([
        'Assets/js/manage/verifyphonenumber-*.js'
    ])
        .pipe($.concat('manage-verifyphonenumber-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('roleadmin-create-bundle', [], function () {
    return gulp.src([
        'Assets/js/roleadmin/create-*.js'
    ])
        .pipe($.concat('roleadmin-create-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('roleadmin-edit-bundle', [], function () {
    return gulp.src([
        'Assets/js/roleadmin/edit-*.js'
    ])
        .pipe($.concat('roleadmin-edit-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('useradmin-create-bundle', [], function () {
    return gulp.src([
        'Assets/js/useradmin/create-*.js'
    ])
        .pipe($.concat('useradmin-create-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('useradmin-edit-bundle', [], function () {
    return gulp.src([
        'Assets/js/useradmin/edit-*.js'
    ])
        .pipe($.concat('useradmin-edit-bundle.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('foundation-sass-compile', [], function () {
    return gulp.src('assets/css/scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths 
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe($.rename({
            basename: "foundation"
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.cleanCss({ debug: true }, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('assets/css'));
});


gulp.task('default', [
    '_layout-bundle',
    'account-externalloginconfirmation-bundle', 
    'account-forgotpassword-bundle', 
    'account-login-bundle', 
    'account-register-bundle', 
    'account-resetpassword-bundle', 
    'account-sendcode-bundle', 
    'account-verifycode-bundle', 
    'home-index-bundle', 
    'home-index-templates', 
    'manage-addphonenumber-bundle', 
    'manage-changepassword-bundle', 
    'manage-setpassword-bundle', 
    'manage-verifyphonenumber-bundle', 
    'roleadmin-create-bundle',
    'roleadmin-edit-bundle',
    'useradmin-create-bundle',
    'useradmin-edit-bundle',
    'foundation-sass-compile'], function () {
    //gulp.watch(['scss/**/*.scss'], ['foundation-sass-compile']);
});
