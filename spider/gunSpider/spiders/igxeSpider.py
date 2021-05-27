from gunSpider.items import GunspiderItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import scrapy
import time
import re

class igxeSpider(scrapy.Spider):
    name = 'igxeSpider'
    allowed_domains = ['igxe.cn/']
    start_urls = ['https://www.igxe.cn/csgo/730?%20&ctg_id=5&ctg_name=%E5%8C%95%E9%A6%96&page_size=4000']

    def parse(self, response):
        item= GunspiderItem()

        date = '2021-05-27, 8:42:00'
        datalist = response.css('#center > div > div.box-4 > div > div.dataList > a')
        for knife in datalist:
            name = knife.css('div.name::text').extract()[0]
            href = knife.css('::attr(href)').extract()[0]
            img = knife.css('div.img > img::attr(src)').extract()[0]
            price1 = knife.css('div.inf.clearfix > div.price.fl > sup::text').extract()[0]
            price2 = knife.css('div.inf.clearfix > div.price.fl > span::text').extract()[0]
            price3 = knife.css('div.inf.clearfix > div.price.fl > sub::text').extract()[0]

            num = knife.css('div.inf.clearfix > div.sum.fr::text').extract()
            if len(num) == 0:
                num = '0'
            else:
                num = num[0]
                num = num.replace(' ', '')
                num = num.replace('\n', '')
                nums = num.split('：')
                num = nums[1]

            str = name.replace(' ', '')
            str = str.replace('|', '')
            str = str.replace('(', '|')
            str = str.replace(')', '')
            str = str.replace('（', '|')
            str = str.replace('）', '|')
            strs = str.split('|')

            type = strs[0]
            color = strs[2]
            if len(re.findall('StatTrak', name)) == 0:
                star = '无'
            else:
                star = '有'
            if len(strs) < 4:
                mosun = ''
            else:
                mosun = strs[3]

            item['platform'] = 'igxe'
            item['name'] = name
            item['href'] = href
            item['type'] = type
            item['color'] = color
            item['star'] = star
            item['mosun'] = mosun
            item['img'] = img
            item['num'] = num
            item['price'] = price1 + price2 + price3
            item['date'] = date
            
            yield item