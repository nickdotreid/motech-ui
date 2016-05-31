var path = require('canonical-path');
var Package = require('dgeni').Package;

module.exports = new Package('dgeni-example', [
  require('dgeni-packages/jsdoc'),
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
])
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

  log.level = 'info';

  readFilesProcessor.basePath = process.cwd();
  readFilesProcessor.sourceFiles = [
    {
      include: 'src/**/*.js',
      exclude: 'src/**/*.spec.js',
      basePath: 'src'
    }
  ];

  templateFinder.templateFolders.unshift(path.resolve(process.cwd(), 'docs', 'templates'));
  templateFinder.templatePatterns.unshift('common.template.html');

  writeFilesProcessor.outputFolder  = 'build/docs';
});