
(function(url_configs, parsers)  {
  var
    sprintf = require('sprintf').sprintf,
    $ = require('jQuery'),
    Q = require('q'),
    request = require('request');

  var configs = {};
  for (var i=1; i<=5500; ++i)  {
    var url = sprintf('http://www.zhaogang.com/spot/?page=%d', i);
    configs[url] = {
      priority: i,
      validity: 60*60*1000
    };
  }
  url_configs['zhaogang'] = configs;

  var parser = {
    download: function(url){
      var deffered = Q.defer();
      setTimeout(function() {
        request(url, function(err, response, content) {
          if (!err) {
            deffered.resolve(content);
          }
          else {
            deffered.reject(err);
          }
        })
      }, 1000);
      return deffered.promise;
    },
    parse: function(url, content)  {
      console.log(url, content.length);
      var result = [];
      var rows = $(content).find('.table').find('tr');
      for (var i=0; i<(rows.length/2 - 1); ++i) {
        var row1 = $(rows[i*2+1]).find('td')
          , row2 = $(rows[i*2+2]).find('span').eq(2).text()
          , item = {
            model: row1.eq(0).find('a').text(),
            spec: row1.eq(1).text(),
            trademark: row1.eq(2).text(),
            url: url,
            producer: row1.eq(3).text(),
            warehouse: row1.eq(4).text(),
            weight_raw: row1.eq(5).text(),
            price_raw: row1.eq(6).text(),
            store_raw: row1.eq(7).tex,
            cell_raw: row2,
            source_raw: '找钢网',
            source_uint: 11,
        };
        result.push(item);
      }
      return result;        
    },
    process: process
  }
  parsers['zhaogang'] = parser;

})(url_configs, parsers);
