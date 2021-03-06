
(function(url_configs, parsers)  {
  var
    sprintf = require('sprintf').sprintf,
    $ = require('jQuery');

  var categories_1 = ['TI10', 'TI90', 'TL10', 'TL20', 'TL90', 'TLY0', 'TLZ0', 'TL30', 'TL40', 'TL60', 'TL50', 'TL80', 'TLB0'];

  var configs = {};
  categories_1.forEach(function(category) {
    for (var i=1; i<=300; ++i)  {
      var url = sprintf('http://beta.baostar.com/search/bggm/%d/?sfCate=%s&mymall=1', i, category);
      configs[url] = {
        priority: i,
        validity: 60*60*1000
      };
    }
  });
  url_configs['baostar'] = configs;

  var parser = {
    download: $.get,
    parse: function(url, content)  {
      var result = [];
      $(content).find('.tr_zk').each(function(index, item){
        var td = $(item).children('td');
        var item = {
            'url': 'http://beta.baostar.com'+td.eq(1).find('a').attr('href'),
            'model': td.eq(1).find('a').text(),
            'store_raw': td.eq(1).find('div:last').text(),
            'producer': td.eq(1).find('div:first').children().remove().end().text().trim(),
            'trademark': td.eq(1).children().remove().end().text().trim(),
            'spec': td.eq(3).text().split(' ')[0].trim(),
            'weight_raw': td.eq(3).text().split(' ')[1].trim(),
            'price_raw': td.eq(4).find('del').text(),
            'source_raw': '宝时达',
            'source_uint': 2,
            'cell_raw': '50509699',
        };
        result.push(item);
      });
      return result;
    },
    process: process
  }
  parsers['baostar'] = parser;

})(url_configs, parsers);
