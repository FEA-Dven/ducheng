const webpack = require('webpack');
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');

/**
 * 构建函数，  把build文件夹上传到Oss
 * 依赖任务1： 清空build文件夹
 * 依赖任务2： 打包压缩工具箱,把zip包房在build文件夹
 * 依赖任务3： 通过webpack打包js/css资源到build文件夹：bundle
 * 依赖任务4： 把build文件夹里面的内容放上oss
 */
gulp.task('build', cb => {
    runSequence('clean', 'bundle', cb);
});

/**
 * 清理build文件夹里面的东西
 */
gulp.task('clean', () => del.sync(['build/*' ], { dot: true }));

/**
 * 编译构建静态文件
 */
gulp.task('bundle', cb => {
    let config = require('./webpack.config.js');
    let bundler = webpack(config);
    return bundler.run((err, status) => {
        if (!err) cb();
    });
});
