from gunSpider.items import GunspiderItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import scrapy
import time
import re
import copy

class c5gameSpider(scrapy.Spider):
    name = 'c5gameSpider'
    
    start_urls = [
        'https://www.c5game.com/csgo/default/result.html?type=csgo_type_knife&sort=update_time&page={}'.format(str(i)) for i in range(1,66)
    ]

    def parse(self, response):
        date = '2021-05-28, 09:25:00'
        item= GunspiderItem()
        datalist = response.css('#yw0 > div.tab-pane.active > ul > li')
        for knife in datalist:
            name = knife.css('p.name > a > span::text').extract()[0]
            price = knife.css('p.info > span.pull-left > span::text').extract()[0]
            href = knife.css('p.name > a::attr(href)').extract()[0]
            img = knife.css('a > img::attr(src)').extract()[0]
            num = knife.css('p.info > span.num::text').extract()[0]

            num = num.replace(' ', '')
            num = num.replace('\n', '')
            num = num[0:len(num) -3]

            str = name.replace(' ', '')
            str = str.replace('|', '')
            str = str.replace('(', '|')
            str = str.replace(')', '')
            str = str.replace('（', '|')
            str = str.replace('）', '|')
            strs = str.split('|')
            color = strs[2]
            type = strs[0]
            if len(re.findall('StatTrak', name)) == 0:
                star = '无'
            else:
                star = '有'
            if len(strs) < 4:
                mosun = ''
            else:
                mosun = strs[3]

            item['platform'] = 'c5game'
            item['name'] = name
            item['href'] = href
            item['type'] = type
            item['color'] = color
            item['star'] = star
            item['mosun'] = mosun
            item['img'] = ''
            item['num'] = num
            item['price'] = price
            item['date'] = date
            yield  item