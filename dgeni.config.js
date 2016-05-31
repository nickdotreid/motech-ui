var path = require('canonical-path');
var config = require('./gulpfile.js/config');
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
      include: path.resolve(config.docs.src, '**/*.js'),
      exclude: path.resolve(config.docs.src, '**/*.spec.js'),
      basePath: 'src'
    }
  ];

  templateFinder.templateFolders.unshift(path.resolve(process.cwd(), 'docs', 'templates'));
  templateFinder.templatePatterns.unshift('common.template.html');

  writeFilesProcessor.outputFolder  = config.docs.dest;
});